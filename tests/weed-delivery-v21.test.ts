import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");

test("MJ01 has one Weed Delivery canonical owner and a direct legacy redirect", () => {
  const owner = read("app/weed-delivery-york/page.tsx");
  const legacy = read("app/delivery/page.tsx");
  const redirects = read("next.config.ts");
  const sitemap = read("app/sitemap.ts");

  assert.match(owner, /title: "Weed Delivery York"/);
  assert.match(owner, /https:\/\/afterdarkcannabis\.com\/weed-delivery-york/);
  assert.match(owner, /name: "Weed Delivery"/);
  assert.match(legacy, /permanentRedirect\("\/weed-delivery-york"\)/);
  assert.match(redirects, /source: "\/delivery", destination: "\/weed-delivery-york", permanent: true/);
  assert.doesNotMatch(sitemap, /`\$\{BASE\}\/delivery`/);
  assert.equal(sitemap.match(/`\$\{BASE\}\/weed-delivery-york`/g)?.length, 1);
});

test("MJ01 Weed Delivery links and customer-facing owner wording are exact", () => {
  const content = read("app/delivery/DeliveryContent.tsx");
  const navbar = read("app/components/Navbar.tsx");
  const footer = read("app/components/Footer.tsx");
  const layout = read("app/layout.tsx");

  assert.match(content, /<h1>Weed Delivery in York<\/h1>/);
  assert.doesNotMatch(content, /<h1>Delivery Menu<\/h1>/);
  assert.equal((navbar.match(/href="\/weed-delivery-york"/g) ?? []).length, 1);
  assert.match(navbar, /href: "\/weed-delivery-york", label: "WEED DELIVERY"/);
  assert.match(navbar, /label: "WEED DELIVERY"/);
  assert.match(footer, /href="\/weed-delivery-york">WEED DELIVERY<\/Link>/);
  assert.match(layout, /WEED DELIVERY IS HERE — CLICK TO EXPLORE/);
  assert.doesNotMatch(`${navbar}\n${footer}\n${layout}`, /href="\/delivery"/);
});

test("MJ01 protected delivery mechanics remain present", () => {
  const content = read("app/delivery/DeliveryContent.tsx");
  const menu = JSON.parse(read("app/delivery/delivery-menu.json"));

  assert.equal(menu.products.length, 63);
  assert.match(content, /store=MJ01/);
  assert.match(content, /\$60 PRODUCT MINIMUM/);
  assert.match(content, /Member Loyalty Savings/);
  assert.match(content, /LIVE ORDER connects you with the After Dark dispatcher/);
  assert.match(content, /The dispatcher confirms availability, delivery details, and next steps/);
  assert.match(content, /Web Chat/);
});
