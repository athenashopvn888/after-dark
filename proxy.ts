import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cigaretteRedirectPath } from "./app/lib/cigaretteCatalog";
import { getWebGate } from "./app/lib/cigaretteFeed";

export async function proxy(request: NextRequest) {
  const target = cigaretteRedirectPath(request.nextUrl.pathname);
  if (!target) return NextResponse.next();
  // An explicit webOn false stays on this URL and returns 200. Coded keeps the redirect.
  if ((await getWebGate()) !== "coded") return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = target;
  url.search = "";
  return NextResponse.redirect(url, 302);
}

export const config = {
  matcher: [
    "/cigarettes",
    "/items/cigarettes",
    "/native-cigarettes-york",
    "/info/native-cigarettes-york",
    "/resources/native-cigarettes-ontario",
    "/resources/native-smokes",
    "/resources/nicotine-pouches",
    "/guides/:slug",
    "/item/:slug",
  ],
};
