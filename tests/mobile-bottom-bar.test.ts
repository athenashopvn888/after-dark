import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import {
  MOBILE_BAR_DELIVERY_HREF,
  MOBILE_BAR_HOURS_HREF,
  MOBILE_BAR_MENU_HREF,
  isMobileBarHiddenPath,
  preferredStoreMapsUrl,
} from "../app/lib/mobileBottomBar.ts";
import { FULL_NAME_NAP } from "../app/lib/fullNameNap.ts";
import { mapsDirectionsUrl } from "../app/lib/storeIdentity.ts";
import { storeHoursStatus, type OpeningHoursSpec } from "../app/lib/storeHoursStatus.ts";

const layout = fs.readFileSync("app/layout.tsx", "utf8");
const globals = fs.readFileSync("app/globals.css", "utf8");
const bar = fs.readFileSync("app/components/MobileBottomBar.tsx", "utf8");
const css = fs.readFileSync("app/components/MobileBottomBar.module.css", "utf8");
const products = fs.readFileSync("app/lib/products.ts", "utf8");
const nextConfig = fs.readFileSync("next.config.ts", "utf8");

const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

function daily(opens: string, closes: string, days: readonly string[] = WEEK): OpeningHoursSpec[] {
  return [{ dayOfWeek: days, opens, closes }];
}

test("this store's hours read as open 24 hours in Toronto", () => {
  for (const iso of ["2026-01-15T15:00:00.000Z", "2026-07-15T04:30:00.000Z", "2026-10-26T03:59:00.000Z"]) {
    const status = storeHoursStatus(new Date(iso));
    assert.equal(status.kind, "always");
    assert.equal(status.label, "Open 24 hours");
  }
});

test("limited hours say open until the close, or the next open, in Toronto", () => {
  const hours = daily("09:00", "21:00");
  const sundayEvening = storeHoursStatus(new Date("2026-10-25T22:00:00.000Z"), hours);
  assert.deepEqual(sundayEvening, { kind: "open", label: "Open now · until 9 p.m." });

  const beforeOpen = storeHoursStatus(new Date("2026-10-26T12:00:00.000Z"), hours);
  assert.deepEqual(beforeOpen, { kind: "closed", label: "Closed · opens 9 a.m." });

  const afterClose = storeHoursStatus(new Date("2026-10-26T02:30:00.000Z"), hours);
  assert.equal(afterClose.kind, "closed");
  assert.equal(afterClose.label, "Closed · opens Mon 9 a.m.");

  const winterAfternoon = storeHoursStatus(new Date("2026-01-15T20:00:00.000Z"), hours);
  assert.deepEqual(winterAfternoon, { kind: "open", label: "Open now · until 9 p.m." });
});

test("overnight windows stay open past midnight and name the next open day", () => {
  const hours = daily("10:00", "02:00", ["Friday"]);
  const fridayNight = storeHoursStatus(new Date("2026-10-24T03:00:00.000Z"), hours);
  assert.deepEqual(fridayNight, { kind: "open", label: "Open now · until 2 a.m." });

  const saturdayEarly = storeHoursStatus(new Date("2026-10-24T05:00:00.000Z"), hours);
  assert.deepEqual(saturdayEarly, { kind: "open", label: "Open now · until 2 a.m." });

  const saturdayLater = storeHoursStatus(new Date("2026-10-24T07:00:00.000Z"), hours);
  assert.deepEqual(saturdayLater, { kind: "closed", label: "Closed · opens Fri 10 a.m." });
});

test("a split day uses the window that is actually open", () => {
  const hours: OpeningHoursSpec[] = [
    { dayOfWeek: ["Monday"], opens: "09:00", closes: "12:00" },
    { dayOfWeek: ["Monday"], opens: "14:00", closes: "18:00" },
  ];
  assert.equal(storeHoursStatus(new Date("2026-10-26T15:00:00.000Z"), hours).label, "Open now · until 12 p.m.");
  assert.equal(storeHoursStatus(new Date("2026-10-26T17:00:00.000Z"), hours).label, "Closed · opens 2 p.m.");
  assert.equal(storeHoursStatus(new Date("2026-10-26T19:30:00.000Z"), hours).label, "Open now · until 6 p.m.");
});

