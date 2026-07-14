/**
 * מאגר ידע תמציתי — חוקי הובלה בארה״ב + גיאוגרפיה תפעולית.
 * הסוכן קורא לזה דרך כלי lookupUsShippingLaw במקום להמציא רגולציה.
 * זה אינו ייעוץ משפטי מחייב; מפנה לעורך דין/רגולטור כשצריך.
 */

const US_STATES = {
  AL: { name: 'Alabama', capital: 'Montgomery', lat: 32.377, lon: -86.300, notes: 'Southern corridor; hurricane season impacts Gulf routes' },
  AK: { name: 'Alaska', capital: 'Juneau', lat: 58.301, lon: -134.419, notes: 'Not contiguous; air/sea preferred; extreme winter logistics' },
  AZ: { name: 'Arizona', capital: 'Phoenix', lat: 33.448, lon: -112.074, notes: 'Desert heat; Phoenix hub; I-10 corridor' },
  AR: { name: 'Arkansas', capital: 'Little Rock', lat: 34.746, lon: -92.289, notes: 'Central US; I-40 corridor' },
  CA: { name: 'California', capital: 'Sacramento', lat: 38.581, lon: -121.494, notes: 'Largest HHG market; CARB/emissions rules for fleets; LA/Long Beach ports; high sales tax nexus' },
  CO: { name: 'Colorado', capital: 'Denver', lat: 39.739, lon: -104.990, notes: 'Rocky Mountains; weather delays on I-70' },
  CT: { name: 'Connecticut', capital: 'Hartford', lat: 41.765, lon: -72.673, notes: 'Northeast corridor; dense urban delivery' },
  DE: { name: 'Delaware', capital: 'Dover', lat: 39.158, lon: -75.524, notes: 'No state sales tax; Mid-Atlantic logistics' },
  FL: { name: 'Florida', capital: 'Tallahassee', lat: 30.438, lon: -84.280, notes: 'Hurricane risk; Port of Miami; snowbird seasonal peaks' },
  GA: { name: 'Georgia', capital: 'Atlanta', lat: 33.749, lon: -84.388, notes: 'Atlanta major hub; Port of Savannah' },
  HI: { name: 'Hawaii', capital: 'Honolulu', lat: 21.309, lon: -157.858, notes: 'Ocean freight only for HHG; not contiguous' },
  ID: { name: 'Idaho', capital: 'Boise', lat: 43.615, lon: -116.202, notes: 'Mountain West; winter road closures' },
  IL: { name: 'Illinois', capital: 'Springfield', lat: 39.781, lon: -89.650, notes: 'Chicago major intermodal hub' },
  IN: { name: 'Indiana', capital: 'Indianapolis', lat: 39.768, lon: -86.158, notes: 'Crossroads of America; I-65/I-70' },
  IA: { name: 'Iowa', capital: 'Des Moines', lat: 41.586, lon: -93.625, notes: 'Midwest; agricultural corridors' },
  KS: { name: 'Kansas', capital: 'Topeka', lat: 39.047, lon: -95.677, notes: 'I-70 corridor; tornado season' },
  KY: { name: 'Kentucky', capital: 'Frankfort', lat: 38.200, lon: -84.873, notes: 'Louisville UPS Worldport nearby' },
  LA: { name: 'Louisiana', capital: 'Baton Rouge', lat: 30.451, lon: -91.187, notes: 'Port of New Orleans; hurricane risk' },
  ME: { name: 'Maine', capital: 'Augusta', lat: 44.310, lon: -69.779, notes: 'Northern New England; winter ice' },
  MD: { name: 'Maryland', capital: 'Annapolis', lat: 38.978, lon: -76.492, notes: 'Port of Baltimore; DC metro access' },
  MA: { name: 'Massachusetts', capital: 'Boston', lat: 42.360, lon: -71.058, notes: 'Dense urban; Port of Boston' },
  MI: { name: 'Michigan', capital: 'Lansing', lat: 42.733, lon: -84.555, notes: 'Detroit auto corridor; Great Lakes' },
  MN: { name: 'Minnesota', capital: 'Saint Paul', lat: 44.953, lon: -93.090, notes: 'Extreme cold; Twin Cities hub' },
  MS: { name: 'Mississippi', capital: 'Jackson', lat: 32.298, lon: -90.184, notes: 'I-55 corridor; Gulf access' },
  MO: { name: 'Missouri', capital: 'Jefferson City', lat: 38.576, lon: -92.173, notes: 'Kansas City / St. Louis hubs' },
  MT: { name: 'Montana', capital: 'Helena', lat: 46.589, lon: -112.039, notes: 'Long rural hauls; winter closures' },
  NE: { name: 'Nebraska', capital: 'Lincoln', lat: 40.813, lon: -96.702, notes: 'I-80 corridor' },
  NV: { name: 'Nevada', capital: 'Carson City', lat: 39.163, lon: -119.767, notes: 'Las Vegas / Reno; no state income tax' },
  NH: { name: 'New Hampshire', capital: 'Concord', lat: 43.208, lon: -71.537, notes: 'No sales tax; New England' },
  NJ: { name: 'New Jersey', capital: 'Trenton', lat: 40.220, lon: -74.756, notes: 'Port Newark/Elizabeth; NYC metro' },
  NM: { name: 'New Mexico', capital: 'Santa Fe', lat: 35.687, lon: -105.938, notes: 'I-40; high desert' },
  NY: { name: 'New York', capital: 'Albany', lat: 42.652, lon: -73.756, notes: 'NYC congestion pricing/access rules; Port of NY/NJ' },
  NC: { name: 'North Carolina', capital: 'Raleigh', lat: 35.779, lon: -78.638, notes: 'Charlotte hub; I-95/I-40' },
  ND: { name: 'North Dakota', capital: 'Bismarck', lat: 46.808, lon: -100.783, notes: 'Extreme winter; oil corridor' },
  OH: { name: 'Ohio', capital: 'Columbus', lat: 39.961, lon: -82.998, notes: 'Major distribution belt' },
  OK: { name: 'Oklahoma', capital: 'Oklahoma City', lat: 35.467, lon: -97.516, notes: 'I-35/I-40 crossroads' },
  OR: { name: 'Oregon', capital: 'Salem', lat: 44.942, lon: -123.035, notes: 'No sales tax; Cascades weather' },
  PA: { name: 'Pennsylvania', capital: 'Harrisburg', lat: 40.273, lon: -76.886, notes: 'Philadelphia / Pittsburgh corridors' },
  RI: { name: 'Rhode Island', capital: 'Providence', lat: 41.824, lon: -71.412, notes: 'Small dense state; New England' },
  SC: { name: 'South Carolina', capital: 'Columbia', lat: 34.000, lon: -81.034, notes: 'Port of Charleston' },
  SD: { name: 'South Dakota', capital: 'Pierre', lat: 44.368, lon: -100.350, notes: 'I-90; rural distances' },
  TN: { name: 'Tennessee', capital: 'Nashville', lat: 36.162, lon: -86.781, notes: 'Memphis FedEx hub; Nashville growth' },
  TX: { name: 'Texas', capital: 'Austin', lat: 30.267, lon: -97.743, notes: 'Huge market; Houston/Dallas hubs; Port of Houston; overweight permits vary by county' },
  UT: { name: 'Utah', capital: 'Salt Lake City', lat: 40.760, lon: -111.891, notes: 'I-15; mountain winter' },
  VT: { name: 'Vermont', capital: 'Montpelier', lat: 44.260, lon: -72.575, notes: 'Rural New England; winter' },
  VA: { name: 'Virginia', capital: 'Richmond', lat: 37.540, lon: -77.436, notes: 'Port of Virginia (Norfolk); DC metro' },
  WA: { name: 'Washington', capital: 'Olympia', lat: 47.037, lon: -122.900, notes: 'Port of Seattle/Tacoma; Cascade passes' },
  WV: { name: 'West Virginia', capital: 'Charleston', lat: 38.349, lon: -81.633, notes: 'Appalachian terrain; mountain roads' },
  WI: { name: 'Wisconsin', capital: 'Madison', lat: 43.073, lon: -89.401, notes: 'Great Lakes; winter' },
  WY: { name: 'Wyoming', capital: 'Cheyenne', lat: 41.140, lon: -104.820, notes: 'I-80; high winds / winter' },
  DC: { name: 'District of Columbia', capital: 'Washington', lat: 38.907, lon: -77.036, notes: 'Federal district; restricted vehicle access; security zones' }
};

