/**
 * Prebuild script: Fetches live stock data from Apps Script
 * and writes flowers.json + items.json before Next.js builds.
 *
 * This runs automatically via "prebuild" in package.json.
 * If the fetch fails, the existing JSON files are kept as fallback.
 */

const fs = require('fs');
const path = require('path');

// Shared fleet menu feed. Read ONLY from MENU_FEED_URL (legacy APPS_SCRIPT_URL is ignored on purpose).
const APPS_SCRIPT_URL = (process.env.MENU_FEED_URL || '').trim() ||
  'https://script.google.com/macros/s/AKfycbx09_sDal1eMVF1r-hUck4e7oq_XBHEWhGvA79JuhZNQ6P4CdhCas0xE3FfexWQ3hq4/exec';
const STOCK_META_PATH = require('path').join(__dirname, '..', 'app', 'lib', 'stock-meta.json');
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
  const activeSkus = new Set(products.map((product) => String(product.sku).trim()));
  const eligibleOverrides = approved.flowers.filter((product) =>
    activeSkus.has(String(product.sku).trim()),
  );
  const productKeys = new Set(products.map(productDisplayIdentity));
  return {
    flowers: [
      ...products,
      ...eligibleOverrides.filter(
        (product) => !productKeys.has(productDisplayIdentity(product)),
      ),
    ],
    approvedCount: eligibleOverrides.length,
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

// Grok 2026-10-09: 3 attempts x 90 s (single 30 s attempt timed out on Apps Script cold starts).
async function fetchFeedWithRetry(url, attempts = 3) {
  let lastErr;
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(90000) });
      if (res.ok) return res;
      lastErr = new Error(`HTTP ${res.status}: ${res.statusText}`);
    } catch (err) {
      lastErr = err;
    }
    console.warn(`[prebuild] feed attempt ${i}/${attempts} failed: ${lastErr && lastErr.message}`);
    if (i < attempts) await new Promise((r) => setTimeout(r, 5000));
  }
  throw lastErr;
}

async function main() {
  if (!APPS_SCRIPT_URL) {
    console.log('[prebuild] No APPS_SCRIPT_URL set — using existing static JSON files');
    return;
  }

  console.log('[prebuild] Fetching live stock from Apps Script...');

  try {
    const url = `${APPS_SCRIPT_URL}?store=MJ01`;
    const res = await fetchFeedWithRetry(url);

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

    try {

      fs.writeFileSync(STOCK_META_PATH, JSON.stringify({ stockDate: data.stockDate || '', fetchedAt: new Date().toISOString() }, null, 2) + '\n', 'utf-8');

    } catch (metaErr) {

      console.warn(`[prebuild] stock-meta.json not written: ${metaErr.message}`);

    }

    console.log(`[prebuild] Stock date: ${data.stockDate || 'unknown'}`);
    console.log('[prebuild] Done!');

  } catch (err) {
    console.warn(`[prebuild] Live fetch failed: ${err.message}`);
    console.warn('[prebuild] Keeping existing JSON files as fallback');
  }
}

main();
