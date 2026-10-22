import { NextResponse } from "next/server";
import { getCigaretteSnapshot } from "../../lib/cigaretteFeed";
import { contentStatusPayload } from "../../lib/fleet/status";
import { getFleetContent } from "../../lib/fleetContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Diagnostic only. Version, manifest ok/err, and mode. No secrets and no env values. */
export async function GET() {
  const [fleet, cig] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  return NextResponse.json({
    ...contentStatusPayload(fleet, {
      web: cig.web.show,
      tv: cig.tv.show,
      guides: cig.guides.show,
    }),
    manifest: fleet.manifest,
    mode: fleet.mode,
  }, { headers: { "Cache-Control": "no-store" } });
}