const FEDERAL_TOPICS = {
  fmcsa_hhg: {
    title: 'FMCSA — Household Goods (HHG) movers',
    summary: [
      'Interstate household goods movers are regulated by the Federal Motor Carrier Safety Administration (FMCSA).',
      'Carriers generally need USDOT number and appropriate operating authority (MC number) for interstate for-hire transport.',
      'Consumers moving interstate should receive required estimates and the booklet "Your Rights and Responsibilities When You Move" (or current FMCSA consumer materials).',
      'Binding vs non-binding estimates: binding locks price (with defined conditions); non-binding is an approximation and final charges may differ within rules.',
      'Valuation coverage options must be offered; Full Value Protection vs Released Value have different liability.',
      'Complaints can be filed with FMCSA; state AG offices may also help with consumer protection.'
    ],
    disclaimer: 'Not legal advice. Verify current FMCSA rules at fmcsa.dot.gov.'
  },
  cabotage: {
    title: 'Cabotage & foreign carriers',
    summary: [
      'Domestic point-to-point US transport is generally reserved to US-authorized carriers.',
      'International ocean/air legs into a US port/airport are separate from inland domestic trucking.'
    ],
    disclaimer: 'Specialized immigration/transport counsel recommended for foreign fleet questions.'
  },
  customs: {
    title: 'US Customs (CBP) — inbound international',
    summary: [
      'Goods entering the US clear through U.S. Customs and Border Protection (CBP).',
      'Household effects may qualify for duty-free entry under specific conditions (e.g., personal effects of people relocating) — documentation required.',
      'Commercial shipments need Importer of Record, classification (HTS), and may owe duty/MERCHANDISE PROCESSING FEE.',
      'Restricted items: firearms, alcohol, food/plants, certain meds — check CBP and partner government agencies.'
    ],
    disclaimer: 'Use a licensed customs broker for commercial entries.'
  },
  interstate_vs_intrastate: {
    title: 'Interstate vs intrastate',
    summary: [
      'Interstate: crosses state lines (or certain international continuations) — federal FMCSA framework applies.',
      'Intrastate: entirely within one state — that state\'s PUC/DMV/mover licensing may apply in addition to general safety rules.',
      'Example: a CA→NV move is interstate; a Los Angeles→San Francisco move is intrastate California.'
    ],
    disclaimer: 'State mover licenses vary — California, New York, Texas and others have additional HHG rules.'
  },
  weight_permits: {
    title: 'Oversize / overweight permits',
    summary: [
      'Each state issues OS/OW permits; limits differ (axle weight, height, length, time-of-day, escorts).',
      'Multi-state routes need permits for every state traversed.',
      'Bridge laws and seasonal frost laws can restrict routes in northern states.'
    ],
    disclaimer: 'Coordinate with permit services before quoting oversized loads.'
  },
  sales_tax: {
    title: 'Sales tax on moving services',
    summary: [
      'Taxability of interstate moving services varies by state; many states do not tax interstate transportation the same way as local retail.',
      'VIP collects sales tax based on destination nexus configuration (COMPANY_TAX_NEXUS_STATES) or Stripe Tax when enabled.',
      'Exemption certificates may apply for resale/government — collect documentation.'
    ],
    disclaimer: 'Tax counsel / CPA should validate nexus and product tax codes.'
  }
};

