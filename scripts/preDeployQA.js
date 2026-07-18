#!/usr/bin/env node
/*
 * ============================================================
 *  QA מקיף לפני העלאה (Pre-Deploy QA) — VIP International Shipping
 * ============================================================
 *  מריץ שרשרת בדיקות איכות לפני deploy: סביבה, סודות, תלויות,
 *  טיפוסים, לינט, בנייה, גודל bundle, אבטחת תלויות, ו-smoke test
 *  לשרת (אם מוגדרות משתני סביבה).
 *
 *  הרצה:
 *    pnpm run qa
 *    node scripts/preDeployQA.js
 *    node scripts/preDeployQA.js --skip-server --strict-audit -v
 *
 *  קודי יציאה:
 *    0 = הכל עבר, מוכן ל-deploy
 *    1 = לפחות בדיקת חובה אחת נכשלה — לא לבצע deploy
 * ============================================================
 */

'use strict';

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const FLAGS = {
  skipServer: args.includes('--skip-server'),
  strictAudit: args.includes('--strict-audit'),
  verbose: args.includes('-v') || args.includes('--verbose'),
};

const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m', magenta: '\x1b[35m',
};

const results = [];
let hasRequiredFailure = false;
const startedAt = Date.now();

function line(char = '─', n = 60) { return char.repeat(n); }
function header(title) {
  console.log('\n' + C.bold + C.cyan + line('━') + C.reset);
  console.log(C.bold + C.cyan + `  ${title}` + C.reset);
  console.log(C.bold + C.cyan + line('━') + C.reset);
}
function sh(cmd, opts = {}) {
  return execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: opts.inherit ? 'inherit' : 'pipe', ...opts });
}

/**
 * מריץ בדיקה אחת, מודד זמן, מדפיס תוצאה ושומר בדוח הסיכום.
 * required=false => כישלון הופך לאזהרה בלבד ולא חוסם deploy.
 */
function step(name, fn, { required = true, skip = false, skipReason = '' } = {}) {
  if (skip) {
    console.log(`${C.dim}⏭  ${name} — דולג (${skipReason})${C.reset}`);
    results.push({ name, status: 'skip', note: skipReason });
    return;
  }
  process.stdout.write(`${C.cyan}▶ ${name}...${C.reset} `);
  const t0 = Date.now();
  try {
    const info = fn();
    const dur = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`${C.green}✅ עבר${C.reset} ${C.dim}(${dur}s)${C.reset}`);
    results.push({ name, status: 'pass', duration: dur, info: info || '' });
  } catch (err) {
    const dur = ((Date.now() - t0) / 1000).toFixed(1);
    if (required) {
      console.log(`${C.red}❌ נכשל${C.reset} ${C.dim}(${dur}s)${C.reset}`);
      hasRequiredFailure = true;
      results.push({ name, status: 'fail', duration: dur, error: err.message });
    } else {
      console.log(`${C.yellow}⚠️  אזהרה${C.reset} ${C.dim}(${dur}s)${C.reset}`);
      results.push({ name, status: 'warn', duration: dur, error: err.message });
    }
    const detail = err.stdout ? err.stdout.toString() : err.message;
    if (FLAGS.verbose || required) {
      console.log(C.dim + detail.trim().split('\n').slice(0, 25).join('\n') + C.reset);
    }
  }
}

// ------------------------------------------------------------
header('1. סביבה');
// ------------------------------------------------------------
step('גרסת Node.js', () => {
  const v = process.version;
  const major = Number(v.slice(1).split('.')[0]);
  if (major < 18) throw new Error(`Node ${v} ישן מדי — נדרש 18+`);
  return v;
});

step('pnpm מותקן', () => sh('pnpm -v').trim());

step('קובץ pnpm-lock.yaml קיים ותואם ל-package.json', () => {
  if (!fs.existsSync(path.join(ROOT, 'pnpm-lock.yaml'))) throw new Error('pnpm-lock.yaml חסר');
  return 'OK';
});

