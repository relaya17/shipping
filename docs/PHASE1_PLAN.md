# תוכנית שלבים — Phase 1

## החלטות שהתקבלו

1. **AI SDK: Vercel AI SDK** — סוכן שכבתי מעל ספריית `ai`, לא נעול לספק מודל אחד (Anthropic/OpenAI/Google מתחלפים דרך משתנה סביבה). Azure ו-Cursor SDK נפסלו.
2. **סדר עדיפות Phase 1: אופציה B** — Auth אמיתי → חיבור Quote→Shipment→Billing → סוכן AI עם כלים (tools). Stripe/מס ארה"ב/PDF (A), QuickBooks/חתימה דיגיטלית/פורטל (C) ומובייל/אוטומציות (D) נדחים ל-Phase 2/3/4.

מצב קיים (נבדק בפועל בקוד): Express + Mongoose, `auth.js` הוא stub שמקבל כל `Bearer <משהו>` בלי אימות אמיתי, login מחזיר `"demo-token-for-" + email` בלי JWT ובלי בדיקת סיסמה, אין קשר בין Quote ל-Shipment (שני מודלים נפרדים, אין endpoint שהופך הצעה למשלוח), אין מודל Billing/Invoice בכלל, ו-`aiRoutes.js` מחזיר תשובות מקובעות (`'קיבלתי: ' + message`) בלי שום קריאה למודל שפה.

---

## ארכיטקטורת יעד

```
Frontend (Vite/React, קיים)
   │  axios + interceptor (JWT) + SSE/stream לצ'אט
   ▼
Express API (server/app.js, קיים)
   ├── /api/auth        →  JWT אמיתי (access + refresh), bcrypt
   ├── /api/quotes       →  Quote model + quoteService
   ├── /api/shipments     →  Shipment model + shipmentService (נוצר מ-Quote מאושרת)
   ├── /api/billing (חדש)  →  Invoice model (רשומה פנימית, בלי Stripe עדיין)
   └── /api/ai            →  Vercel AI SDK agent + tools שקוראים ל-services הפנימיים
        │
        ▼
   ספק מודל (env-driven: ANTHROPIC_API_KEY / OPENAI_API_KEY)
```

עקרון מפתח: שכבת **services** חדשה (`server/services/*`) מפרידה לוגיקה עסקית מה-routes, כדי שגם ה-REST endpoints וגם כלי ה-AI Agent יקראו לאותה לוגיקה (לא כפילות).

---

## פירוט שבועי (3–6 שבועות)

**שבוע 1 — Auth אמיתי**
JWT (access 15 דק׳ + refresh 7 ימים), hash סיסמאות עם bcrypt (הספרייה כבר מותקנת), middleware `requireAuth`/`requireAdmin` אמיתיים במקום ה-stub, endpoint `/api/auth/refresh` ו-`/api/auth/logout`.

**שבוע 2 — חיבור Quote→Shipment**
Endpoint חדש `POST /api/quotes/:id/accept` שהופך Quote מאושרת ל-Shipment (יוצר רשומה חדשה עם `sourceQuoteId`), מכונת מצבים (state machine) לסטטוסים, ולידציה שלא ניתן ליצור Shipment בלי Quote מאושרת (או הזמנה ידנית של אדמין).

**שבוע 3 — Billing (רשומה פנימית בלבד, בלי Stripe)**
מודל `Invoice` חדש המקושר ל-Shipment, נוצר אוטומטית כש-Shipment עובר ל-`booked`, סטטוסים (`draft`/`issued`/`paid`/`overdue`) שמעודכנים ידנית כרגע (התשלום עצמו נכנס ב-Phase 2/A). זה מניח את התשתית כדי ש-Stripe בעתיד רק "יתחבר" לרשומה קיימת.

