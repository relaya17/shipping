const express = require('express');
const router = express.Router();

const { rateLimits, basicSecurity } = require('../middleware/security');
const auth = require('../middleware/auth');
const providers = require('../ai/providers');
const tools = require('../ai/tools');
const SYSTEM_PROMPT = require('../ai/systemPrompt');

router.use(rateLimits.api);
router.use(basicSecurity);

// POST /api/ai/chat - סוכן AI עם streaming + tool-calling (GPS, הצעות מחיר, חוק ארה״ב)
router.post('/chat', auth.optionalAuth, async (req, res, next) => {
  try {
    if (!providers.isConfigured()) {
      return res.status(503).json({
        success: false,
        error: `סוכן ה-AI לא מוגדר: חסר ${providers.getRequiredApiKeyEnvVar()} בסביבה (AI_PROVIDER=${providers.provider})`
      });
    }

    const { messages, message, language } = req.body || {};
    const conversation = Array.isArray(messages) && messages.length
      ? messages
      : [{ role: 'user', content: message || '' }];

    if (!conversation.some((m) => (m.content || '').trim())) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const lang = String(
      language ||
      req.get('X-App-Language') ||
      (req.get('Accept-Language') || 'en').split(',')[0]
    )
      .split('-')[0]
      .toLowerCase();

    const languageNames = {
      he: 'Hebrew',
      ar: 'Arabic',
      es: 'Spanish',
      ru: 'Russian',
      zh: 'Chinese',
      tr: 'Turkish',
      sv: 'Swedish',
      el: 'Greek',
      en: 'English'
    };
    const replyLanguage = languageNames[lang] || 'English';
    const system = `${SYSTEM_PROMPT}\n\nAlways reply in ${replyLanguage} (language code: ${lang}) unless the user explicitly asks for another language.`;

    const { streamText } = await import('ai');
    const model = await providers.getModel();

    const result = streamText({
      model,
      system,
      messages: conversation,
      tools,
      maxSteps: 8
    });

    result.pipeDataStreamToResponse(res);
  } catch (error) {
    next(error);
  }
});

router.get('/recommendations', auth.optionalAuth, async (req, res, next) => {
  try {
    return res.json({
      success: true,
      recommendations: [
        { id: 'rec_us_interstate', type: 'service', title: 'US Interstate HHG', description: 'FMCSA-aware interstate household move' },
        { id: 'rec_gps', type: 'feature', title: 'Live GPS tracking', description: 'Track your shipment on the map in real time' },
        { id: 'rec_insurance', type: 'service', title: 'Full value protection', description: 'Recommended for high-value inventory' }
      ]
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