// ------------------------------------------------------------
header('2. גיט וסודות (Secrets)');
// ------------------------------------------------------------
step('אין קובץ .env עוקב (tracked) בגיט', () => {
  const tracked = sh('git ls-files').split('\n');
  const envFiles = tracked.filter(f => /(^|\/)\.env(\..*)?$/.test(f) && !f.endsWith('.example'));
  if (envFiles.length) throw new Error('קבצי .env במעקב גיט: ' + envFiles.join(', '));
  return 'OK';
});

step('אין סודות חשודים בקוד העוקב', () => {
  const patterns = [
    /sk_live_[0-9a-zA-Z]{10,}/,           // Stripe live secret key
    /AKIA[0-9A-Z]{16}/,                    // AWS access key
    /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/,
    /mongodb(\+srv)?:\/\/[^:]+:[^@]{6,}@/, // Mongo URI עם סיסמה גלויה
  ];
  const tracked = sh('git ls-files')
    .split('\n')
    .filter(f => f && /\.(js|jsx|ts|tsx|json|env\.example|yml|yaml)$/.test(f));
  const hits = [];
  for (const file of tracked) {
    const full = path.join(ROOT, file);
    if (!fs.existsSync(full)) continue;
    const content = fs.readFileSync(full, 'utf8');
    for (const re of patterns) {
      if (re.test(content)) hits.push(`${file} (${re})`);
    }
  }
  if (hits.length) throw new Error('נמצאו דפוסי סוד חשודים:\n' + hits.join('\n'));
  return 'OK';
});

step('עץ העבודה של גיט', () => {
  const branch = sh('git rev-parse --abbrev-ref HEAD').trim();
  const dirty = sh('git status --porcelain').trim();
  if (dirty) {
    return `${branch} — יש שינויים לא-מחויבים (${dirty.split('\n').length} קבצים)`;
  }
  return `${branch} — נקי`;
}, { required: false });

// ------------------------------------------------------------
header('3. תלויות');
// ------------------------------------------------------------
step('התקנת תלויות (pnpm install --frozen-lockfile)', () => {
  sh('pnpm install --frozen-lockfile');
  return 'OK';
});

step('בדיקת אבטחת תלויות (pnpm audit)', () => {
  try {
    sh('pnpm audit --prod --json');
    return 'ללא ממצאים';
  } catch (err) {
    let summary = 'נמצאו ממצאים';
    try {
      const json = JSON.parse(err.stdout || '{}');
      const counts = json.metadata && json.metadata.vulnerabilities;
      if (counts) {
        summary = Object.entries(counts).filter(([, n]) => n > 0).map(([k, n]) => `${k}:${n}`).join(', ');
        const critical = (counts.critical || 0) + (counts.high || 0);
        if (FLAGS.strictAudit && critical > 0) throw new Error(`חולשות critical/high: ${summary}`);
      }
    } catch (parseErr) {
      if (parseErr instanceof SyntaxError) { /* ignore parse issues, keep generic summary */ }
      else throw parseErr;
    }
    if (!FLAGS.strictAudit) throw Object.assign(new Error(summary), { stdout: summary });
    throw new Error(summary);
  }
}, { required: FLAGS.strictAudit });

// ------------------------------------------------------------
header('4. בדיקות קוד סטטיות');
// ------------------------------------------------------------
step('בדיקת טיפוסים (type-check)', () => {
  sh('pnpm run type-check');
  return 'OK';
});

step('לינט (eslint)', () => {
  sh('pnpm run lint');
  return 'OK';
});

// ------------------------------------------------------------
header('5. בנייה (Build)');
// ------------------------------------------------------------
step('בניית production build', () => {
  sh('pnpm run build');
  return 'OK';
});

step('קובצי הבנייה קיימים ותקינים', () => {
  const distDir = path.join(ROOT, 'dist');
  const indexHtml = path.join(distDir, 'index.html');
  if (!fs.existsSync(distDir)) throw new Error('תיקיית dist לא נוצרה');
  if (!fs.existsSync(indexHtml)) throw new Error('dist/index.html חסר');
  return 'OK';
});

