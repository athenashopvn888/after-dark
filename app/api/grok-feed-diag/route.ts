import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SHARED = "https://script.google.com/macros/s/AKfycbx09_sDal1eMVF1r-hUck4e7oq_XBHEWhGvA79JuhZNQ6P4CdhCas0xE3FfexWQ3hq4/exec";

async function probe(url: string) {
  const started = Date.now();
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(30_000) });
    const text = await res.text();
    return {
      status: res.status,
      redirected: res.redirected,
      finalHost: new URL(res.url).host,
      finalPath: new URL(res.url).pathname,
      contentType: res.headers.get("content-type"),
      ms: Date.now() - started,
      length: text.length,
      snippet: text.replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 700),
    };
  } catch (error) {
    return { error: String(error), ms: Date.now() - started };
  }
}

export async function GET() {
  const env = process.env.APPS_SCRIPT_URL || "";
  const out: Record<string, unknown> = {
    region: process.env.VERCEL_REGION || null,
    envSet: Boolean(env),
    envEqualsShared: env.replace(/\/$/, "") === SHARED,
    envHost: env ? new URL(env).host : null,
    sharedStock: await probe(`${SHARED}?store=MJ01&stock=1`),
    sharedCatalog: await probe(`${SHARED}?store=MJ01&catalog=1`),
  };
  if (env && env.replace(/\/$/, "") !== SHARED) {
    const sep = env.includes("?") ? "&" : "?";
    out.envStock = await probe(`${env}${sep}store=MJ01&stock=1`);
  }
  return NextResponse.json(out, { headers: { "cache-control": "no-store" } });
}