function normalizeStateCode(input) {
  if (!input) return null;
  const s = String(input).trim().toUpperCase();
  if (US_STATES[s]) return s;
  const found = Object.entries(US_STATES).find(([, v]) => v.name.toUpperCase() === s);
  return found ? found[0] : null;
}

function lookup(topic, state) {
  const stateCode = normalizeStateCode(state);
  const topicKey = String(topic || 'fmcsa_hhg').toLowerCase().replace(/\s+/g, '_');

  const federal = FEDERAL_TOPICS[topicKey] || FEDERAL_TOPICS.fmcsa_hhg;
  const stateInfo = stateCode ? US_STATES[stateCode] : null;

  return {
    topic: federal.title,
    federalGuidance: federal.summary,
    disclaimer: federal.disclaimer,
    state: stateInfo
      ? {
          code: stateCode,
          name: stateInfo.name,
          capital: stateInfo.capital,
          coordinates: { lat: stateInfo.lat, lon: stateInfo.lon },
          operationalNotes: stateInfo.notes
        }
      : null,
    availableTopics: Object.keys(FEDERAL_TOPICS),
    availableStates: Object.keys(US_STATES)
  };
}

function getStateCoordinates(stateOrCityHint) {
  const code = normalizeStateCode(stateOrCityHint);
  if (code) {
    const s = US_STATES[code];
    return { state: code, lat: s.lat, lon: s.lon, label: `${s.capital}, ${s.name}` };
  }
  return null;
}

function listCorridors() {
  return [
    { name: 'I-95 East Coast', states: ['FL', 'GA', 'SC', 'NC', 'VA', 'MD', 'DE', 'NJ', 'NY', 'CT', 'RI', 'MA', 'NH', 'ME'] },
    { name: 'I-10 Southern', states: ['CA', 'AZ', 'NM', 'TX', 'LA', 'MS', 'AL', 'FL'] },
    { name: 'I-80 Central', states: ['CA', 'NV', 'UT', 'WY', 'NE', 'IA', 'IL', 'IN', 'OH', 'PA', 'NJ'] },
    { name: 'I-5 West Coast', states: ['CA', 'OR', 'WA'] },
    { name: 'I-35 Texas-Midwest', states: ['TX', 'OK', 'KS', 'MO', 'IA', 'MN'] }
  ];
}

module.exports = {
  US_STATES,
  FEDERAL_TOPICS,
  lookup,
  getStateCoordinates,
  normalizeStateCode,
  listCorridors
};
