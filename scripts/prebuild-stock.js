/**
 * Prebuild script: Fetches live stock data from Apps Script
 * and writes flowers.json + items.json before Next.js builds.
 *
 * This runs automatically via "prebuild" in package.json.
 * If the fetch fails, the existing JSON files are kept as fallback.
 */

const fs = require('fs');
const path = require('path');

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL || '';
const FLOWERS_PATH = path.join(__dirname, '..', 'app', 'lib', 'flowers.json');
const ITEMS_PATH = path.join(__dirname, '..', 'app', 'lib', 'items.json');
const SNAPSHOT_META_PATH = path.join(__dirname, '..', 'app', 'lib', 'productSnapshotMeta.json');
const APPROVED_FLOWER_OVERRIDES_PATH = path.join(
  __dirname,
  '..',
  'app',
  'lib',
  'approvedFlowerDisplayOverrides.json',
);

function isValidCollection(products, allowTierVariants = false) {
  if (!Array.isArray(products) || products.length === 0) return false;
  const seen = new Set();
  return products.every((product) => {
    const sku = String(product && product.sku || '').trim();
    const name = String(product && product.name || '').trim();
    const tier = allowTierVariants
      ? String(product && product.tier || '').trim().toUpperCase()
      : '';
    const displayIdentity = tier ? `${sku}\u0000${tier}` : sku;
    if (!sku || !name || seen.has(displayIdentity)) return false;
    seen.add(displayIdentity);
    return true;
  });
}

function productDisplayIdentity(product) {
  const sku = String(product && product.sku || '').trim();
  const tier = String(product && product.tier || '').trim().toUpperCase();
  return tier ? `${sku}\u0000${tier}` : sku;
}

function mergeApprovedFlowerDisplayRows(products) {
  const approved = JSON.parse(
    fs.readFileSync(APPROVED_FLOWER_OVERRIDES_PATH, 'utf-8'),
  );
  if (approved.storeCode !== 'MJ01' || !isValidCollection(approved.flowers, true)) {
    throw new Error('Invalid MJ01 approved flower display overrides');
  }
  const productKeys = new Set(products.map(productDisplayIdentity));
  return {
    flowers: [
      ...products,
      ...approved.flowers.filter(
        (product) => !productKeys.has(productDisplayIdentity(product)),
      ),
    ],
    approvedCount: approved.flowers.length,
  };
}

function assertNewerThanSnapshot(stockDate) {
  const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_META_PATH, 'utf-8'));
  const liveTime = Date.parse(stockDate || '');
  const snapshotTime = Date.parse(snapshot.sourceAsOf || '');
  if (
    !Number.isFinite(liveTime) ||
    !Number.isFinite(snapshotTime) ||
    liveTime <= snapshotTime
  ) {
    throw new Error('Live stock is not newer than the checked-in POS snapshot');
  }
}

async function main() {
  if (!APPS_SCRIPT_URL) {
    console.log('[prebuild] No APPS_SCRIPT_URL set — using existing static JSON files');
    return;
  }

  console.log('[prebuild] Fetching live stock from Apps Script...');

  try {
    const url = `${APPS_SCRIPT_URL}?store=MJ01`;
    const res = await fetch(url, { signal: AbortSignal.timeout(30000) });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    if (!isValidCollection(data.flowers, true) || !isValidCollection(data.items)) {
      throw new Error('Invalid response: product collections failed validation');
    }
    assertNewerThanSnapshot(data.stockDate);

    // ── Post-process flowers: derive sale flags + clean names ──
    const SALE_RE = /\bSALE\b/i;
    const ON_SALE_RE = /ON\s*SALE/i;
    function hasSalePrice(f) {
      return !!(
        (f.price3g && f.price3g.sale !== null) ||
        (f.price5g && f.price5g.sale !== null) ||
        (f.price14g && f.price14g.sale !== null) ||
        (f.price28g && f.price28g.sale !== null)
      );
    }
    function cleanName(name) {
      return name
        .replace(/\s*\(?\s*AAA\+?\s*ON\s*SALE\s*\)?\s*$/i, '')
        .replace(/\s*\(?\s*AAA\+?\s*SALE!?\s*\)?\s*$/i, '')
        .replace(/\s*\bSALE!?\s*$/i, '')
        .replace(/\s*\bON\s*SALE\s*$/i, '')
        .trim();
    }
    let saleFixed = 0;
    for (const f of data.flowers) {
      // Derive isSale from name or prices
      if (!f.isSale) {
        if (SALE_RE.test(f.name) || ON_SALE_RE.test(f.name) || hasSalePrice(f)) {
          f.isSale = true;
          saleFixed++;
        }
      }
      // Clean display name
      f.name = cleanName(f.name);
    }
    if (saleFixed > 0) console.log(`[prebuild] Fixed ${saleFixed} sale flags from names`);

    const sourceFlowerRowCount = data.flowers.length;
    const approvedFlowerDisplay = mergeApprovedFlowerDisplayRows(data.flowers);
    const flowers = approvedFlowerDisplay.flowers;
    if (!isValidCollection(flowers, true)) {
      throw new Error('Approved MJ01 flower display merge produced invalid rows');
    }

    // Write flowers.json
    fs.writeFileSync(FLOWERS_PATH, JSON.stringify(flowers, null, 2), 'utf-8');
    console.log(`[prebuild] flowers.json updated: ${flowers.length} display rows`);

    // Tier breakdown
    const tiers = {};
    flowers.forEach(f => { tiers[f.tier] = (tiers[f.tier] || 0) + 1; });
    Object.entries(tiers).forEach(([t, c]) => console.log(`  ${t}: ${c}`));

    // ── Post-process items: fix '$[object Object]' prices ──
    let itemsFixed = 0;
    for (const it of data.items) {
      if (typeof it.price === 'string' && it.price.includes('[object')) {
        // Price was mangled by parsePriceCell_ returning an object
        // Try to extract from the raw price data
        it.price = '';
        itemsFixed++;
      }
    }
    if (itemsFixed > 0) console.log(`[prebuild] Fixed ${itemsFixed} mangled item prices`);

    // Write items.json
    fs.writeFileSync(ITEMS_PATH, JSON.stringify(data.items, null, 2), 'utf-8');
    console.log(`[prebuild] items.json updated: ${data.items.length} products`);

    fs.writeFileSync(SNAPSHOT_META_PATH, JSON.stringify({
      storeCode: 'MJ01',
      sourceAsOf: data.stockDate,
      itemCount: data.items.length,
      flowerCount: flowers.length,
      flowerSkuCount: new Set(flowers.map(f => String(f.sku))).size,
      flowerSourceRowCount: sourceFlowerRowCount,
      flowerDisplayOverrideCount: approvedFlowerDisplay.approvedCount,
    }, null, 2) + '\n', 'utf-8');

    // Category breakdown
    const cats = {};
    data.items.forEach(i => { cats[i.category] = (cats[i.category] || 0) + 1; });
    Object.entries(cats).sort().forEach(([c, n]) => console.log(`  ${c}: ${n}`));

    console.log(`[prebuild] Stock date: ${data.stockDate || 'unknown'}`);
    console.log('[prebuild] Done!');

  } catch (err) {
    console.warn(`[prebuild] Live fetch failed: ${err.message}`);
    console.warn('[prebuild] Keeping existing JSON files as fallback');
  }
}

main();