**שבוע 4–5 — סוכן AI עם כלים (Vercel AI SDK)**
התקנת `ai` + `@ai-sdk/anthropic` (או `@ai-sdk/openai`, מוחלף ב-env), הגדרת כלים: `getQuote`, `createQuote`, `trackShipment`, `getShipmentStatus`, `getPricingEstimate` — כל כלי קורא ל-service הרלוונטי (לא שכפול לוגיקה). endpoint `/api/ai/chat` עובר ל-streaming (`streamText`/`toDataStreamResponse`), והחלפת `ChatBot.tsx` הקיים (שמדבר מול ה-stub) ב-hook `useChat` מהחבילה `ai/react`.

**שבוע 6 — אינטגרציה, קשיחות, מסירה**
בדיקות end-to-end לזרימה Quote→Shipment→Invoice→AI chat, ולידציית env (חסר מפתח API = שגיאה ברורה בעליה, לא קריסה שקטה), עדכון `docs/API.md`, ותיעוד "מה נדחה ל-Phase 2" בשביל ה-handoff לעבודה על Stripe/מס/PDF.

---

## קובצי יעד

### Backend — חדשים
- `server/services/quoteService.js`
- `server/services/shipmentService.js`
- `server/services/billingService.js`
- `server/models/Invoice.js`
- `server/routes/authRoutes.js`
- `server/routes/billingRoutes.js`
- `server/utils/jwt.js`
- `server/ai/providers.js` — בחירת ספק מודל לפי env
- `server/ai/tools/quoteTools.js`, `server/ai/tools/shipmentTools.js`
- `server/config/env.js` — ולידציית משתני סביבה חובה בעליה

### Backend — עריכה
- `server/middleware/auth.js` — JWT אמיתי במקום ה-stub
- `server/routes/userRoutes.js` — הסרת login/register הדמו, הפניה ל-authRoutes
- `server/routes/quoteRoutes.js` — הוספת `POST /:id/accept`
- `server/routes/aiRoutes.js` — מעבר ל-Vercel AI SDK + streaming
- `server/app.js` — הוספת `/api/auth`, `/api/billing`, טעינת `env.js` בעליה

### Frontend — חדשים
- `src/service/api.ts` — axios client עם interceptor ל-JWT ו-refresh
- `src/redux/authSlice.ts`
- `src/hooks/useAuth.ts`

### Frontend — עריכה
- `src/components/AI/ChatBot.tsx` — מעבר ל-streaming עם `useChat`
- דפי Quote/Shipment הקיימים תחת `src/pages` — חיבור ל-endpoints האמיתיים במקום נתוני דמו

### קונפיג
- `environment.example` — הוספת `JWT_SECRET`, `JWT_REFRESH_SECRET`, `ANTHROPIC_API_KEY`/`OPENAI_API_KEY`, `AI_PROVIDER`
- `package.json` — הוספת `ai`, `@ai-sdk/anthropic` (או `@ai-sdk/openai`), `zod` (לסכמות כלים)

---

## מפורש נדחה מ-Phase 1 (יעד לשלבים הבאים)
- **Phase 2 (A):** Stripe, מס מכירה ארה"ב לפי מדינה, חשבוניות PDF אמיתיות — נבנה על גבי מודל ה-Invoice שנוצר בשבוע 3.
- **Phase 3 (C):** אינטגרציית QuickBooks, חתימה דיגיטלית, פורטל לקוח מלא.
- **Phase 4 (D):** PWA מלא/React Native, אוטומציות תפעול.

## הערת ספק מודל
ה-AI SDK לא נועל אתכם לספק — `AI_PROVIDER` ב-env קובע Anthropic/OpenAI, וקוד ה-agent (`server/ai/providers.js`) בוחר לפי זה. מומלץ להתחיל עם ספק אחד ולוודא שכלי ה-tool-calling עובדים לפניו, ורק אז להוסיף ספק שני אם צריך.

## Definition of Done — Phase 1
משתמש יכול: להירשם/להתחבר עם JWT אמיתי → לבקש הצעת מחיר → לאשר אותה והיא הופכת למשלוח → נוצרת רשומת חיוב פנימית → לשוחח עם סוכן AI שיודע לבדוק סטטוס משלוח וליצור הצעת מחיר חדשה דרך כלים אמיתיים (לא תשובות מקובעות).
