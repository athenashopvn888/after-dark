import "server-only";
import { BlobAccessError, BlobPreconditionFailedError, get, head, put } from "@vercel/blob";
import { validateStoredAdcSnapshot, type AdcInventorySnapshot } from "./adcInventoryCore";

export const ADC_INVENTORY_SNAPSHOT_PATH = "adc-inventory/snapshot/v1.json";
let localSnapshot: AdcInventorySnapshot | null = null;

function blobConfigured() {
  if (process.env.ADC_INVENTORY_LOCAL_ONLY === "1") return false;
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID));
}

async function readVersion(): Promise<{ snapshot: AdcInventorySnapshot | null; etag: string | null }> {
  if (!blobConfigured()) return { snapshot: structuredClone(localSnapshot), etag: null };
  const result = await get(ADC_INVENTORY_SNAPSHOT_PATH, { access: "private", useCache: false });
  if (!result) return { snapshot: null, etag: null };
  if (result.statusCode !== 200 || !result.stream) throw new Error("ADC inventory snapshot could not be read.");
  return { snapshot: validateStoredAdcSnapshot(JSON.parse(await new Response(result.stream).text())), etag: result.blob.etag };
}

export async function readAdcInventorySnapshot() {
  return (await readVersion()).snapshot;
}

export async function writeAdcInventorySnapshot(snapshot: AdcInventorySnapshot) {
  if (!blobConfigured()) {
    localSnapshot = structuredClone(snapshot);
    return;
  }
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const current = await readVersion();
    if (current.snapshot && Date.parse(current.snapshot.sourceTimestamp) > Date.parse(snapshot.sourceTimestamp)) return;
    try {
      if (!current.etag) {
        await put(ADC_INVENTORY_SNAPSHOT_PATH, JSON.stringify(snapshot), { access: "private", contentType: "application/json", cacheControlMaxAge: 60, allowOverwrite: false });
        return;
      }
      const latest = await head(ADC_INVENTORY_SNAPSHOT_PATH);
      if (latest.etag.replaceAll('"', "") !== current.etag.replaceAll('"', "")) continue;
      await put(ADC_INVENTORY_SNAPSHOT_PATH, JSON.stringify(snapshot), { access: "private", contentType: "application/json", cacheControlMaxAge: 60, allowOverwrite: true, ifMatch: latest.etag });
      return;
    } catch (error) {
      if (error instanceof BlobAccessError || error instanceof BlobPreconditionFailedError) continue;
      throw error;
    }
  }
  throw new Error("ADC inventory snapshot was busy.");
}
