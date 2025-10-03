/*
  בדיקת Smoke לשרת ה-API המקומי
  - מנסה לקרוא /api/health על פורט 5044 במספר ניסיונות עם backoff
  - מחזיר קוד יציאה 0 על הצלחה, 1 על כישלון
*/

const HEALTH_URL = process.env.SMOKE_HEALTH_URL || 'http://localhost:5044/api/health';
const MAX_RETRIES = Number(process.env.SMOKE_RETRIES || 12); // כ-דקה (12*5ש)
const DELAY_MS = Number(process.env.SMOKE_DELAY_MS || 5000);

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function openUrlInBrowser(url) {
  try {
    const { spawn } = require('child_process');
    const platform = process.platform;
    if (platform === 'win32') {
      // PowerShell פתיחה בדפדפן ברירת מחדל
      spawn('powershell', ['-NoProfile', '-Command', `Start-Process ${url}`], { detached: true, stdio: 'ignore' });
    } else if (platform === 'darwin') {
      spawn('open', [url], { detached: true, stdio: 'ignore' });
    } else {
      spawn('xdg-open', [url], { detached: true, stdio: 'ignore' });
    }
  } catch (e) {
    console.error('⚠️ פתיחת דפדפן נכשלה:', e.message);
  }
}

async function checkHealth() {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(HEALTH_URL, { method: 'GET' });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data && (data.status === 'ok' || data.status === 'healthy')) {
          console.log(`✅ שרת בריא (ניסיון ${attempt}/${MAX_RETRIES})`);
          if (String(process.env.SMOKE_OPEN_BROWSER || '').trim() === '1') {
            const openUrl = process.env.SMOKE_OPEN_URL || 'http://localhost:3639';
            console.log(`🌐 פותח דפדפן אל ${openUrl}`);
            openUrlInBrowser(openUrl);
          }
          process.exit(0);
        }
        console.log(`ℹ️ תשובה התקבלה אך לא בריאה: ${JSON.stringify(data)}`);
      } else {
        console.log(`⚠️ סטטוס HTTP: ${res.status} (ניסיון ${attempt}/${MAX_RETRIES})`);
      }
    } catch (err) {
      console.log(`⏳ ממתין לשרת... (ניסיון ${attempt}/${MAX_RETRIES}) - ${err.message}`);
    }
    await delay(DELAY_MS);
  }

  console.error('❌ השרת לא עלה בזמן המצופה');
  process.exit(1);
}

checkHealth();


