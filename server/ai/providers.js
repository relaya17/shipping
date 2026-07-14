/**
 * בחירת ספק מודל AI לפי משתנה סביבה — זו הנקודה שנותנת את ה"לא נעול ל-Azure"
 * שביקשת: Vercel AI SDK עובד מול כל ספק, אפשר להחליף בלי לגעת בשאר הקוד.
 *
 * הערה טכנית: '@ai-sdk/*' ו-'ai' הן ספריות ESM. הפרויקט מוגדר "type": "commonjs",
 * ולכן משתמשים כאן ב-import() דינמי במקום require() רגיל.
 */

const PROVIDER = (process.env.AI_PROVIDER || 'anthropic').toLowerCase();

async function getModel() {
  if (PROVIDER === 'openai') {
    const { openai } = await import('@ai-sdk/openai');
    return openai(process.env.OPENAI_MODEL || 'gpt-4o-mini');
  }

  // ברירת מחדל: Anthropic
  const { anthropic } = await import('@ai-sdk/anthropic');
  return anthropic(process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest');
}

function getRequiredApiKeyEnvVar() {
  return PROVIDER === 'openai' ? 'OPENAI_API_KEY' : 'ANTHROPIC_API_KEY';
}

function isConfigured() {
  return !!process.env[getRequiredApiKeyEnvVar()];
}

module.exports = { getModel, getRequiredApiKeyEnvVar, isConfigured, provider: PROVIDER };
