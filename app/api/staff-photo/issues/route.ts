import { hasStaffSession, isSameOrigin } from "@/app/lib/staffPhotoAuth";
import { deleteStaffMedia, mutateStaffState, publicError, uploadStaffMedia } from "@/app/lib/staffPhotoStore";
import { expiryFor, normalizeBossMessage, operationalDayKey } from "@/app/lib/staffPhotoCore";
import { inspectImage } from "@/app/lib/staffPhotoUpload";
import { randomUUID } from "node:crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ ok: false, error: "Request was blocked." }, { status: 403 });
  if (!(await hasStaffSession())) return Response.json({ ok: false, error: "Please sign in again." }, { status: 401 });
  try {
    const form = await request.formData();
    const anonymous = String(form.get("anonymous") || "") === "true";
    const staffName = String(form.get("staffName") || "").trim().slice(0, 60);
    const category = String(form.get("category") || "");
    const note = String(form.get("note") || "").trim().slice(0, 1000);
    const message = normalizeBossMessage({ anonymous, staffName, category, note });
    if (!message.ok) return Response.json({ ok: false, error: message.error }, { status: 400 });
    const attachment = form.get("attachment");
    const image = attachment instanceof File && attachment.size > 0 ? await inspectImage(attachment, "issue") : null;
    if (image && "error" in image) return Response.json({ ok: false, error: image.error }, { status: 400 });
    const id = randomUUID();
    let attachmentPath: string | null = null;
    if (image && !("error" in image)) {
      attachmentPath = await uploadStaffMedia(image.objectPath, image.bytes, image.mime);
    }
    try {
      await mutateStaffState((state) => {
        state.issues.push({
          id, staff_name: message.anonymous ? null : message.staffName, day_key: operationalDayKey(),
          category: message.category, note: message.note, status: "open",
          attachment_path: attachmentPath,
          attachment_mime: image && !("error" in image) ? image.mime : null,
          attachment_bytes: image && !("error" in image) ? image.size : null,
          attachment_expires_at: image && !("error" in image) ? expiryFor().toISOString() : null,
          created_at: new Date().toISOString(), retrieved_at: null,
        });
      });
    } catch (error) {
      if (attachmentPath) await deleteStaffMedia(attachmentPath).catch(() => undefined);
      throw error;
    }
    return Response.json({ ok: true, issueId: id });
  } catch (error) { return publicError(error); }
}
