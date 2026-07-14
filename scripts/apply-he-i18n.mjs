/**
 * Deep-merge high-priority Hebrew strings into locales/he (and new keys into en).
 * Run: node scripts/apply-he-i18n.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function deepMerge(target, source) {
  if (Array.isArray(source)) return source.slice();
  if (source && typeof source === 'object') {
    const out = { ...(target && typeof target === 'object' && !Array.isArray(target) ? target : {}) };
    for (const [k, v] of Object.entries(source)) {
      out[k] = deepMerge(out[k], v);
    }
    return out;
  }
  return source;
}

const heOverlay = {
  nav: {
    specialty: 'התמחויות',
    resources: 'משאבים',
    toggle: 'פתח או סגור תפריט ניווט',
    logo_alt: 'לוגו VIP International Shipping',
    car_shipping: 'הובלת רכב',
    motorcycle_europe: 'אופנוע לאירופה',
    piano_moving: 'הובלת פסנתר',
    artwork_shipping: 'הובלת יצירות אמנות',
    moving_tips: 'טיפים להובלה',
    podcast: 'פודקאסט',
    why_vip: 'למה לבחור ב-VIP'
  },
  services: {
    interstate: 'הובלה בין מדינות',
    worldwide: 'הובלה עולמית',
    moving_services: 'שירותי הובלה',
    international: 'הובלה בינלאומית'
  },
  footer: {
    fmcsa_rights: 'הזכויות והאחריות שלך (FMCSA)',
    fmcsa_protect: 'הגנה על המעבר שלך (FMCSA)',
    licensed_insured: 'מורשה ומבוטח',
    verify_safer: '(אימות ב-FMCSA SAFER)',
    licensing_pending: 'פרטי רישוי בהמתנה —',
    verify_before_booking: 'אמתו כל מוביל ב-FMCSA SAFER לפני הזמנה.'
  },
  checkout: {
    title: 'תשלום מאובטח',
    subtitle: 'פרטי כרטיס אינם נשמרים באתר. התשלום מעובד דרך Stripe Checkout (תקן PCI).',
    login_required: 'נא להתחבר כדי לשלם חשבונית בצורה מאובטחת.',
    go_home: 'חזרה לדף הבית',
    signed_in_as: 'מחובר/ת כ',
    stripe_missing: 'Stripe אינו מוגדר בשרת (STRIPE_SECRET_KEY). עדיין ניתן לחשב מס ולהוריד PDF.',
    cart_note: 'פריטי העגלה מוצגים לעיון. תשלום בשלב 2 מבוסס חשבונית לאחר אישור הצעת מחיר — לא הזנת כרטיס ידנית.',
    invoice_label: 'חשבונית לתשלום',
    invoice_placeholder: 'הדביקו מזהה חשבונית',
    status: 'סטטוס',
    customer: 'לקוח',
    subtotal: 'סכום ביניים',
    tax: 'מס',
    amount_due: 'סכום לתשלום',
    billing_address: 'כתובת לחיוב מס',
    country: 'מדינה',
    state: 'מדינה בארה״ב',
    street: 'רחוב',
    city: 'עיר',
    postal: 'מיקוד',
    recalc_tax: 'חשב מס מחדש',
    pay_stripe: 'שלם עם Stripe',
    redirecting: 'מעביר ל-Stripe...',
    download_pdf: 'הורד חשבונית PDF',
    payment_success: 'התשלום התקבל. החשבונית תתעדכן אוטומטית.',
    payment_cancel: 'התשלום בוטל. אפשר לנסות שוב.',
    load_error: 'לא ניתן לטעון חשבוניות. התחברו שוב או ודאו שיש חשבונית פתוחה.',
    tax_updated: 'המס עודכן לפי כתובת היעד',
    tax_failed: 'עדכון המס נכשל',
    select_invoice: 'בחרו חשבונית לתשלום',
    no_checkout_url: 'לא התקבל קישור תשלום מ-Stripe',
    checkout_failed: 'יצירת תשלום נכשלה',
    pdf_failed: 'הורדת PDF נכשלה',
    united_states: 'ארצות הברית',
    israel: 'ישראל'
  },
  thankyou: {
    title: 'תודה רבה!',
    subtitle: 'הבקשה שלכם נשלחה בהצלחה',
    whats_next: 'מה קורה עכשיו?',
    step1: 'הצוות שלנו ייצור קשר תוך 24 שעות',
    step2: 'תקבלו הצעת מחיר מפורטת ומותאמת אישית',
    step3: 'נסייע בכל שאלה שתעלה',
    appreciation: 'תודה על האמון ב-VIP International Shipping. הצוות שלנו מוכן לספק שירות מעולה.',
    download: 'הורדת פרטים'
  },
  errors: {
    not_found_title: 'הדף לא נמצא',
    not_found_body: 'מצטערים, הדף שביקשתם אינו קיים או הועבר.',
    image_alt: 'שגיאת 404 — הדף לא נמצא'
  },
  contact: {
    title: 'צור קשר',
    subtitle: 'אנחנו כאן לעזור לכם בהובלה הבינלאומית',
    phone: 'טלפון',
    email: 'אימייל',
    address: 'כתובת',
    hours: 'שעות פעילות',
    support_247: 'תמיכה 24/7 בעברית ובאנגלית',
    fill_all: 'נא למלא את כל השדות החובה',
    thanks: 'תודה שפניתם אלינו, {{name}}',
    send_error: 'שגיאה בשליחת הטופס',
    network_error: 'אירעה שגיאת רשת בעת שליחת ההודעה',
    form_title: 'שלחו לנו הודעה',
    email_response: 'מענה מובטח תוך שעתיים',
    office_address: 'כתובת המשרד',
    visits_appointment: 'ביקורים בתיאום מראש',
    whatsapp_business: 'WhatsApp Business',
    instant_chat: 'תמיכה בצ׳אט מיידי',
    whatsapp_available: 'זמין 24/7 — מענה תוך דקות',
    details_title: 'פרטי התקשרות',
    urgent: 'דחוף',
    emergency_title: 'חירום במשלוח?',
    emergency_body: 'התקשרו לקו הראשי למעלה — הוא מנוטר 24/7 לחירום במשלוחים פעילים.',
    office_hours_title: 'שעות המשרד',
    placeholder_name: 'הזינו שם מלא',
    placeholder_email: 'your@email.com',
    placeholder_message: 'כתבו כאן את השאלה או ההודעה...',
    subject_select: 'בחרו נושא...',
    subject_quote: 'בקשת הצעת מחיר',
    subject_tracking: 'מעקב משלוח',
    subject_insurance: 'שאלות ביטוח',
    subject_complaint: 'תלונה',
    subject_general: 'כללי',
    consent: 'אני מסכים/ה לקבל עדכונים ומיילים שיווקיים',
    or_direct: 'או צרו קשר ישירות:',
    faq_title: 'שאלות נפוצות',
    faq_subtitle: 'המידע שחשוב לדעת',
    useful_links: 'קישורים שימושיים',
    link_packing: 'מדריך אריזה',
    link_customs: 'מחשבון מכס',
    link_map: 'מפת שירות',
    link_call: 'קביעת שיחה',
    offices_title: 'מיקומי המשרדים שלנו',
    map_title: 'מפה אינטראקטיבית',
    map_coming: 'בקרוב: Google Maps עם מיקומי המשרדים',
    show_directions: 'הצג הוראות הגעה',
    faq: [
      {
        q: 'כמה זמן נמשכת הובלה בינלאומית?',
        a: 'הובלה ימית: 14–35 ימים (חסכוני)\nהובלה אווירית: 3–7 ימים (מהיר)\nיבשתי: 5–14 ימים (אירופה)\nשירות אקספרס: 24–48 שעות (דחוף)'
      },
      {
        q: 'איזה ביטוח כלול?',
        a: 'ביטוח בסיסי: כלול בחינם (עד $1,000)\nמקיף: 2–3% מהערך ($10,000+)\nפרימיום: כיסוי מלא + החלפה\nמיוחד: אמנות ופריטי יוקרה'
      },
      {
        q: 'מה כולל המחיר?',
        a: 'איסוף מהבית / המשרד\nאריזה מקצועית (אופציונלי)\nהובלה בינלאומית מלאה\nביטוח בסיסי וטיפול במכס\nמעקב GPS בזמן אמת\nמסירה ליעד הסופי'
      },
      {
        q: 'איך עוקבים אחרי המשלוח?',
        a: 'מעקב מתקדם:\nGPS בזמן אמת עם מפה\nעדכוני SMS ואימייל אוטומטיים\nאפליקציה ייעודית\nצ׳אטבוט לשאלות מיידיות\nהתראות בכל שלב'
      },
      {
        q: 'מה אפשר לשלוח?',
        a: 'ריהוט וציוד בית\nאלקטרוניקה ומחשבים\nאמנות וחפצי ערך\nרכבים ואופנועים\nציוד תעשייתי\nחומרים מסוכנים (בתנאים מיוחדים בלבד)'
      },
      {
        q: 'אילו אמצעי תשלום מתקבלים?',
        a: 'כרטיסי אשראי (Visa, MasterCard, AMEX) דרך Stripe Checkout\nתשלום מקוון מאובטח בתקן PCI\nחיוב לפי חשבונית לאחר אישור הצעת מחיר'
      },
      {
        q: 'לאילו מדינות אתם שולחים?',
        a: 'יותר מ-120 מדינות ברחבי העולם:\nכל אירופה (שירות מהיר)\nארה״ב וקנדה (קווים קבועים)\nאסיה ואוסטרליה (שותפים מקומיים)\nאמריקה הלטינית ואפריקה\nאיים ואזורים מרוחקים'
      },
      {
        q: 'מהם שירותי ה-AI שלכם?',
        a: 'טכנולוגיות חכמות:\nצ׳אטבוט עם עיבוד שפה טבעית\nחיזוי מחירים בלמידת מכונה\nאופטימיזציית מסלולים אוטומטית\nהמלצות מותאמות אישית\nניתוח סיכונים ותחזית עיכובים'
      }
    ]
  },
  accessibility: {
    commitment_badges_note:
      'אנו פועלים להשגת WCAG 2.1 AA. התגים למטה מתארים יעד והתקדמות — לא הסמכה של צד שלישי שהושלמה.',
    goal_wcag: 'פועלים לקראת WCAG 2.1 AA',
    goal_ada: 'תוכנית נגישות ADA',
    goal_508: 'התאמה ל-Section 508 בתהליך'
  },
  auth: {
    login_failed: 'ההתחברות נכשלה',
    register_failed: 'ההרשמה נכשלה',
    session_invalid: 'ההפעלה אינה תקפה'
  },
  admin: {
    unauthorized: 'נדרשת הרשאת מנהל',
    title: 'לוח בקרה למנהלים'
  },
  volume: {
    fill_dimensions: 'נא למלא את כל המידות',
    container_20: 'מכולה 20 רגל',
    container_10: 'מכולה 10 רגל',
    custom_item: 'פריט מותאם',
    sofa: 'ספה',
    dining_table: 'שולחן אוכל',
    wardrobe: 'ארון בגדים',
    accuracy: 'דיוק {{percent}}%'
  },
  pages: {
    worldwideMoving: {
      shippingMethods: [
        {
          method: 'הובלה ימית (FCL)',
          time: '30–60 ימים',
          cost: 'הכי חסכוני',
          bestFor: 'מעברי דירה מלאים',
          description: 'שימוש בלעדי במכולה של 20 או 40 רגל. אידיאלי להובלות גדולות עם גמישות בלוח הזמנים.',
          features: ['שירות מדלת לדלת', 'הכי משתלם', 'מכולה מאובטחת', 'מתאים לנפחים גדולים']
        },
        {
          method: 'הובלה ימית (LCL)',
          time: '35–70 ימים',
          cost: 'ידידותי לתקציב',
          bestFor: 'משלוחים קטנים יותר',
          description: 'שיתוף מכולה עם משלוחים אחרים. מושלם לדירות 1–2 חדרים.',
          features: ['תשלום לפי נפח בשימוש', 'נפח גמיש', 'משלוח מאוחד', 'חסכוני']
        },
        {
          method: 'הובלה אווירית',
          time: '5–10 ימים',
          cost: 'תמחור פרימיום',
          bestFor: 'פריטים דחופים / יקרי ערך',
          description: 'האפשרות המהירה ביותר להובלה בינלאומית. מומלץ למשלוחים רגישים לזמן או בעלי ערך גבוה.',
          features: ['מסירה אקספרס', 'בקרת אקלים', 'אבטחה מרבית', 'טיפול בעדיפות']
        }
      ],
      services: [
        {
          title: 'אריזה מקצועית',
          description: 'אריזה מקצועית עם חומרים ברמה בינלאומית',
          included: ['ארגזים מותאמים', 'ניילון בועות וריפוד', 'מלאי מסומן', 'טיפול בפריטים שבירים']
        },
        {
          title: 'שחרור מכס',
          description: 'תיעוד מלא ושירותי עמילות מכס',
          included: ['טפסי מכס', 'אישורי ייבוא', 'חישוב מכסים', 'תיאום עם עמילים']
        },
        {
          title: 'שירות מדלת לדלת',
          description: 'איסוף ומסירה מלאים לכתובת החדשה',
          included: ['איסוף מהבית', 'טיפול בנמל', 'מסירה ביעד', 'אפשרויות פריקה']
        },
        {
          title: 'ביטוח מקיף',
          description: 'הגנה מלאה על ערך ההובלה הבינלאומית',
          included: ['כיסוי כל הסיכונים', 'ביטוח ימי', 'סיוע בתביעות', 'שקט נפשי']
        }
      ],
      processSteps: [
        { title: 'ייעוץ חינם', description: 'שיחה על הצרכים עם מומחה להובלות בינלאומיות' },
        { title: 'סקר והצעת מחיר', description: 'סקר וירטואלי או בבית להערכת נפח והצעת מחיר מדויקת' },
        { title: 'תיעוד', description: 'הכנת כל המסמכים, טפסי המכס והאישורים הנדרשים' },
        { title: 'אריזה מקצועית', description: 'צוות מומחים אורז ומסמן את כל הפריטים בזהירות' },
        { title: 'יצוא ומשלוח', description: 'טעינת המכולה, איטום ומשלוח לנמל היעד' },
        { title: 'שחרור מכס', description: 'הסוכנים שלנו מטפלים בכל הליכי המכס ביעד' },
        { title: 'מסירה סופית', description: 'מסירה לבית החדש עם פריקה לפי בקשה' }
      ],
      prohibitedItems: [
        'נוזלים דליקים וחומרי נפץ',
        'מזון מתכלה',
        'צמחים ואדמה (במדינות רבות)',
        'נשק ותחמושת',
        'סמים וחומרים אסורים'
      ]
    },
    interstateMoving: {
      services: [
        {
          title: 'הובלה מלאה',
          description: 'שירות מדלת לדלת כולל אריזה, טעינה, הובלה ופריקה מקצועית',
          features: ['אריזה מקצועית', 'טעינה ופריקה', 'פירוק והרכבת רהיטים', 'שירותי פריקה']
        },
        {
          title: 'הובלה חלקית / משותפת',
          description: 'פתרון חסכוני להובלות קטנות, עם שיתוף משאית עם משלוחים אחרים',
          features: ['עלות נמוכה יותר', 'לוח זמנים גמיש', 'אותה רמת זהירות', 'מתאים לדירות 1–2 חדרים']
        },
        {
          title: 'הובלת אקספרס',
          description: 'שירות בעדיפות עם משאית ייעודית ומסירה מואצת להובלות דחופות',
          features: ['משאית ייעודית', 'מסירה תוך 3–5 ימים', 'תזמון בעדיפות', 'מעקב בזמן אמת']
        },
        {
          title: 'שירות White Glove',
          description: 'חוויית הובלה פרימיום עם טיפול מיוחד בפריטים יקרי ערך ועדינים',
          features: ['ארגזים מותאמים', 'הובלה בבקרת אקלים', 'שירותי התקנה', 'תמיכת קונסיירז׳']
        }
      ],
      movingTips: [
        {
          title: 'הזמינו מראש',
          tip: 'שמרו תאריך הובלה 4–8 שבועות מראש, במיוחד בעונת השיא (מאי–ספטמבר)'
        },
        {
          title: 'סדרו לפני',
          tip: 'הפחיתו עלויות על ידי מכירה או תרומה של פריטים שאינכם צריכים לפני האריזה'
        },
        {
          title: 'קבלו כמה הצעות',
          tip: 'השוו לפחות 3 הצעות מחיר כדי לוודא מחיר תחרותי ולהבין מה כלול'
        },
        {
          title: 'קראו ביקורות',
          tip: 'בדקו דירוגי BBB, ביקורות Google ורשומות FMCSA לפני בחירת חברת הובלה'
        }
      ],
      pricingFactors: [
        { factor: 'מרחק', impact: 'גורם עלות עיקרי', description: 'מרחק ארוך יותר = עלות גבוהה יותר' },
        { factor: 'משקל / נפח', impact: 'השפעה ישירה', description: 'חיוב לפי פאונד או רגל מעוקבת' },
        { factor: 'עונה', impact: 'השפעה בינונית', description: 'בקיץ (שיא) המחיר גבוה ב-20–30%' },
        { factor: 'גישה', impact: 'תוספות', description: 'מדרגות, הובלה ארוכה, שירות הסעה' },
        { factor: 'שירותי אריזה', impact: 'תוספת אופציונלית', description: 'אריזה מקצועית מוסיפה 15–25%' },
        { factor: 'ביטוח', impact: 'מומלץ', description: 'הגנה מלאה על הערך לשקט נפשי' }
      ]
    }
  }
};

const enOverlay = {
  nav: {
    specialty: 'Specialty',
    resources: 'Resources',
    toggle: 'Toggle navigation',
    logo_alt: 'VIP International Shipping Logo',
    car_shipping: 'Car Shipping',
    motorcycle_europe: 'Motorcycle to Europe',
    piano_moving: 'Piano Moving',
    artwork_shipping: 'Artwork Shipping',
    moving_tips: 'Moving Tips',
    podcast: 'Podcast',
    why_vip: 'Why Choose VIP'
  },
  services: {
    interstate: 'Interstate Moving',
    worldwide: 'Worldwide Moving',
    moving_services: 'Moving Services',
    international: 'International Household'
  },
  footer: {
    fmcsa_rights: 'Your Rights & Responsibilities (FMCSA)',
    fmcsa_protect: 'Protect Your Move (FMCSA)',
    licensed_insured: 'Licensed & Insured',
    verify_safer: '(verify on FMCSA SAFER)',
    licensing_pending: 'Licensing details pending —',
    verify_before_booking: 'verify any mover on FMCSA SAFER before booking.'
  },
  contact: {
    email_response: 'Guaranteed response within 2 hours',
    office_address: 'Office address',
    visits_appointment: 'Visits by appointment',
    whatsapp_business: 'WhatsApp Business',
    instant_chat: 'Instant chat support',
    whatsapp_available: 'Available 24/7 — response within minutes',
    details_title: 'Contact details',
    urgent: 'Urgent',
    emergency_title: 'Shipment emergency?',
    emergency_body:
      'Call our main line above — it is monitored 24/7 for active shipment emergencies.',
    office_hours_title: 'Office hours',
    placeholder_name: 'Enter your full name',
    placeholder_email: 'your@email.com',
    placeholder_message: 'Write your question or message here...',
    subject_select: 'Select a subject...',
    subject_quote: 'Quote request',
    subject_tracking: 'Shipment tracking',
    subject_insurance: 'Insurance questions',
    subject_complaint: 'Complaint',
    subject_general: 'General',
    consent: 'I agree to receive updates and promotional emails',
    or_direct: 'Or contact us directly:',
    faq_title: 'Frequently asked questions',
    faq_subtitle: 'The information you need most',
    useful_links: 'Useful links',
    link_packing: 'Packing guide',
    link_customs: 'Customs calculator',
    link_map: 'Service map',
    link_call: 'Book a call',
    offices_title: 'Our office locations',
    map_title: 'Interactive map',
    map_coming: 'Coming soon: Google Maps with office locations',
    show_directions: 'Show directions',
    faq: [
      {
        q: 'How long does international shipping take?',
        a: 'Ocean freight: 14–35 days (economical)\nAir freight: 3–7 days (fast)\nGround: 5–14 days (Europe)\nExpress service: 24–48 hours (urgent)'
      },
      {
        q: 'What insurance is included?',
        a: 'Basic insurance: Included free (up to $1,000)\nComprehensive: 2–3% of value ($10,000+)\nPremium: Full coverage + replacement\nSpecialty: Fine art and luxury items'
      },
      {
        q: 'What does your price include?',
        a: 'Door / office pickup\nProfessional packing (optional)\nFull international shipping\nBasic insurance and customs handling\nReal-time GPS tracking\nDelivery to final destination'
      },
      {
        q: 'How do I track my shipment?',
        a: 'Advanced tracking:\nReal-time GPS with map\nAutomatic SMS and email updates\nDedicated mobile app\nSmart ChatBot for instant info\nPush notifications at every stage'
      },
      {
        q: 'What items can I ship?',
        a: 'Furniture and household goods\nElectronics and computers\nFine art and valuables\nVehicles and motorcycles\nMachinery and industrial equipment\nHazardous materials (special conditions only)'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'Credit cards (Visa, MasterCard, AMEX) via Stripe Checkout\nSecure, PCI-compliant online payment\nInvoice-based billing after quote acceptance'
      },
      {
        q: 'Which countries do you ship to?',
        a: '120+ countries worldwide:\nAll of Europe (fast service)\nUSA and Canada (regular lanes)\nAsia and Australia (local partners)\nLatin America and Africa\nIslands and remote regions'
      },
      {
        q: 'What are your AI services?',
        a: 'Smart technologies:\nChatBot with advanced NLP\nMachine-learning price prediction\nAutomatic route optimization\nPersonalized recommendations\nRisk analysis and delay forecasts'
      }
    ]
  }
};

const hePath = path.join(root, 'src/locales/he/translation.json');
const enPath = path.join(root, 'src/locales/en/translation.json');

const he = JSON.parse(fs.readFileSync(hePath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

fs.writeFileSync(hePath, JSON.stringify(deepMerge(he, heOverlay), null, 2) + '\n');
fs.writeFileSync(enPath, JSON.stringify(deepMerge(en, enOverlay), null, 2) + '\n');

console.log('Merged HE + EN overlays');
fs.unlinkSync(path.join(__dirname, '_en-chunks.json'));
