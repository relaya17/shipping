/**
 * P0 i18n: deep-merge locale overlays into translation.json
 * Run: node scripts/apply-p0-i18n.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  adminEn,
  adminHe,
  adminTr,
  adminSv,
  adminEl,
  termsPrivacyByLocale,
} from './p0-i18n-data.mjs';
import { buildPageOverlays } from './p0-i18n-pages.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const localesDir = path.join(root, 'src/locales');

function deepMerge(target, source) {
  if (Array.isArray(source)) return JSON.parse(JSON.stringify(source));
  if (source && typeof source === 'object') {
    const out = { ...(target && typeof target === 'object' && !Array.isArray(target) ? target : {}) };
    for (const [k, v] of Object.entries(source)) out[k] = deepMerge(out[k], v);
    return out;
  }
  return source;
}

const pageOverlays = buildPageOverlays();

const overlaysByLocale = {
  en: {
    common: { retry: 'Retry' },
    admin: adminEn,
  },
  he: {
    common: { retry: 'נסה שוב' },
    admin: adminHe,
  },
  ar: {
    common: { retry: 'إعادة المحاولة' },
    admin: adminEn,
    pages: {
      ...termsPrivacyByLocale.ar,
      ...pageOverlays.ar,
    },
  },
  es: {
    common: { retry: 'Reintentar' },
    admin: adminEn,
    pages: {
      ...termsPrivacyByLocale.es,
      ...pageOverlays.es,
    },
  },
  ru: {
    common: { retry: 'Повторить' },
    admin: adminEn,
    pages: {
      ...termsPrivacyByLocale.ru,
      ...pageOverlays.ru,
    },
  },
  zh: {
    common: { retry: '重试' },
    admin: adminEn,
    pages: {
      ...termsPrivacyByLocale.zh,
      ...pageOverlays.zh,
    },
  },
  tr: {
    common: { retry: 'Tekrar dene' },
    admin: adminTr,
    pages: termsPrivacyByLocale.tr,
  },
  sv: {
    common: { retry: 'Försök igen' },
    admin: adminSv,
    pages: termsPrivacyByLocale.sv,
  },
  el: {
    common: { retry: 'Δοκιμάστε ξανά' },
    admin: adminEl,
    pages: termsPrivacyByLocale.el,
  },
};

const updated = [];

for (const [locale, overlay] of Object.entries(overlaysByLocale)) {
  const filePath = path.join(localesDir, locale, 'translation.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const merged = deepMerge(data, overlay);
  fs.writeFileSync(filePath, `${JSON.stringify(merged, null, 2)}\n`);
  updated.push(locale);
  console.log('merged', locale);
}

console.log('Done. Updated locales:', updated.join(', '));
