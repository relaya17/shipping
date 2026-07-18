/**
 * Merge remaining customer-page EN/HE strings into translation.json
 * Run: node scripts/apply-pages-i18n.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

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
  forms: {
    enter_location: 'Enter location',
    fill_locations: 'Please fill in both location fields',
    quote_result: 'Your moving quote from {{from}} to {{to}} is $500.00',
    quote_label: 'Quote:',
    fill_quote_title: 'Fill out the form for your free quote'
  },
  notifications: {
    demo_shipment_msg: 'Your shipment VIP123456 departed from New York Port',
    demo_price_msg: 'Shipping prices to Europe updated - save up to 15%',
    demo_customs_msg: 'Your shipment is under customs inspection - may be delayed by 24 hours',
    track: 'Track',
    view_prices: 'View Prices'
  },
  tracking: {
    location_pending: 'Location pending',
    map_title: 'Shipment GPS map'
  },
  pages: {
    terms: {
      fmcsaTitle: 'Required consumer protection disclosures (US interstate moves)',
      fmcsaBody:
        'Under 49 CFR 375.213, movers and brokers must give prospective customers a copy of, or a link to, the following official FMCSA publications before an interstate household goods move:',
      fmcsaRights: 'Your Rights and Responsibilities When You Move (FMCSA)',
      fmcsaProtect: 'Protect Your Move — consumer resources (FMCSA)',
      fmcsaVerify:
        'You can verify any interstate mover\'s USDOT registration and safety record on the official FMCSA SAFER database',
      fmcsaOurUsdot: ' (our USDOT number: {{usdot}}).'
    },
    movingInsurance: {
      subtitle: 'Full protection for your valuables with personalized insurance coverage',
      badgeLloyd: "Lloyd's of London licensed",
      badgeCoverage: 'Coverage up to $100,000',
      recommended: 'Recommended',
      selectPlan: 'Select plan',
      calculatorTitle: 'Insurance calculator',
      itemValue: 'Item value (USD)',
      selectPlanLabel: 'Select insurance plan',
      selectPlanPlaceholder: 'Select a plan...',
      calculatedPremium: 'Calculated premium:',
      forCoverage: 'For coverage of ${{value}}',
      claimsTitle: 'Claims process',
      stepLabel: 'Step {{n}}:',
      avgProcessing: 'Average processing time:',
      avgProcessingBody: '7–14 business days for most claims',
      coverageTitle: 'What does insurance cover?',
      coveredTitle: 'Covered:',
      notCoveredTitle: 'Not covered:',
      ctaTitle: 'Ready to protect your move?',
      ctaBody: 'Get professional advice and choose the insurance plan that fits your needs',
      covered: [
        'Physical damage during transport',
        'Theft or loss',
        'Water and fire damage',
        'Transport accidents',
        'Damage during loading/unloading'
      ],
      notCovered: [
        'Normal wear and tear',
        'Pre-existing damage',
        'Improper packing',
        'Insect or rodent damage',
        'Prohibited shipping items'
      ],
      plans: [
        {
          id: 'basic',
          rate: 1.5,
          name: 'Basic insurance',
          coverage: 'Up to $10,000',
          premium: '1.5% of value',
          features: [
            'Coverage for physical damage',
            'Basic loss protection',
            'Claims up to $10,000',
            'Processing within 30 days'
          ],
          color: 'primary',
          recommended: false
        },
        {
          id: 'standard',
          rate: 2.5,
          name: 'Standard insurance',
          coverage: 'Up to $50,000',
          premium: '2.5% of value',
          features: [
            'Everything in Basic',
            'Coverage for luxury items',
            'Claims up to $50,000',
            'Processing within 14 days',
            'Priority customer service'
          ],
          color: 'success',
          recommended: true
        },
        {
          id: 'premium',
          rate: 3.5,
          name: 'Premium insurance',
          coverage: 'Up to $100,000',
          premium: '3.5% of value',
          features: [
            'Everything in Standard',
            'Coverage for all damage types',
            'Claims up to $100,000',
            'Processing within 7 days',
            'Dedicated claims representative',
            'Delay coverage'
          ],
          color: 'warning',
          recommended: false
        }
      ],
      claimSteps: [
        { title: 'Report immediately', description: 'Report the damage within 48 hours' },
        { title: 'Document the damage', description: 'Photograph the damage and complete a claim form' },
        { title: 'Adjuster review', description: 'A licensed adjuster inspects the damage' },
        { title: 'Compensation', description: 'Receive full, fast compensation' }
      ]
    },
    carShipping: {
      subtitle: 'Professional vehicle shipping worldwide with full insurance and personal care',
      badgeVolume: 'Over 5,000 vehicles per year',
      badgeSafe: '99.5% damage-free arrival',
      optionsTitle: 'Shipping options',
      priceLabel: 'Price',
      durationLabel: 'Duration',
      pros: 'Pros:',
      cons: 'Cons:',
      destinationsTitle: 'Popular destinations',
      colCountry: 'Country',
      colPort: 'Destination port',
      colDuration: 'Duration',
      colPrice: 'Price from',
      colAction: 'Action',
      docsTitle: 'Required documents',
      docsImportant: 'Important:',
      docsNote: 'All documents must be in English or officially translated',
      processTitle: 'Shipping process',
      ctaTitle: 'Ready to ship your vehicle?',
      ctaBody: 'Get a personalized quote and start the process today',
      options: [
        {
          type: 'RoRo (Roll-on/Roll-off)',
          description: 'Your vehicle drives onto the ship deck',
          price: '$800 – $1,500',
          duration: '2–4 weeks',
          pros: ['More affordable', 'Faster', 'Less handling'],
          cons: ['Exposed to weather', 'Higher risk']
        },
        {
          type: 'Container Shipping',
          description: 'Your vehicle ships in a sealed container',
          price: '$1,200 – $2,500',
          duration: '3–6 weeks',
          pros: ['Full protection', 'More secure', 'Room for extra belongings'],
          cons: ['More expensive', 'Takes longer']
        }
      ],
      destinations: [
        { country: 'Germany', port: 'Hamburg', duration: '3–4 weeks', price: '$1,200' },
        { country: 'United Kingdom', port: 'Southampton', duration: '2–3 weeks', price: '$1,100' },
        { country: 'Australia', port: 'Sydney', duration: '4–6 weeks', price: '$1,800' },
        { country: 'Japan', port: 'Yokohama', duration: '3–5 weeks', price: '$1,600' }
      ],
      requirements: [
        "Valid driver's license",
        'Vehicle title / registration',
        'Valid insurance',
        'Passport copy',
        'Original vehicle invoice',
        'Vehicle value declaration'
      ],
      processSteps: [
        { title: 'Booking & payment', description: 'Book the service and pay a deposit' },
        { title: 'Vehicle pickup', description: 'Pickup from a location you choose' },
        { title: 'Prepare for shipping', description: 'Inspect and document vehicle condition' },
        { title: 'International shipping', description: 'Transport with real-time tracking' },
        { title: 'Delivery at destination', description: 'Arrival and handover at the final destination' }
      ]
    },
    whyTrust: {
      title: 'Why Trust VIP International Shipping?',
      intro1:
        "An international move is a significant milestone in life, whether you're expanding your business, reconnecting with loved ones, retiring in a more affordable destination, or finding a place with the ideal climate.",
      intro2:
        'At VIP International Shipping, we specialize in international relocation, offering a reliable and global network to make your move smooth and hassle-free. We are dedicated to ensuring the safe and timely transportation of your belongings, no matter where your new journey takes you.',
      intro3:
        'With a strong presence in key locations around the world, including exclusive partnerships across Europe, the Middle East, and Asia, VIP International Shipping is equipped to handle all aspects of your move. Our team ensures personalized services to meet the unique needs of each client.',
      sections: [
        {
          title: 'Global Coverage',
          body: 'VIP International Shipping offers seamless service across all continents, with dedicated teams on both the East and West coasts of the United States. We ensure your move is taken care of no matter where it’s heading.'
        },
        {
          title: 'Storage and Preparation',
          body: 'Our state-of-the-art facilities in the US and Europe allow us to store and prepare shipments efficiently. Your items will be carefully handled, ensuring their safety during transit.'
        },
        {
          title: 'Licensed and Trusted',
          body: 'VIP International Shipping is fully licensed by the Federal Maritime Commission for international sea shipments. You can trust us with your most valuable possessions for a smooth and secure move.'
        },
        {
          title: 'Household and Office Relocations',
          body: 'Whether you’re moving your household, office, or specialized items like vehicles or artwork, VIP International Shipping is equipped to handle all aspects of your move with personalized service.'
        },
        {
          title: 'Reliable and Stress-Free Service',
          body: 'We ensure your move is stress-free by providing reliable and timely transportation of your belongings, whether it’s across the country or around the world.'
        }
      ]
    },
    stubs: {
      motorcycle: {
        title: 'Shipping a Motorcycle to Europe',
        body: 'Specialized motorcycle shipping to Europe with secure crating, customs support, and door-to-port or door-to-door options.'
      },
      customs: {
        title: 'Customs Inspection',
        body: 'Guidance on customs inspections, required documents, and how VIP coordinates clearance for international moves.'
      },
      trusted: {
        title: 'Trusted Moving Company',
        body: 'Learn why customers trust VIP International Shipping for licensed, insured, and professionally managed relocations.'
      },
      intlInsurance: {
        title: 'International Moving Insurance',
        body: 'Protect your international shipment with coverage options tailored to household goods and high-value items.'
      }
    }
  }
};

const he = {
  forms: {
    enter_location: 'הזינו מיקום',
    fill_locations: 'נא למלא את שני שדות המיקום',
    quote_result: 'הצעת המחיר שלכם מ-{{from}} ל-{{to}} היא $500.00',
    quote_label: 'הצעת מחיר:',
    fill_quote_title: 'מלאו את הטופס לקבלת הצעת מחיר חינם'
  },
  notifications: {
    demo_shipment_msg: 'המשלוח VIP123456 יצא מנמל ניו יורק',
    demo_price_msg: 'מחירי ההובלה לאירופה עודכנו — חסכו עד 15%',
    demo_customs_msg: 'המשלוח בבדיקת מכס — ייתכן עיכוב של עד 24 שעות',
    track: 'עקוב',
    view_prices: 'צפה במחירים'
  },
  tracking: {
    location_pending: 'המיקום בהמתנה',
    map_title: 'מפת GPS של המשלוח'
  },
  pages: {
    terms: {
      fmcsaTitle: 'גילוי נאות להגנת הצרכן (הובלות בין־מדינות בארה״ב)',
      fmcsaBody:
        'לפי 49 CFR 375.213, מובילים ומתווכים חייבים למסור ללקוחות פוטנציאליים עותק או קישור לפרסומי FMCSA הרשמיים הבאים לפני הובלת משק בית בין־מדינתית:',
      fmcsaRights: 'הזכויות והאחריות שלך כשאתה עובר דירה (FMCSA)',
      fmcsaProtect: 'הגנה על המעבר שלך — משאבים לצרכן (FMCSA)',
      fmcsaVerify:
        'ניתן לאמת רישום USDOT ורשומת בטיחות של כל מוביל בין־מדינתי במאגר FMCSA SAFER הרשמי',
      fmcsaOurUsdot: ' (מספר ה-USDOT שלנו: {{usdot}}).'
    },
    movingInsurance: {
      subtitle: 'הגנה מלאה על החפצים שלכם עם כיסוי ביטוח מותאם אישית',
      badgeLloyd: 'מורשה על ידי Lloyd\'s of London',
      badgeCoverage: 'כיסוי עד $100,000',
      recommended: 'מומלץ',
      selectPlan: 'בחרו תוכנית',
      calculatorTitle: 'מחשבון ביטוח',
      itemValue: 'ערך הפריטים (USD)',
      selectPlanLabel: 'בחרו תוכנית ביטוח',
      selectPlanPlaceholder: 'בחרו תוכנית...',
      calculatedPremium: 'פרמיה מחושבת:',
      forCoverage: 'עבור כיסוי של ${{value}}',
      claimsTitle: 'תהליך תביעות',
      stepLabel: 'שלב {{n}}:',
      avgProcessing: 'זמן טיפול ממוצע:',
      avgProcessingBody: '7–14 ימי עסקים ברוב התביעות',
      coverageTitle: 'מה הביטוח מכסה?',
      coveredTitle: 'מכוסה:',
      notCoveredTitle: 'לא מכוסה:',
      ctaTitle: 'מוכנים להגן על ההובלה?',
      ctaBody: 'קבלו ייעוץ מקצועי ובחרו את תוכנית הביטוח שמתאימה לכם',
      covered: [
        'נזק פיזי במהלך ההובלה',
        'גניבה או אובדן',
        'נזקי מים ואש',
        'תאונות הובלה',
        'נזק בטעינה / פריקה'
      ],
      notCovered: [
        'בלאי רגיל',
        'נזק קיים מראש',
        'אריזה לא תקינה',
        'נזקי חרקים או מכרסמים',
        'פריטים אסורים למשלוח'
      ],
      plans: [
        {
          id: 'basic',
          rate: 1.5,
          name: 'ביטוח בסיסי',
          coverage: 'עד $10,000',
          premium: '1.5% מהערך',
          features: [
            'כיסוי לנזק פיזי',
            'הגנה בסיסית מפני אובדן',
            'תביעות עד $10,000',
            'טיפול תוך 30 יום'
          ],
          color: 'primary',
          recommended: false
        },
        {
          id: 'standard',
          rate: 2.5,
          name: 'ביטוח סטנדרטי',
          coverage: 'עד $50,000',
          premium: '2.5% מהערך',
          features: [
            'הכל מהבסיסי',
            'כיסוי לפריטי יוקרה',
            'תביעות עד $50,000',
            'טיפול תוך 14 יום',
            'שירות לקוחות בעדיפות'
          ],
          color: 'success',
          recommended: true
        },
        {
          id: 'premium',
          rate: 3.5,
          name: 'ביטוח פרימיום',
          coverage: 'עד $100,000',
          premium: '3.5% מהערך',
          features: [
            'הכל מהסטנדרטי',
            'כיסוי לכל סוגי הנזק',
            'תביעות עד $100,000',
            'טיפול תוך 7 ימים',
            'נציג תביעות ייעודי',
            'כיסוי לעיכובים'
          ],
          color: 'warning',
          recommended: false
        }
      ],
      claimSteps: [
        { title: 'דיווח מיידי', description: 'דווחו על הנזק תוך 48 שעות' },
        { title: 'תיעוד הנזק', description: 'צלמו את הנזק ומלאו טופס תביעה' },
        { title: 'בדיקת שמאי', description: 'שמאי מורשה בודק את הנזק' },
        { title: 'פיצוי', description: 'קבלו פיצוי מלא ומהיר' }
      ]
    },
    carShipping: {
      subtitle: 'הובלת רכבים מקצועית ברחבי העולם עם ביטוח מלא וטיפול אישי',
      badgeVolume: 'מעל 5,000 רכבים בשנה',
      badgeSafe: '99.5% הגעה ללא נזק',
      optionsTitle: 'אפשרויות הובלה',
      priceLabel: 'מחיר',
      durationLabel: 'משך',
      pros: 'יתרונות:',
      cons: 'חסרונות:',
      destinationsTitle: 'יעדים פופולריים',
      colCountry: 'מדינה',
      colPort: 'נמל יעד',
      colDuration: 'משך',
      colPrice: 'מחיר מ',
      colAction: 'פעולה',
      docsTitle: 'מסמכים נדרשים',
      docsImportant: 'חשוב:',
      docsNote: 'כל המסמכים חייבים להיות באנגלית או בתרגום רשמי',
      processTitle: 'תהליך ההובלה',
      ctaTitle: 'מוכנים לשלוח את הרכב?',
      ctaBody: 'קבלו הצעת מחיר מותאמת והתחילו את התהליך עוד היום',
      options: [
        {
          type: 'RoRo (Roll-on/Roll-off)',
          description: 'הרכב נוסע על סיפון האונייה',
          price: '$800 – $1,500',
          duration: '2–4 שבועות',
          pros: ['זול יותר', 'מהיר יותר', 'פחות טיפול'],
          cons: ['חשוף למזג אוויר', 'סיכון גבוה יותר']
        },
        {
          type: 'הובלה במכולה',
          description: 'הרכב נשלח במכולה אטומה',
          price: '$1,200 – $2,500',
          duration: '3–6 שבועות',
          pros: ['הגנה מלאה', 'מאובטח יותר', 'מקום לחפצים נוספים'],
          cons: ['יקר יותר', 'לוקח יותר זמן']
        }
      ],
      destinations: [
        { country: 'גרמניה', port: 'המבורג', duration: '3–4 שבועות', price: '$1,200' },
        { country: 'בריטניה', port: 'סאות׳המפטון', duration: '2–3 שבועות', price: '$1,100' },
        { country: 'אוסטרליה', port: 'סידני', duration: '4–6 שבועות', price: '$1,800' },
        { country: 'יפן', port: 'יוקוהמה', duration: '3–5 שבועות', price: '$1,600' }
      ],
      requirements: [
        'רישיון נהיגה בתוקף',
        'שטר בעלות / רישום רכב',
        'ביטוח בתוקף',
        'עותק דרכון',
        'חשבונית רכב מקורית',
        'הצהרת ערך הרכב'
      ],
      processSteps: [
        { title: 'הזמנה ותשלום', description: 'הזמנת השירות ותשלום מקדמה' },
        { title: 'איסוף הרכב', description: 'איסוף מהמיקום שתבחרו' },
        { title: 'הכנה למשלוח', description: 'בדיקה ותיעוד מצב הרכב' },
        { title: 'הובלה בינלאומית', description: 'הובלה עם מעקב בזמן אמת' },
        { title: 'מסירה ביעד', description: 'הגעה ומסירה ביעד הסופי' }
      ]
    },
    whyTrust: {
      title: 'למה לסמוך על VIP International Shipping?',
      intro1:
        'מעבר בינלאומי הוא אבן דרך משמעותית — בין אם אתם מרחיבים עסק, מתאחדים עם משפחה, פורשים ליעד משתלם יותר, או מחפשים אקלים מתאים.',
      intro2:
        'ב-VIP International Shipping אנחנו מתמחים בהעברות בינלאומיות, עם רשת גלובלית אמינה שעוזרת למעבר חלק ובטוח. אנחנו מחויבים להובלה בטוחה ובזמן של החפצים שלכם, לכל יעד.',
      intro3:
        'עם נוכחות חזקה במוקדים מרכזיים בעולם, כולל שותפויות בלעדיות באירופה, במזרח התיכון ובאסיה, VIP מצוידת לטפל בכל היבטי המעבר. הצוות שלנו מעניק שירות מותאם לצרכים הייחודיים של כל לקוח.',
      sections: [
        {
          title: 'כיסוי עולמי',
          body: 'VIP מציעה שירות חלק בכל היבשות, עם צוותים ייעודיים בחוף המזרחי והמערבי של ארה״ב. אנחנו דואגים למעבר שלכם לכל יעד.'
        },
        {
          title: 'אחסון והכנה',
          body: 'מתקנים מתקדמים בארה״ב ובאירופה מאפשרים אחסון והכנת משלוחים ביעילות. הפריטים שלכם מטופלים בזהירות לאורך כל הדרך.'
        },
        {
          title: 'מורשה ואמין',
          body: 'VIP מורשית במלואה על ידי ה-Federal Maritime Commission למשלוחים ימיים בינלאומיים. אפשר לסמוך עלינו גם עם החפצים היקרים ביותר.'
        },
        {
          title: 'הובלת בית ומשרד',
          body: 'בין אם מדובר בבית, במשרד או בפריטים מיוחדים כמו רכבים ויצירות אמנות — VIP מטפלת בכל ההיבטים בשירות אישי.'
        },
        {
          title: 'שירות אמין וללא לחץ',
          body: 'אנחנו דואגים שהמעבר יהיה רגוע יותר, עם הובלה אמינה ובזמן — בארץ או בעולם.'
        }
      ]
    },
    stubs: {
      motorcycle: {
        title: 'הובלת אופנוע לאירופה',
        body: 'הובלת אופנועים לאירופה עם ארגז מאובטח, תמיכה במכס, ואפשרויות מדלת לנמל או מדלת לדלת.'
      },
      customs: {
        title: 'בדיקת מכס',
        body: 'הדרכה לגבי בדיקות מכס, מסמכים נדרשים, וכיצד VIP מתאמת שחרור להובלות בינלאומיות.'
      },
      trusted: {
        title: 'חברת הובלה אמינה',
        body: 'למדו למה לקוחות סומכים על VIP International Shipping להובלות מורשות, מבוטחות ומנוהלות במקצועיות.'
      },
      intlInsurance: {
        title: 'ביטוח הובלה בינלאומית',
        body: 'הגנו על המשלוח הבינלאומי עם אפשרויות כיסוי למשק בית ופריטים יקרי ערך.'
      }
    }
  }
};

for (const [file, overlay] of [
  ['src/locales/en/translation.json', en],
  ['src/locales/he/translation.json', he]
]) {
  const p = path.join(root, file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  fs.writeFileSync(p, JSON.stringify(deepMerge(data, overlay), null, 2) + '\n');
  console.log('merged', file);
}
