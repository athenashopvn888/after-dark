import { NextResponse } from "next/server";
import { getCigaretteSnapshot, toPublicCigaretteState } from "../../lib/cigaretteFeed";
import { contentStatusPayload } from "../../lib/fleet/status";
import { getFleetContent } from "../../lib/fleetContent";
import { SHOW_CIGARETTES } from "../../lib/siteConfig";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Diagnostic only. Version, manifest ok/err, and mode. No secrets and no env values. */
export async function GET() {
  const [fleet, cig] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  const cigarettes = toPublicCigaretteState(cig);
  return NextResponse.json({
    ...contentStatusPayload(fleet, {
      web: SHOW_CIGARETTES ? cigarettes.web : false,
      tv: cigarettes.tv,
      guides: cig.guides.show,
    }),
    manifest: fleet.manifest,
    mode: fleet.mode,
  }, { headers: { "Cache-Control": "no-store" } });
}