step('גודל bundle סביר', () => {
  const assetsDir = path.join(ROOT, 'dist', 'assets');
  if (!fs.existsSync(assetsDir)) throw new Error('dist/assets חסר');
  const files = fs.readdirSync(assetsDir)
    .filter(f => f.endsWith('.js'))
    .map(f => {
      const stat = fs.statSync(path.join(assetsDir, f));
      return { f, kb: Math.round(stat.size / 1024) };
    })
    .sort((a, b) => b.kb - a.kb);
  const big = files.filter(f => f.kb > 1000);
  const top = files.slice(0, 5).map(f => `${f.f}: ${f.kb}KB`).join(', ');
  if (big.length) throw new Error(`chunk-ים מעל 1MB: ${big.map(f => f.f + ' ' + f.kb + 'KB').join(', ')}`);
  return top || 'אין קובצי JS';
}, { required: false });

// ------------------------------------------------------------
header('6. Smoke Test לשרת ה-API');
// ------------------------------------------------------------
const hasEnvFile = fs.existsSync(path.join(ROOT, '.env'));
const hasJwtSecrets = !!(process.env.JWT_SECRET && process.env.JWT_REFRESH_SECRET) || hasEnvFile;

if (FLAGS.skipServer) {
  step('הרצת שרת + בדיקת /api/health', () => {}, { skip: true, skipReason: '--skip-server' });
} else if (!hasJwtSecrets) {
  step('הרצת שרת + בדיקת /api/health', () => {}, {
    skip: true,
    skipReason: 'אין .env / JWT_SECRET מוגדרים בסביבה — הרץ עם --skip-server כדי להשתיק אזהרה זו',
  });
} else {
  step('הרצת שרת + בדיקת /api/health', () => {
    const env = { ...process.env, NODE_ENV: process.env.NODE_ENV || 'development', PORT: '5044' };
    const server = spawn('node', ['server/app.js'], { cwd: ROOT, env, stdio: 'ignore', detached: true });
    try {
      sh('node scripts/smoke.js', { env: { ...env, SMOKE_RETRIES: '6', SMOKE_DELAY_MS: '2000' } });
      return 'שרת עלה ו-/api/health הגיב';
    } finally {
      try { process.kill(-server.pid); } catch (e) { try { server.kill(); } catch (e2) {} }
    }
  });
}

// ------------------------------------------------------------
header('סיכום');
// ------------------------------------------------------------
const totalDur = ((Date.now() - startedAt) / 1000).toFixed(1);
const pad = (s, n) => (s + ' '.repeat(n)).slice(0, n);

for (const r of results) {
  const icon = { pass: `${C.green}✅`, fail: `${C.red}❌`, warn: `${C.yellow}⚠️ `, skip: `${C.dim}⏭ ` }[r.status];
  const dur = r.duration ? `${r.duration}s` : '';
  console.log(`${icon}${C.reset} ${pad(r.name, 45)} ${C.dim}${dur}${C.reset}`);
}

console.log('\n' + line('─'));
console.log(`זמן כולל: ${totalDur}s`);

if (hasRequiredFailure) {
  console.log(`${C.bold}${C.red}\n❌ QA נכשל — אין לבצע deploy עד לתיקון הבדיקות שנכשלו למעלה.${C.reset}\n`);
  process.exit(1);
} else {
  const warnings = results.filter(r => r.status === 'warn').length;
  const skipped = results.filter(r => r.status === 'skip').length;
  console.log(`${C.bold}${C.green}\n✅ כל בדיקות החובה עברו — מוכן ל-deploy.${C.reset}` +
    (warnings ? ` ${C.yellow}(${warnings} אזהרות לבדיקה)${C.reset}` : '') +
    (skipped ? ` ${C.dim}(${skipped} דילוגים)${C.reset}` : '') + '\n');
  process.exit(0);
}