test("the bar is mounted on every page and only pads the body when the bar is present", () => {
  assert.match(layout, /import MobileBottomBar from "\.\/components\/MobileBottomBar"/);
  assert.match(layout, /<MobileBottomBar \/>/);
  assert.match(globals, /--mobile-action-bar-height:\s*0px/);
  assert.match(
    globals,
    /@media \(max-width:\s*768px\)\s*\{[\s\S]*--mobile-action-bar-height:\s*calc\(68px \+ env\(safe-area-inset-bottom, 0px\)\)[\s\S]*body:has\(\[data-mobile-bottom-bar\]\)\s*\{[\s\S]*padding-bottom:\s*var\(--mobile-action-bar-height\)/,
  );
  assert.match(globals, /@media print\s*\{[\s\S]*padding-bottom:\s*0/);
});

test("directions, hours, menu, and delivery fit the bar and call is absent", () => {
  assert.match(bar, /href=\{preferredStoreMapsUrl\(\)\}/);
  assert.equal(preferredStoreMapsUrl(), FULL_NAME_NAP.mapsUrl);
  assert.match(preferredStoreMapsUrl(), /place_id[:=]/);
  assert.equal(preferredStoreMapsUrl().includes("maps.app.goo.gl"), false);
  assert.match(mapsDirectionsUrl, /google\.com\/maps\/dir/);
  assert.equal(MOBILE_BAR_HOURS_HREF, "/hours");
  assert.match(bar, /href=\{MOBILE_BAR_HOURS_HREF\}/);
  assert.equal(MOBILE_BAR_MENU_HREF, "/exotic-weed");
  assert.match(bar, /href=\{MOBILE_BAR_MENU_HREF\}/);
  assert.match(bar, />\s*Menu\s*</);
  assert.equal(MOBILE_BAR_DELIVERY_HREF, "/weed-delivery-york");
  assert.match(bar, /href=\{MOBILE_BAR_DELIVERY_HREF\}/);
  assert.match(bar, />\s*Delivery\s*</);
  assert.match(bar, />\s*Directions\s*</);
  assert.doesNotMatch(bar, /Call|tel:/);
  assert.match(css, /\.bar\s*\{[^}]*display:\s*none/s);
  assert.match(css, /@media \(max-width:\s*768px\)\s*\{[^}]*position:\s*fixed/s);
  assert.match(css, /bottom:\s*0/);
  assert.match(css, /minmax\(0,\s*1\.25fr\)\s+minmax\(0,\s*1\.5fr\)\s+minmax\(44px,\s*0\.72fr\)\s+minmax\(44px,\s*0\.9fr\)/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(css, /min-width:\s*44px/);
  assert.match(css, /max-width:\s*100%/);
  assert.match(css, /overflow-x:\s*clip/);
  assert.match(css, /var\(--green-dark/);
});

test("menu, hours, and delivery point at pages that exist, and tv boards hide the bar", () => {
  assert.equal(fs.existsSync("app/hours/page.tsx"), true);
  assert.equal(fs.existsSync("app/weed-delivery-york/page.tsx"), true);
  assert.equal(fs.existsSync("app/[tier]/page.tsx"), true);
  assert.match(products, /slug:\s*"exotic-weed"/);
  assert.equal(fs.existsSync("app/delivery/page.tsx"), true);
  assert.match(nextConfig, /source:\s*"\/delivery",\s*destination:\s*"\/weed-delivery-york"/);
  assert.equal(fs.existsSync("app/tv/page.tsx"), true);
  assert.equal(fs.existsSync("app/tv2/page.tsx"), true);
  assert.equal(isMobileBarHiddenPath("/tv"), true);
  assert.equal(isMobileBarHiddenPath("/tv2"), true);
  assert.equal(isMobileBarHiddenPath("/tv/"), true);
  assert.equal(isMobileBarHiddenPath("/hours"), false);
  assert.equal(isMobileBarHiddenPath("/"), false);
  assert.match(bar, /isMobileBarHiddenPath\(pathname\)/);
  assert.match(bar, /if \(hidden\) return null/);
});

test("a maps.app.goo.gl link wins over the GBP pin and the directions URL", () => {
  const short = "https://maps.app.goo.gl/afterdark";
  const chosen = preferredStoreMapsUrl([mapsDirectionsUrl, FULL_NAME_NAP.mapsUrl, short]);
  assert.equal(chosen, short);
  const pinOnly = preferredStoreMapsUrl([mapsDirectionsUrl, FULL_NAME_NAP.mapsUrl]);
  assert.equal(pinOnly, FULL_NAME_NAP.mapsUrl);
  const directionsOnly = preferredStoreMapsUrl([mapsDirectionsUrl]);
  assert.equal(directionsOnly, mapsDirectionsUrl);
});
