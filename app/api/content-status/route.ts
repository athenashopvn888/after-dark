import { NextResponse } from "next/server";
import { getFleetContent } from "../../lib/fleetContent";
import { FLEET_STORE_CODE } from "../../lib/fleet/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Diagnostic only. Version, manifest ok/err, and mode. No secrets and no env values. */
export async function GET() {
  const fleet = await getFleetContent();
  return NextResponse.json({
    storeCode: FLEET_STORE_CODE,
    version: fleet.version,
    contentVersion: fleet.contentVersion,
    manifest: fleet.manifest,
    mode: fleet.mode,
  }, { headers: { "Cache-Control": "no-store" } });
}
