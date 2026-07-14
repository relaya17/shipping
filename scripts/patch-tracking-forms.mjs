import fs from 'fs';

function deepMerge(target, source) {
  if (Array.isArray(source)) return JSON.parse(JSON.stringify(source));
  if (source && typeof source === 'object') {
    const out = { ...(target && typeof target === 'object' && !Array.isArray(target) ? target : {}) };
    for (const [k, v] of Object.entries(source)) out[k] = deepMerge(out[k], v);
    return out;
  }
  return source;
}

const en = {
  tracking: {
    location_pending: 'Location pending',
    map_title: 'Shipment GPS map',
    tracking_hash: 'Tracking #:',
    estimated_arrival: 'Estimated arrival',
    tbd: 'TBD'
  },
  forms: {
    your_quote: 'Your quote:',
    quote_amount: 'Your quote: ${{amount}}'
  }
};

const he = {
  tracking: {
    location_pending: 'המיקום בהמתנה',
    map_title: 'מפת GPS של המשלוח',
    tracking_hash: 'מספר מעקב:',
    estimated_arrival: 'הגעה משוערת',
    tbd: 'טרם נקבע'
  },
  forms: {
    your_quote: 'ההצעה שלך:',
    quote_amount: 'ההצעה שלך: ${{amount}}'
  }
};

for (const [file, overlay] of [
  ['src/locales/en/translation.json', en],
  ['src/locales/he/translation.json', he]
]) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  fs.writeFileSync(file, JSON.stringify(deepMerge(data, overlay), null, 2) + '\n');
}
console.log('patched');
