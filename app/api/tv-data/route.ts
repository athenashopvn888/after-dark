import { NextResponse } from "next/server";
import {
  fetchLiveProducts,
  LIVE_PRODUCT_REVALIDATE_SECONDS,
} from "../../lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "flowers";
  const products = await fetchLiveProducts();
  const selectedType = type === "items" ? "items" : "flowers";
  const data =
    selectedType === "items" ? products.items : products.flowers;
  const headers = {
    "cache-control": `public, s-maxage=${LIVE_PRODUCT_REVALIDATE_SECONDS}, stale-while-revalidate=300`,
    "x-tv-data-cache-seconds": String(LIVE_PRODUCT_REVALIDATE_SECONDS),
    "x-tv-data-source": products.sources[selectedType],
    "x-tv-data-as-of": products.sourceAsOf,
  };

  return NextResponse.json(data, { headers });
}
