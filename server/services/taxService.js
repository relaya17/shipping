/**
 * חישוב מס מכירה — Phase 2.
 * ארה״ב: מס יעד לפי מדינה (destination-based) + nexus של החברה.
 * ישראל: מע״מ 17%.
 * כש-Stripe Tax מופעל (STRIPE_TAX_ENABLED=true) — Checkout של Stripe מחשב מס אוטומטית;
 * השירות הזה משמש לתצוגה מקדימה ולסנכרון רשומת Invoice לפני/אחרי תשלום.
 */

// שיעורי מס מדינה ממוצעים (state-level). שיעורים מקומיים משתנים — בפרודקשן מומלץ Stripe Tax / Avalara.
const US_STATE_SALES_TAX = {
  AL: 0.04, AK: 0, AZ: 0.056, AR: 0.065, CA: 0.0725, CO: 0.029, CT: 0.0635,
  DE: 0, FL: 0.06, GA: 0.04, HI: 0.04, ID: 0.06, IL: 0.0625, IN: 0.07,
  IA: 0.06, KS: 0.065, KY: 0.06, LA: 0.0445, ME: 0.055, MD: 0.06, MA: 0.0625,
  MI: 0.06, MN: 0.06875, MS: 0.07, MO: 0.04225, MT: 0, NE: 0.055, NV: 0.0685,
  NH: 0, NJ: 0.06625, NM: 0.04875, NY: 0.04, NC: 0.0475, ND: 0.05, OH: 0.0575,
  OK: 0.045, OR: 0, PA: 0.06, RI: 0.07, SC: 0.06, SD: 0.045, TN: 0.07,
  TX: 0.0625, UT: 0.061, VT: 0.06, VA: 0.053, WA: 0.065, WV: 0.06, WI: 0.05, WY: 0.04,
  DC: 0.06
};

const IL_VAT_RATE = 0.17;

function normalizeCountry(country) {
  const c = String(country || '').trim().toUpperCase();
  if (c === 'US' || c === 'USA' || c === 'UNITED STATES' || c === 'UNITED STATES OF AMERICA') return 'US';
  if (c === 'IL' || c === 'ISR' || c === 'ISRAEL' || c === 'ישראל') return 'IL';
  return c || 'US';
}

function normalizeState(state) {
  if (!state) return null;
  const s = String(state).trim().toUpperCase();
  if (s.length === 2 && US_STATE_SALES_TAX[s] !== undefined) return s;
  const byName = {
    ALABAMA: 'AL', ALASKA: 'AK', ARIZONA: 'AZ', ARKANSAS: 'AR', CALIFORNIA: 'CA',
    COLORADO: 'CO', CONNECTICUT: 'CT', DELAWARE: 'DE', FLORIDA: 'FL', GEORGIA: 'GA',
    HAWAII: 'HI', IDAHO: 'ID', ILLINOIS: 'IL', INDIANA: 'IN', IOWA: 'IA',
    KANSAS: 'KS', KENTUCKY: 'KY', LOUISIANA: 'LA', MAINE: 'ME', MARYLAND: 'MD',
    MASSACHUSETTS: 'MA', MICHIGAN: 'MI', MINNESOTA: 'MN', MISSISSIPPI: 'MS',
    MISSOURI: 'MO', MONTANA: 'MT', NEBRASKA: 'NE', NEVADA: 'NV', 'NEW HAMPSHIRE': 'NH',
    'NEW JERSEY': 'NJ', 'NEW MEXICO': 'NM', 'NEW YORK': 'NY', 'NORTH CAROLINA': 'NC',
    'NORTH DAKOTA': 'ND', OHIO: 'OH', OKLAHOMA: 'OK', OREGON: 'OR', PENNSYLVANIA: 'PA',
    'RHODE ISLAND': 'RI', 'SOUTH CAROLINA': 'SC', 'SOUTH DAKOTA': 'SD', TENNESSEE: 'TN',
    TEXAS: 'TX', UTAH: 'UT', VERMONT: 'VT', VIRGINIA: 'VA', WASHINGTON: 'WA',
    'WEST VIRGINIA': 'WV', WISCONSIN: 'WI', WYOMING: 'WY', 'DISTRICT OF COLUMBIA': 'DC'
  };
  return byName[s] || null;
}

function getNexusStates() {
  const raw = process.env.COMPANY_TAX_NEXUS_STATES || 'CA,NY,TX,FL,IL';
  return raw.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean);
}

/**
 * @param {object} input
 * @param {number} input.subtotal
 * @param {string} [input.country]
 * @param {string} [input.state]
 * @param {boolean} [input.taxExempt]
 */
function calculateTax({ subtotal, country, state, taxExempt = false }) {
  const amount = Math.max(0, Number(subtotal) || 0);
  const isoCountry = normalizeCountry(country);

  if (taxExempt || amount === 0) {
    return {
      taxable: false,
      country: isoCountry,
      state: normalizeState(state),
      rate: 0,
      taxAmount: 0,
      totalWithTax: amount,
      jurisdiction: 'exempt',
      engine: 'internal',
      notes: 'Tax exempt or zero subtotal'
    };
  }

  if (isoCountry === 'IL') {
    const taxAmount = roundMoney(amount * IL_VAT_RATE);
    return {
      taxable: true,
      country: 'IL',
      state: null,
      rate: IL_VAT_RATE,
      taxAmount,
      totalWithTax: roundMoney(amount + taxAmount),
      jurisdiction: 'IL-VAT',
      engine: 'internal',
      notes: 'Israel VAT 17%'
    };
  }

  if (isoCountry === 'US') {
    const st = normalizeState(state);
    if (!st) {
      return {
        taxable: false,
        country: 'US',
        state: null,
        rate: 0,
        taxAmount: 0,
        totalWithTax: amount,
        jurisdiction: 'US-unknown-state',
        engine: 'internal',
        notes: 'US destination requires a valid state for sales tax'
      };
    }

    const nexus = getNexusStates();
    if (!nexus.includes(st) && !nexus.includes('*')) {
      return {
        taxable: false,
        country: 'US',
        state: st,
        rate: 0,
        taxAmount: 0,
        totalWithTax: amount,
        jurisdiction: `US-${st}-no-nexus`,
        engine: 'internal',
        notes: `No economic nexus in ${st}; tax not collected`
      };
    }

    const rate = US_STATE_SALES_TAX[st] ?? 0;
    const taxAmount = roundMoney(amount * rate);
    return {
      taxable: rate > 0,
      country: 'US',
      state: st,
      rate,
      taxAmount,
      totalWithTax: roundMoney(amount + taxAmount),
      jurisdiction: `US-${st}`,
      engine: 'internal',
      notes: rate === 0
        ? `${st} has no state-level sales tax (local may still apply; use Stripe Tax in production)`
        : `US destination sales tax for ${st}`
    };
  }

  return {
    taxable: false,
    country: isoCountry,
    state: normalizeState(state),
    rate: 0,
    taxAmount: 0,
    totalWithTax: amount,
    jurisdiction: `${isoCountry}-passthrough`,
    engine: 'internal',
    notes: 'No automatic tax rules for this country in Phase 2; collect 0 pending compliance review'
  };
}

function roundMoney(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

function isStripeTaxEnabled() {
  return String(process.env.STRIPE_TAX_ENABLED || '').toLowerCase() === 'true';
}

module.exports = {
  calculateTax,
  normalizeCountry,
  normalizeState,
  getNexusStates,
  isStripeTaxEnabled,
  US_STATE_SALES_TAX,
  IL_VAT_RATE
};
