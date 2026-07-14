# Phase 2 — Payments, US Tax, PDF Invoices

## Scope delivered

1. **Stripe Checkout** — `POST /api/billing/:id/checkout` יוצר Session; הלקוח משלם ב-Stripe (PCI). אין איסוף כרטיס באתר.
2. **Webhooks** — `POST /api/webhooks/stripe` מסמן חשבונית כ-`paid` ב-`checkout.session.completed`.
3. **US sales tax** — `server/services/taxService.js` מחשב מס יעד לפי מדינה + nexus (`COMPANY_TAX_NEXUS_STATES`). ישראל: מע״מ 17%. אופציה: `STRIPE_TAX_ENABLED=true` לחישוב Stripe Tax ב-Checkout.
4. **PDF** — `GET /api/billing/:id/pdf` מפיק חשבונית PDF (pdfkit).
5. **Frontend** — `CheckOutPage.tsx` הוחלף: בחירת חשבונית, כתובת מס, תשלום Stripe, הורדת PDF.

## Key files

- `server/services/taxService.js`
- `server/services/stripeService.js`
- `server/services/pdfInvoiceService.js`
- `server/services/billingService.js`
- `server/routes/billingRoutes.js`
- `server/routes/webhookRoutes.js`
- `server/models/Invoice.js`
- `src/pages/CheckOutPage.tsx`

## Local setup

1. מלא ב-`.env`: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `JWT_*`, `MONGODB_URI`
2. Stripe CLI: `stripe listen --forward-to localhost:5044/api/webhooks/stripe`
3. צור הצעת מחיר → `POST /api/quotes/:id/accept` → קבל `invoice` → פתח `/checkout?invoiceId=...`
4. שלם עם כרטיס בדיקה `4242 4242 4242 4242`

## Not in Phase 2

- QuickBooks / הנהלת חשבונות מלאה
- חתימה דיגיטלית
- React Native
- Avalara (שיעורי מס מקומיים מדויקים) — השתמש ב-Stripe Tax בפרודקשן
