import test from "node:test";
import assert from "node:assert/strict";
import {
  getTv2DaytimePromo,
  isCigaretteOfferVisible,
  isTv2Daytime,
} from "../app/tv2/tv2Promos.ts";

test("TV2 daytime uses the local device hour from 10:00 through 16:59", () => {
  assert.equal(isTv2Daytime(new Date(2026, 6, 29, 9, 59, 59)), false);
  assert.equal(isTv2Daytime(new Date(2026, 6, 29, 10, 0, 0)), true);
  assert.equal(isTv2Daytime(new Date(2026, 6, 29, 16, 59, 59)), true);
  assert.equal(isTv2Daytime(new Date(2026, 6, 29, 17, 0, 0)), false);
});

test("daytime promo covers both Cigarettes and Vapes cards", () => {
  assert.equal(
    getTv2DaytimePromo("CIGARETTES", true)?.src,
    "/banners/cig-poster-1.png",
  );
  assert.match(
    getTv2DaytimePromo("VAPES", true)?.alt || "",
    /Ultimate Cannabis Collection/,
  );
  assert.equal(getTv2DaytimePromo("VAPES", false), undefined);
  assert.equal(getTv2DaytimePromo("EDIBLES", true), undefined);
});

test("cigarette offer is visible for seconds 20 through 29 of each cycle", () => {
  assert.equal(isCigaretteOfferVisible(false, 0), false);
  assert.equal(isCigaretteOfferVisible(false, 19_999), false);
  assert.equal(isCigaretteOfferVisible(false, 20_000), true);
  assert.equal(isCigaretteOfferVisible(false, 29_999), true);
  assert.equal(isCigaretteOfferVisible(false, 30_000), false);
  assert.equal(isCigaretteOfferVisible(false, 50_000), true);
});

test("cigarette offer never overlays the daytime promo", () => {
  assert.equal(isCigaretteOfferVisible(true, 20_000), false);
  assert.equal(isCigaretteOfferVisible(true, 29_999), false);
  assert.equal(isCigaretteOfferVisible(false, -1), false);
});
