import { verifyBearer } from "@/app/lib/staffPhotoAuth";
import { mutateStaffState, publicError } from "@/app/lib/staffPhotoStore";

const CONTROLLED_NAME = "codex-controlled-verification.png";
const CONTROLLED_NOTE = "controlled-production-verification";

export async function POST(request: Request) {
  if (!verifyBearer(request, process.env.MJ_STAFF_RETRIEVAL_TOKEN)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const id = typeof body.id === "string" ? body.id : "";
    if (!/^[0-9a-f-]{36}$/i.test(id)) {
      return Response.json({ ok: false, error: "Invalid controlled verification id." }, { status: 400 });
    }
    const removed = await mutateStaffState((state) => {
      const index = state.submissions.findIndex((row) => row.id === id);
      if (index < 0) return false;
      const row = state.submissions[index];
      if (
        row.original_name !== CONTROLLED_NAME ||
        row.status !== "invalid" ||
        row.object_path !== null ||
        row.validation_note !== CONTROLLED_NOTE
      ) {
        return false;
      }
      state.submissions.splice(index, 1);
      return true;
    });
    if (!removed) {
      return Response.json({ ok: false, error: "Controlled verification record is not purgeable." }, { status: 409 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    return publicError(error);
  }
}
