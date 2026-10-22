export const EDGE_CONFIG_ENV = "EDGE_CONFIG";
export const CONTENT_MODE_ENV = "contentMode";

/** Env or Edge Config contentMode="coded" turns every sheet feature off, articles included. */
export function contentModeForcesCoded(raw = process.env[CONTENT_MODE_ENV]): boolean {
  return (raw || "").trim().toLowerCase() === "coded";
}

export async function readEmergencyCoded(fetchImpl: typeof fetch = fetch): Promise<boolean> {
  if (contentModeForcesCoded()) return true;
  const connection = process.env[EDGE_CONFIG_ENV];
  if (!connection) return false;
  try {
    const url = new URL(connection);
    const token = url.searchParams.get("token");
    url.searchParams.delete("token");
    const itemUrl = `${url.origin}${url.pathname.replace(/\/$/, "")}/item/contentMode`;
    const response = await fetchImpl(itemUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });
    if (!response.ok) return false;
    const body = await response.json();
    return body === "coded" || body?.value === "coded";
  } catch {
    return false;
  }
}
