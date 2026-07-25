import { clearStaffSession, isSameOrigin, setStaffSession } from "@/app/lib/staffPhotoAuth";
import { mutateStaffState, publicError, readStaffState } from "@/app/lib/staffPhotoStore";
import { verifyDailyPin } from "@/app/lib/staffPhotoPin";
import { LOGIN_WINDOW_MINUTES, loginAllowed } from "@/app/lib/staffPhotoCore";
import { createHmac } from "node:crypto";

export const runtime = "nodejs";

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const secret = process.env.MJ_STAFF_SESSION_SECRET || "";
  if (secret.length < 32) throw new Error("Staff session secret is not configured.");
  return createHmac("sha256", secret).update(forwarded).digest("base64url");
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ ok: false, error: "Request was blocked." }, { status: 403 });
  try {
    const key = clientKey(request);
    const parsed = await request.json().catch(() => ({}));
    const pin = typeof parsed.pin === "string" ? parsed.pin.trim() : "";
    const snapshot = await readStaffState();
    const now = new Date();
    const since = now.getTime() - LOGIN_WINDOW_MINUTES * 60_000;
    const recentFailures = snapshot.loginAttempts.filter((attempt) =>
      attempt.client_key === key &&
      !attempt.succeeded &&
      Date.parse(attempt.created_at) >= since
    ).length;
    if (!loginAllowed(recentFailures)) {
      return Response.json({ ok: false, error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
    }
    let valid = false;
    try { valid = verifyDailyPin(pin, snapshot.pinVersion); } catch { valid = false; }
    if (valid) {
      await setStaffSession(snapshot.pinVersion);
      return Response.json({ ok: true });
    }

    const outcome = await mutateStaffState((state) => {
      const mutationNow = new Date();
      const mutationSince = mutationNow.getTime() - LOGIN_WINDOW_MINUTES * 60_000;
      state.loginAttempts = state.loginAttempts.filter((attempt) => Date.parse(attempt.created_at) >= mutationNow.getTime() - 24 * 60 * 60_000);
      const failures = state.loginAttempts.filter((attempt) =>
        attempt.client_key === key &&
        !attempt.succeeded &&
        Date.parse(attempt.created_at) >= mutationSince
      ).length;
      if (!loginAllowed(failures)) return { limited: true };
      state.loginAttempts.push({ client_key: key, succeeded: false, created_at: mutationNow.toISOString() });
      return { limited: false };
    });
    if (outcome.limited) return Response.json({ ok: false, error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
    return Response.json({ ok: false, error: "That staff PIN is not correct." }, { status: 401 });
  } catch (error) { return publicError(error); }
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) return Response.json({ ok: false }, { status: 403 });
  await clearStaffSession();
  return Response.json({ ok: true });
}
