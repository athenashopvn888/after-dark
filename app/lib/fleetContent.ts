import { cache } from "react";
import { readFleetContent } from "./fleet/read.ts";

export const getFleetContent = cache(readFleetContent);

export { FLEET_MANIFEST_ENV, FLEET_REVALIDATE_ENV, EDGE_CONFIG_ENV, CONTENT_MODE_ENV, manifestEtag, resetFleetContentCache, tvManifestBody, tvManifestDecision } from "./fleet/read.ts";
export { FLEET_AFFECTED_PATHS } from "./fleet/routes.ts";
export { FLEET_CONTENT_TAG, FLEET_STORE_CODE } from "./fleet/types.ts";
