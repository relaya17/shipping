/**
 * Page overlays: freeMovingQuote, worldwideMoving, interstateMoving (ar, es, ru, zh)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enPages = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/locales/en/translation.json'), 'utf8')
).pages;

function cloneEnPage(key) {
  return JSON.parse(JSON.stringify(enPages[key]));
}

function setAddonServices(page, labels) {
  const ids = ['packing', 'storage', 'insurance', 'unpacking', 'furniture', 'cleaning'];
  page.addonServices = page.addonServices.map((item, i) => ({
    ...item,
    label: labels[ids[i]].label,
    desc: labels[ids[i]].desc,
  }));
}

const flatMeta = {
  ar: {
    freeMovingQuote: {
      title: 'احصل على عرض سعر مجاني للنقل',
      subtitle: 'تقدير فوري في 3 خطوات | بدون التزام | وفّر حتى 30%',
      badges: { free: '100% مجاني', noCard: 'بدون بطاقة ائتمان', response: 'رد خلال ساعة', priceMatch: 'ضمان مطابقة السعر' },
      benefits: {
        pricing: { title: 'تسعير شفاف', desc: 'بدون رسوم مخفية أو مفاجآت' },
        insured: { title: 'مؤمّن بالكامل', desc: 'حماية شاملة لممتلكاتك' },
        fast: { title: 'استجابة سريعة', desc: 'عرض سعر خلال ساعة، 7 أيام في الأسبوع' },
        guarantee: { title: 'ضمان أفضل سعر', desc: 'نطابق أي عرض من المنافسين' },
      },
      stepOf: 'الخطوة {{step}} من {{total}}',
      percentComplete: '{{percent}}% مكتمل',
      steps: { moveDetails: 'تفاصيل النقل', services: 'الخدمات', contact: 'معلومات الاتصال' },
      step1Title: 'أخبرنا عن نقلتك',
      moveTypeLabel: 'نوع النقل *',
      moveTypes: { local: 'نقل محلي (ضمن 50 ميل)', longDistance: 'مسافة طويلة (بين الولايات)', international: 'نقل دولي' },
      fromZip: 'الرمز البريدي للمكان الأصلي *', toZip: 'الرمز البريدي للوجهة *',
      zipPlaceholderFrom: 'مثال 10001', zipPlaceholderTo: 'مثال 90210',
      moveDate: 'تاريخ النقل المفضل *', flexibleDates: 'تواريخ مرنة؟ يمكننا تقديم سعر أفضل!',
      homeSize: 'حجم المنزل *', homeSizeSelect: 'اختر حجم المنزل...',
      sizes: { studio: 'استوديو', one: 'غرفة نوم واحدة', two: 'غرفتا نوم', three: '3 غرف نوم', four: '4 غرف نوم', fivePlus: '5+ غرف نوم' },
      step2Title: 'اختر خدمات إضافية', servicesHint: 'حدّد جميع الخدمات التي تهمك. يمكنك التعديل لاحقًا!',
      specialItems: 'أغراض خاصة أو تعليمات', specialItemsPlaceholder: 'مثال: بيانو، طاولة بلياردو، تحف هشة، موقف ضيق...',
      step3Title: 'معلومات الاتصال', estimatedCost: 'التكلفة المقدّرة',
      estimateNote: 'السعر النهائي يخضع لمعاينة في المنزل. يشمل هذا التقدير الخدمات المختارة.',
      phoneHint: 'سنتصل خلال ساعة لتأكيد التفاصيل', consentPrefix: 'أوافق على تلقي الاتصالات وأفهم', consentAnd: 'و',
      whatNext: 'ماذا يحدث بعد ذلك؟',
      nextSteps: ['سيتصل بك أخصائي النقل خلال ساعة', 'جدولة معاينة مجانية في المنزل (افتراضية أو حضورية)', 'استلام عرض السعر النهائي الملزم', 'احجز نقلتك واسترخِ!'],
      back: '← رجوع', continue: 'متابعة →', submit: 'احصل على عرضي المجاني',
      submitSuccess: 'شكرًا! سيتواصل فريقنا معك خلال ساعة بعرض مفصّل.',
      trustedBy: 'موثوق من أكثر من 50,000 عميل سعيد',
      trust: { licensed: 'مرخّص ومؤمّن', bbb: 'تصنيف A+ BBB', reviews: 'أكثر من 5,000 تقييم 5 نجوم' },
      addonLabels: {
        packing: { label: 'تعبئة احترافية', desc: 'خدمة تعبئة كاملة مع المواد' },
        storage: { label: 'تخزين (30 يومًا)', desc: 'مستودع بتحكم في المناخ' },
        insurance: { label: 'حماية القيمة الكاملة', desc: 'تغطية تأمينية شاملة' },
        unpacking: { label: 'خدمات فك التعبئة', desc: 'نفك التعبئة ونرتب الأغراض في منزلك الجديد' },
        furniture: { label: 'تركيب الأثاث', desc: 'فك وتركيب الأثاث' },
        cleaning: { label: 'تنظيف بعد النقل', desc: 'تنظيف احترافي لمنزلك القديم' },
      },
    },
    worldwideMoving: {
      title: 'نقل دولي في جميع أنحاء العالم', subtitle: 'شحن من الباب إلى الباب عبر القارات مع خبرة جمركية',
      ctaQuote: 'احصل على عرض عالمي', ctaCall: 'تحدث مع أخصائي',
      alertTitle: 'خطّط مسبقًا لأوقات التسليم', alertBody: 'الشحن البحري يستغرق عادةً 30–60 يومًا. الشحن الجوي متاح للشحنات العاجلة.',
      methodsTitle: 'طرق الشحن', destinationsTitle: 'الوجهات الشائعة', servicesTitle: 'الخدمات المشمولة',
      processTitle: 'كيف تعمل عمليات النقل العالمية', costsTitle: 'عوامل التكلفة', prohibitedTitle: 'المواد المقيدة والمحظورة',
      finalCta: 'هل أنت مستعد للنقل عالميًا؟',
    },
    interstateMoving: {
      title: 'خدمات النقل بين الولايات', subtitle: 'نقل موثوق لمسافات طويلة في جميع الولايات الأمريكية الـ50',
      ctaQuote: 'احصل على عرض بين الولايات', ctaCall: 'اتصل بمنسّق',
      promoTitle: 'نصيحة موسم الذروة', promoBody: 'احجز قبل 4–8 أسابيع من مايو–سبتمبر لضمان أسعار وتواريخ أفضل.',
      whyTitle: 'لماذا VIP للنقل بين الولايات', servicesTitle: 'خيارات الخدمة', routesTitle: 'المسارات الشائعة',
      pricingTitle: 'ما يؤثر على السعر', tipsTitle: 'نصائح للنقل', howTitle: 'كيف يعمل', includes: 'يشمل:',
      finalCta: 'هل أنت مستعد لنقلتك بين الولايات؟',
    },
  },
  es: {
    freeMovingQuote: {
      title: 'Obtenga su cotización gratuita de mudanza',
      subtitle: 'Estimación instantánea en 3 pasos | Sin compromiso | Ahorre hasta 30%',
      badges: { free: '100% gratis', noCard: 'Sin tarjeta de crédito', response: 'Respuesta en 1 hora', priceMatch: 'Garantía de igualación de precio' },
      benefits: {
        pricing: { title: 'Precios transparentes', desc: 'Sin cargos ocultos ni sorpresas' },
        insured: { title: 'Totalmente asegurado', desc: 'Protección integral para sus pertenencias' },
        fast: { title: 'Respuesta rápida', desc: 'Cotización en 1 hora, 7 días a la semana' },
        guarantee: { title: 'Garantía del mejor precio', desc: 'Igualamos cualquier cotización de la competencia' },
      },
      stepOf: 'Paso {{step}} de {{total}}', percentComplete: '{{percent}}% completado',
      steps: { moveDetails: 'Detalles de la mudanza', services: 'Servicios', contact: 'Datos de contacto' },
      step1Title: 'Cuéntenos sobre su mudanza', moveTypeLabel: 'Tipo de mudanza *',
      moveTypes: { local: 'Mudanza local (hasta 50 millas)', longDistance: 'Larga distancia (interestatal)', international: 'Mudanza internacional' },
      fromZip: 'Código postal de origen *', toZip: 'Código postal de destino *',
      zipPlaceholderFrom: 'p. ej. 10001', zipPlaceholderTo: 'p. ej. 90210',
      moveDate: 'Fecha preferida de mudanza *', flexibleDates: '¿Fechas flexibles? ¡Podemos ofrecer un mejor precio!',
      homeSize: 'Tamaño del hogar *', homeSizeSelect: 'Seleccione el tamaño...',
      sizes: { studio: 'Estudio', one: '1 dormitorio', two: '2 dormitorios', three: '3 dormitorios', four: '4 dormitorios', fivePlus: '5+ dormitorios' },
      step2Title: 'Seleccione servicios adicionales', servicesHint: 'Marque todos los servicios que le interesen. ¡Puede ajustarlos después!',
      specialItems: 'Artículos especiales o instrucciones', specialItemsPlaceholder: 'p. ej., piano, mesa de billar, antigüedades frágiles, estacionamiento difícil...',
      step3Title: 'Información de contacto', estimatedCost: 'Costo estimado',
      estimateNote: 'El precio final está sujeto a una inspección en el hogar. Esta estimación incluye los servicios seleccionados.',
      phoneHint: 'Llamaremos en 1 hora para confirmar los detalles', consentPrefix: 'Acepto recibir comunicaciones y entiendo la', consentAnd: 'y la',
      whatNext: '¿Qué sigue?',
      nextSteps: ['Nuestro especialista le llamará en 1 hora', 'Programe una inspección gratuita en el hogar (virtual o presencial)', 'Reciba su cotización final vinculante', '¡Reserve su mudanza y relájese!'],
      back: '← Atrás', continue: 'Continuar →', submit: 'Obtener mi cotización gratis',
      submitSuccess: '¡Gracias! Nuestro equipo se pondrá en contacto en 1 hora con una cotización detallada.',
      trustedBy: 'Confiado por más de 50,000 clientes satisfechos',
      trust: { licensed: 'Licenciado y asegurado', bbb: 'Calificación A+ BBB', reviews: 'Más de 5,000 reseñas de 5 estrellas' },
      addonLabels: {
        packing: { label: 'Embalaje profesional', desc: 'Servicio completo de embalaje con materiales incluidos' },
        storage: { label: 'Almacenamiento (30 días)', desc: 'Instalación con clima controlado' },
        insurance: { label: 'Protección de valor completo', desc: 'Cobertura de seguro integral' },
        unpacking: { label: 'Servicios de desembalaje', desc: 'Desembalamos y colocamos artículos en su nuevo hogar' },
        furniture: { label: 'Montaje de muebles', desc: 'Desmontaje y remontaje de muebles' },
        cleaning: { label: 'Limpieza post-mudanza', desc: 'Limpieza profesional de su hogar anterior' },
      },
    },
    worldwideMoving: {
      title: 'Mudanza internacional en todo el mundo', subtitle: 'Envío puerta a puerta entre continentes con experiencia aduanera',
      ctaQuote: 'Obtener cotización mundial', ctaCall: 'Hablar con un especialista',
      alertTitle: 'Planifique los plazos con anticipación', alertBody: 'El flete marítimo suele tardar 30–60 días. El flete aéreo está disponible para envíos urgentes.',
      methodsTitle: 'Métodos de envío', destinationsTitle: 'Destinos populares', servicesTitle: 'Servicios incluidos',
      processTitle: 'Cómo funcionan las mudanzas internacionales', costsTitle: 'Factores de costo', prohibitedTitle: 'Artículos restringidos y prohibidos',
      finalCta: '¿Listo para mudarse a nivel mundial?',
    },
    interstateMoving: {
      title: 'Servicios de mudanza interestatal', subtitle: 'Mudanzas confiables de larga distancia en los 50 estados de EE. UU.',
      ctaQuote: 'Obtener cotización interestatal', ctaCall: 'Llamar a un coordinador',
      promoTitle: 'Consejo de temporada alta', promoBody: 'Reserve con 4–8 semanas de anticipación para mayo–septiembre y asegure mejores tarifas y fechas.',
      whyTitle: 'Por qué elegir VIP para mudanzas interestatales', servicesTitle: 'Opciones de servicio', routesTitle: 'Rutas populares',
      pricingTitle: 'Qué afecta el precio', tipsTitle: 'Consejos de mudanza', howTitle: 'Cómo funciona', includes: 'Incluye:',
      finalCta: '¿Listo para su mudanza interestatal?',
    },
  },
  ru: {
    freeMovingQuote: {
      title: 'Получите бесплатный расчёт переезда',
      subtitle: 'Мгновенная оценка в 3 шага | Без обязательств | Экономия до 30%',
      badges: { free: '100% бесплатно', noCard: 'Без кредитной карты', response: 'Ответ за 1 час', priceMatch: 'Гарантия лучшей цены' },
      benefits: {
        pricing: { title: 'Прозрачные цены', desc: 'Без скрытых комиссий и сюрпризов' },
        insured: { title: 'Полная страховка', desc: 'Комплексная защита ваших вещей' },
        fast: { title: 'Быстрый ответ', desc: 'Расчёт за 1 час, 7 дней в неделю' },
        guarantee: { title: 'Гарантия лучшей цены', desc: 'Сопоставим с любым предложением конкурента' },
      },
      stepOf: 'Шаг {{step}} из {{total}}', percentComplete: '{{percent}}% выполнено',
      steps: { moveDetails: 'Детали переезда', services: 'Услуги', contact: 'Контактные данные' },
      step1Title: 'Расскажите о вашем переезде', moveTypeLabel: 'Тип переезда *',
      moveTypes: { local: 'Местный переезд (до 50 миль)', longDistance: 'Дальнее расстояние (межштатный)', international: 'Международный переезд' },
      fromZip: 'Почтовый индекс отправления *', toZip: 'Почтовый индекс назначения *',
      zipPlaceholderFrom: 'напр. 10001', zipPlaceholderTo: 'напр. 90210',
      moveDate: 'Предпочтительная дата переезда *', flexibleDates: 'Гибкие даты? Мы можем предложить лучшую цену!',
      homeSize: 'Размер жилья *', homeSizeSelect: 'Выберите размер...',
      sizes: { studio: 'Студия', one: '1 спальня', two: '2 спальни', three: '3 спальни', four: '4 спальни', fivePlus: '5+ спален' },
      step2Title: 'Выберите дополнительные услуги', servicesHint: 'Отметьте все интересующие услуги. Вы сможете изменить позже!',
      specialItems: 'Особые предметы или инструкции', specialItemsPlaceholder: 'напр., пианино, бильярдный стол, хрупкие антиквариаты, узкая парковка...',
      step3Title: 'Контактная информация', estimatedCost: 'Предварительная стоимость',
      estimateNote: 'Итоговая цена зависит от осмотра на месте. Оценка включает выбранные услуги.',
      phoneHint: 'Мы позвоним в течение часа для подтверждения деталей', consentPrefix: 'Я согласен получать сообщения и понимаю', consentAnd: 'и',
      whatNext: 'Что дальше?',
      nextSteps: ['Наш специалист позвонит вам в течение часа', 'Запланируйте бесплатный осмотр (онлайн или на месте)', 'Получите окончательное обязательное предложение', 'Забронируйте переезд и расслабьтесь!'],
      back: '← Назад', continue: 'Продолжить →', submit: 'Получить бесплатный расчёт',
      submitSuccess: 'Спасибо! Наша команда свяжется с вами в течение часа с подробным расчётом.',
      trustedBy: 'Нам доверяют более 50 000 довольных клиентов',
      trust: { licensed: 'Лицензия и страховка', bbb: 'Рейтинг A+ BBB', reviews: 'Более 5 000 отзывов на 5 звёзд' },
      addonLabels: {
        packing: { label: 'Профессиональная упаковка', desc: 'Полная упаковка с материалами' },
        storage: { label: 'Хранение (30 дней)', desc: 'Склад с климат-контролем' },
        insurance: { label: 'Полная защита стоимости', desc: 'Комплексное страховое покрытие' },
        unpacking: { label: 'Распаковка', desc: 'Распакуем и расставим вещи в новом доме' },
        furniture: { label: 'Сборка мебели', desc: 'Разборка и сборка мебели' },
        cleaning: { label: 'Уборка после переезда', desc: 'Профессиональная уборка старого жилья' },
      },
    },
    worldwideMoving: {
      title: 'Международный переезд по всему миру', subtitle: 'Доставка от двери до двери между континентами с таможенной экспертизой',
      ctaQuote: 'Получить мировой расчёт', ctaCall: 'Связаться со специалистом',
      alertTitle: 'Планируйте сроки заранее', alertBody: 'Морская перевозка обычно занимает 30–60 дней. Авиаперевозка доступна для срочных отправлений.',
      methodsTitle: 'Способы доставки', destinationsTitle: 'Популярные направления', servicesTitle: 'Включённые услуги',
      processTitle: 'Как проходит международный переезд', costsTitle: 'Факторы стоимости', prohibitedTitle: 'Ограниченные и запрещённые предметы',
      finalCta: 'Готовы к переезду по всему миру?',
    },
    interstateMoving: {
      title: 'Межштатные услуги переезда', subtitle: 'Надёжные переезды на дальние расстояния по всем 50 штатам США',
      ctaQuote: 'Получить межштатный расчёт', ctaCall: 'Позвонить координатору',
      promoTitle: 'Совет на пик сезона', promoBody: 'Бронируйте за 4–8 недель до мая–сентября, чтобы зафиксировать лучшие тарифы и даты.',
      whyTitle: 'Почему VIP для межштатных переездов', servicesTitle: 'Варианты услуг', routesTitle: 'Популярные маршруты',
      pricingTitle: 'Что влияет на цену', tipsTitle: 'Советы по переезду', howTitle: 'Как это работает', includes: 'Включает:',
      finalCta: 'Готовы к межштатному переезду?',
    },
  },
  zh: {
    freeMovingQuote: {
      title: '获取免费搬家报价',
      subtitle: '3 步即时估算 | 无义务 | 最高节省 30%',
      badges: { free: '100% 免费', noCard: '无需信用卡', response: '1 小时内回复', priceMatch: '价格匹配保证' },
      benefits: {
        pricing: { title: '透明定价', desc: '无隐藏费用或意外收费' },
        insured: { title: '全面保险', desc: '为您的物品提供全面保护' },
        fast: { title: '快速响应', desc: '1 小时内报价，每周 7 天' },
        guarantee: { title: '最优价格保证', desc: '我们将匹配任何竞争对手报价' },
      },
      stepOf: '第 {{step}} 步，共 {{total}} 步', percentComplete: '已完成 {{percent}}%',
      steps: { moveDetails: '搬家详情', services: '服务', contact: '联系信息' },
      step1Title: '告诉我们您的搬家需求', moveTypeLabel: '搬家类型 *',
      moveTypes: { local: '本地搬家（50 英里内）', longDistance: '长途搬家（州际）', international: '国际搬家' },
      fromZip: '出发地邮编 *', toZip: '目的地邮编 *',
      zipPlaceholderFrom: '例如 10001', zipPlaceholderTo: '例如 90210',
      moveDate: '首选搬家日期 *', flexibleDates: '日期灵活？我们可以提供更优价格！',
      homeSize: '房屋大小 *', homeSizeSelect: '选择房屋大小...',
      sizes: { studio: '单间', one: '1 卧室', two: '2 卧室', three: '3 卧室', four: '4 卧室', fivePlus: '5+ 卧室' },
      step2Title: '选择附加服务', servicesHint: '勾选您感兴趣的所有服务。稍后仍可调整！',
      specialItems: '特殊物品或说明', specialItemsPlaceholder: '例如：钢琴、台球桌、易碎古董、停车困难...',
      step3Title: '联系信息', estimatedCost: '预估费用',
      estimateNote: '最终价格以入户勘察为准。此估算包含您选择的服务。',
      phoneHint: '我们将在 1 小时内致电确认详情', consentPrefix: '我同意接收通讯并理解', consentAnd: '和',
      whatNext: '接下来会发生什么？',
      nextSteps: ['搬家专员将在 1 小时内致电', '安排免费入户勘察（线上或现场）', '收到最终具有约束力的报价', '预订搬家，轻松等待！'],
      back: '← 返回', continue: '继续 →', submit: '获取免费报价',
      submitSuccess: '谢谢！我们的团队将在 1 小时内联系您并提供详细报价。',
      trustedBy: '超过 50,000 位满意客户信赖我们',
      trust: { licensed: 'Licensed and insured', bbb: 'A+ BBB 评级', reviews: '5000+ 五星评价' },
      addonLabels: {
        packing: { label: '专业打包', desc: '全套打包服务，含材料' },
        storage: { label: '仓储（30 天）', desc: '恒温仓储设施' },
        insurance: { label: '全值保护', desc: '全面保险覆盖' },
        unpacking: { label: '拆包服务', desc: '在新家拆包并摆放物品' },
        furniture: { label: '家具组装', desc: '家具拆卸与重新组装' },
        cleaning: { label: '搬家后清洁', desc: '旧居专业清洁' },
      },
    },
    worldwideMoving: {
      title: '全球国际搬家', subtitle: '跨洲门到门运输，具备海关专业知识',
      ctaQuote: '获取全球报价', ctaCall: '咨询专家',
      alertTitle: '请提前规划交期', alertBody: '海运通常需要 30–60 天。空运适用于紧急货运。',
      methodsTitle: '运输方式', destinationsTitle: '热门目的地', servicesTitle: '包含服务',
      processTitle: '全球搬家流程', costsTitle: '费用因素', prohibitedTitle: '限制与禁运物品',
      finalCta: '准备好全球搬家了吗？',
    },
    interstateMoving: {
      title: '州际搬家服务', subtitle: '覆盖美国全部 50 个州的可靠长途搬家',
      ctaQuote: '获取州际报价', ctaCall: '联系协调员',
      promoTitle: '旺季提示', promoBody: '5–9 月请提前 4–8 周预订，以锁定更优价格与日期。',
      whyTitle: '为何选择 VIP 州际搬家', servicesTitle: '服务选项', routesTitle: '热门路线',
      pricingTitle: '价格影响因素', tipsTitle: '搬家贴士', howTitle: '流程说明', includes: '包括：',
      finalCta: '准备好州际搬家了吗？',
    },
  },
};

const nestedText = {
  ar: {
    shippingMethods: [
      { method: 'شحن بحري (FCL)', cost: 'الأكثر اقتصادًا', bestFor: 'نقل منزل كامل', description: 'استخدام حصري لحاوية 20 أو 40 قدم. مثالي للنقل الكبير مع مرونة في المواعيد.', features: ['خدمة من الباب إلى الباب', 'الأكثر فعالية من حيث التكلفة', 'حاوية آمنة', 'الأفضل للأحجام الكبيرة'] },
      { method: 'شحن بحري (LCL)', cost: 'مناسب للميزانية', bestFor: 'شحنات أصغر', description: 'مشاركة مساحة الحاوية مع شحنات أخرى. مثالي لشقق 1-2 غرف.', features: ['الدفع مقابل المساحة المستخدمة', 'حجم مرن', 'شحن مجمّع', 'فعّال من حيث التكلفة'] },
      { method: 'شحن جوي', cost: 'تسعير متميز', bestFor: 'أغراض عاجلة/ثمينة', description: 'أسرع خيار للشحن الدولي. موصى به للشحنات الحساسة للوقت أو عالية القيمة.', features: ['تسليم سريع', 'تحكم في المناخ', 'أقصى أمان', 'معالجة بأولوية'] },
    ],
    continents: ['أوروبا', 'آسيا', 'أستراليا وأوقيانوسيا', 'أمريكا الجنوبية', 'أفريقيا', 'الشرق الأوسط'],
    wwServices: [
      { title: 'تعبئة احترافية', description: 'تعبئة خبيرة بمواد بمعايير دولية', included: ['صناديق مخصصة', 'فقاعات هوائية وحشو', 'جرد موسوم', 'معالجة الأغراض الهشة'] },
      { title: 'التخليص الجمركي', description: 'توثيق كامل وخدمات وساطة جمركية', included: ['نماذج جمركية', 'تصاريح استيراد', 'حساب الرسوم', 'تنسيق مع الوسطاء'] },
      { title: 'خدمة من الباب إلى الباب', description: 'استلام وتسليم كامل إلى عنوانك الجديد', included: ['استلام من المنزل', 'معالجة في الميناء', 'تسليم في الوجهة', 'خيارات فك التعبئة'] },
      { title: 'تأمين شامل', description: 'حماية كاملة للقيمة في النقل الدولي', included: ['تغطية جميع المخاطر', 'تأمين بحري', 'مساعدة في المطالبات', 'راحة البال'] },
    ],
    processSteps: [
      { title: 'استشارة مجانية', description: 'ناقش احتياجاتك مع أخصائي النقل الدولي' },
      { title: 'معاينة وعرض سعر', description: 'معاينة افتراضية أو في المنزل لتقدير الحجم وتقديم عرض دقيق' },
      { title: 'التوثيق', description: 'إعداد جميع الأوراق ونماذج الجمارك والتصاريح' },
      { title: 'تعبئة احترافية', description: 'فريق خبراء يعبئ ويوسم جميع الأغراض بعناية' },
      { title: 'التصدير والشحن', description: 'تحميل الحاوية وإغلاقها وشحنها إلى ميناء الوجهة' },
      { title: 'التخليص الجمركي', description: 'وكلاؤنا يتولون جميع إجراءات الجمارك في الوجهة' },
      { title: 'التسليم النهائي', description: 'التسليم إلى منزلك الجديد مع فك التعبئة عند الطلب' },
    ],
    prohibitedItems: ['سوائل قابلة للاشتعال ومواد متفجرة', 'أطعمة قابلة للتلف', 'نباتات وتربة (في دول كثيرة)', 'أسلحة وذخيرة', 'المخدرات والمواد الخاضعة للرقابة'],
    isServices: [
      { title: 'نقل كامل الخدمة', description: 'خدمة من الباب إلى الباب تشمل التعبئة والتحميل والنقل وفك التعبئة', features: ['تعبئة احترافية', 'تحميل وتفريغ', 'فك وتركيب الأثاث', 'خدمات فك التعبئة'] },
      { title: 'نقل جزئي/مشترك', description: 'حل اقتصادي للنقلات الأصغر بمشاركة مساحة الشاحنة', features: ['تكلفة أقل', 'جدولة مرنة', 'نفس مستوى العناية', 'مثالي لـ 1-2 غرف'] },
      { title: 'نقل سريع', description: 'خدمة أولوية مع شاحنة مخصصة وتسليم معجل', features: ['شاحنة مخصصة', 'تسليم 3-5 أيام', 'جدولة بأولوية', 'تتبع في الوقت الفعلي'] },
      { title: 'خدمة White Glove', description: 'تجربة نقل متميزة مع معالجة خاصة للأغراض الثمينة والحساسة', features: ['صناديق مخصصة', 'نقل بتحكم في المناخ', 'خدمات تركيب', 'دعم كونسierge'] },
    ],
    movingTips: [
      { title: 'احجز مبكرًا', tip: 'احجز تاريخ النقل قبل 4-8 أسابيع، خاصة في موسم الذروة (مايو–سبتمبر)' },
      { title: 'رتّب قبل النقل', tip: 'قلّل التكاليف ببيع أو التبرع بالأغراض غير الضرورية قبل التعبئة' },
      { title: 'احصل على عروض متعددة', tip: 'قارن 3 عروض على الأقل لضمان تسعير تنافسي وفهم ما هو مشمول' },
      { title: 'اقرأ التقييمات', tip: 'تحقق من تصنيفات BBB وGoogle وسجلات FMCSA قبل اختيار شركة النقل' },
    ],
    pricingFactors: [
      { factor: 'المسافة', impact: 'عامل التكلفة الرئيسي', description: 'مسافة أطول = تكلفة أعلى' },
      { factor: 'الوزن/الحجم', impact: 'ارتباط مباشر', description: 'يُحسب بالرطل أو القدم المكعب' },
      { factor: 'الموسم', impact: 'تأثير متوسط', description: 'الصيف (الذروة) أغلى بنسبة 20-30%' },
      { factor: 'الوصول', impact: 'رسوم إضافية', description: 'سلالم، حمل طويل، خدمة shuttle' },
      { factor: 'خدمات التعبئة', impact: 'إضافة اختيارية', description: 'التعبئة الاحترافية تضيف 15-25%' },
      { factor: 'التأمين', impact: 'موصى به', description: 'حماية كاملة للقيمة وراحة البال' },
    ],
  },
  es: {
    shippingMethods: [
      { method: 'Flete marítimo (FCL)', cost: 'Más económico', bestFor: 'Mudanzas completas del hogar', description: 'Uso exclusivo de un contenedor de 20 o 40 pies. Ideal para mudanzas grandes con flexibilidad de fechas.', features: ['Servicio puerta a puerta', 'Más rentable', 'Contenedor seguro', 'Ideal para grandes volúmenes'] },
      { method: 'Flete marítimo (LCL)', cost: 'Económico', bestFor: 'Envíos más pequeños', description: 'Comparta espacio de contenedor con otros envíos. Perfecto para apartamentos de 1-2 dormitorios.', features: ['Pague por el espacio usado', 'Volumen flexible', 'Envío consolidado', 'Eficiente en costos'] },
      { method: 'Flete aéreo', cost: 'Precio premium', bestFor: 'Artículos urgentes/de valor', description: 'La opción internacional más rápida. Recomendada para envíos urgentes o de alto valor.', features: ['Entrega exprés', 'Clima controlado', 'Máxima seguridad', 'Manejo prioritario'] },
    ],
    continents: ['Europa', 'Asia', 'Australia y Oceanía', 'América del Sur', 'África', 'Medio Oriente'],
    wwServices: [
      { title: 'Embalaje profesional', description: 'Embalaje experto con materiales de grado internacional', included: ['Embalaje personalizado', 'Plástico de burbujas y acolchado', 'Inventario etiquetado', 'Manejo de artículos frágiles'] },
      { title: 'Despacho aduanero', description: 'Documentación completa y servicios de agencia aduanal', included: ['Formularios aduaneros', 'Permisos de importación', 'Cálculo de aranceles', 'Coordinación con agentes'] },
      { title: 'Servicio puerta a puerta', description: 'Recogida y entrega completa en su nueva dirección', included: ['Recogida en el hogar', 'Manejo en puerto', 'Entrega en destino', 'Opciones de desembalaje'] },
      { title: 'Seguro integral', description: 'Protección de valor completo para mudanzas internacionales', included: ['Cobertura todo riesgo', 'Seguro marítimo', 'Asistencia con reclamos', 'Tranquilidad'] },
    ],
    processSteps: [
      { title: 'Consulta gratuita', description: 'Hable sobre sus necesidades con nuestro especialista en mudanzas internacionales' },
      { title: 'Inspección y cotización', description: 'Inspección virtual o en el hogar para evaluar el volumen y ofrecer una cotización precisa' },
      { title: 'Documentación', description: 'Prepare todos los documentos, formularios aduaneros y permisos necesarios' },
      { title: 'Embalaje profesional', description: 'Nuestro equipo experto embala y etiqueta todos los artículos con cuidado' },
      { title: 'Exportación y envío', description: 'Contenedor cargado, sellado y enviado al puerto de destino' },
      { title: 'Despacho aduanero', description: 'Nuestros agentes gestionan todos los trámites aduaneros en destino' },
      { title: 'Entrega final', description: 'Entrega en su nuevo hogar con desembalaje si lo solicita' },
    ],
    prohibitedItems: ['Líquidos inflamables y explosivos', 'Alimentos perecederos', 'Plantas y tierra (en muchos países)', 'Armas y munición', 'Drogas ilegales y sustancias controladas'],
    isServices: [
      { title: 'Mudanza de servicio completo', description: 'Servicio puerta a puerta con embalaje, carga, transporte y desembalaje profesional', features: ['Embalaje profesional', 'Carga y descarga', 'Desmontaje/montaje de muebles', 'Servicios de desembalaje'] },
      { title: 'Mudanza parcial/compartida', description: 'Solución económica para mudanzas más pequeñas, compartiendo espacio en camión', features: ['Menor costo', 'Programación flexible', 'Mismo cuidado y protección', 'Ideal para mudanzas de 1-2 dormitorios'] },
      { title: 'Mudanza exprés', description: 'Servicio prioritario con camión dedicado y entrega acelerada', features: ['Camión dedicado', 'Entrega en 3-5 días', 'Programación prioritaria', 'Seguimiento en tiempo real'] },
      { title: 'Servicio White Glove', description: 'Experiencia premium con manejo especializado para artículos delicados y de alto valor', features: ['Embalaje personalizado', 'Transporte con clima controlado', 'Servicios de instalación', 'Soporte concierge'] },
    ],
    movingTips: [
      { title: 'Reserve con anticipación', tip: 'Reserve su fecha 4-8 semanas antes, especialmente en temporada alta (mayo-septiembre)' },
      { title: 'Ordene primero', tip: 'Reduzca costos vendiendo o donando artículos que ya no necesita antes de embalar' },
      { title: 'Obtenga varias cotizaciones', tip: 'Compare al menos 3 estimaciones para asegurar precios competitivos y entender qué incluye' },
      { title: 'Lea reseñas', tip: 'Revise calificaciones BBB, reseñas de Google y registros FMCSA antes de elegir una empresa' },
    ],
    pricingFactors: [
      { factor: 'Distancia', impact: 'Factor principal de costo', description: 'Mayor distancia = mayores costos' },
      { factor: 'Peso/volumen', impact: 'Correlación directa', description: 'Se cobra por libra o pie cúbico' },
      { factor: 'Temporada', impact: 'Efecto moderado', description: 'Verano (alta) cuesta 20-30% más' },
      { factor: 'Acceso', impact: 'Tarifas adicionales', description: 'Escaleras, acarreo largo, servicio shuttle' },
      { factor: 'Servicios de embalaje', impact: 'Complemento opcional', description: 'Embalaje profesional agrega 15-25%' },
      { factor: 'Seguro', impact: 'Recomendado', description: 'Protección de valor completo para tranquilidad' },
    ],
  },
  ru: {
    shippingMethods: [
      { method: 'Морская перевозка (FCL)', cost: 'Самый экономичный', bestFor: 'Полный переезд дома', description: 'Эксклюзивное использование 20- или 40-футового контейнера. Идеально для крупных переездов с гибким графиком.', features: ['Доставка от двери до двери', 'Самый выгодный', 'Защищённый контейнер', 'Лучше для больших объёмов'] },
      { method: 'Морская перевозка (LCL)', cost: 'Бюджетный', bestFor: 'Меньшие отправления', description: 'Совместное использование контейнера с другими грузами. Подходит для квартир с 1-2 спальнями.', features: ['Оплата за используемое место', 'Гибкий объём', 'Кonsolidированная доставка', 'Экономично'] },
      { method: 'Авиаперевозка', cost: 'Премиальная цена', bestFor: 'Срочные/ценные предметы', description: 'Самый быстрый международный вариант. Рекомендуется для срочных или ценных отправлений.', features: ['Экспресс-доставка', 'Климат-контроль', 'Максимальная безопасность', 'Приоритетная обработка'] },
    ],
    continents: ['Европа', 'Азия', 'Австралия и Океания', 'Южная Америка', 'Африка', 'Ближний Восток'],
    wwServices: [
      { title: 'Профессиональная упаковка', description: 'Экспертная упаковка материалами международного класса', included: ['Индивидуальная обрешётка', 'Пузырчатая плёнка и амортизация', 'Маркированный инвентарь', 'Обработка хрупких предметов'] },
      { title: 'Таможенное оформление', description: 'Полная документация и брокерские услуги', included: ['Таможенные формы', 'Разрешения на импорт', 'Расчёт пошлин', 'Координация с брокерами'] },
      { title: 'Доставка от двери до двери', description: 'Полный забор и доставка на новый адрес', included: ['Забор из дома', 'Обработка в порту', 'Доставка в пункте назначения', 'Опции распаковки'] },
      { title: 'Комплексное страхование', description: 'Полная защита стоимости международного переезда', included: ['Покрытие всех рисков', 'Морское страхование', 'Помощь с претензиями', 'Спокойствие'] },
    ],
    processSteps: [
      { title: 'Бесплатная консультация', description: 'Обсудите потребности со специалистом по международным переездам' },
      { title: 'Осмотр и расчёт', description: 'Виртуальный или очный осмотр для оценки объёма и точного расчёта' },
      { title: 'Документация', description: 'Подготовка всех документов, таможенных форм и разрешений' },
      { title: 'Профессиональная упаковка', description: 'Команда экспертов аккуратно упаковывает и маркирует все предметы' },
      { title: 'Экспорт и отправка', description: 'Кontейнер загружен, опломбирован и отправлен в порт назначения' },
      { title: 'Таможенное оформление', description: 'Наши агенты проводят все таможенные процедуры в пункте назначения' },
      { title: 'Финальная доставка', description: 'Доставка в новый дом с распаковкой по запросу' },
    ],
    prohibitedItems: ['Легковоспламеняющиеся жидкости и взрывчатые вещества', 'Скоропортящиеся продукты', 'Растения и грунт (во многих странах)', 'Оружие и боеприпасы', 'Наркотики и контролируемые вещества'],
    isServices: [
      { title: 'Переезд под ключ', description: 'Полный сервис от двери до двери с упаковкой, погрузкой, перевозкой и распаковкой', features: ['Профессиональная упаковка', 'Погрузка и разгрузка', 'Разборка/сборка мебели', 'Услуги распаковки'] },
      { title: 'Частичный/совместный переезд', description: 'Экономичное решение для небольших переездов с совместным использованием грузовика', features: ['Ниже стоимость', 'Гибкое планирование', 'Тот же уровень заботы', 'Идеально для 1-2 спален'] },
      { title: 'Экспресс-переезд', description: 'Приоритетный сервис с выделенным грузовиком и ускоренной доставкой', features: ['Выделенный грузовик', 'Доставка за 3-5 дней', 'Приоритетное планирование', 'Отслеживание в реальном времени'] },
      { title: 'Сервис White Glove', description: 'Премиальный переезд со специальной обработкой ценных и хрупких предметов', features: ['Индивидуальная обрешётка', 'Перевозка с климат-контролем', 'Услуги установки', 'Concierge-поддержка'] },
    ],
    movingTips: [
      { title: 'Бронируйте заранее', tip: 'Резервируйте дату за 4-8 недель, особенно в пик сезона (май–сентябрь)' },
      { title: 'Сначала разберитесь с вещами', tip: 'Снижайте расходы, продав или отдав ненужные вещи до упаковки' },
      { title: 'Получите несколько расчётов', tip: 'Сравните минимум 3 предложения для конкурентной цены и понимания включённых услуг' },
      { title: 'Читайте отзывы', tip: 'Проверьте рейтинги BBB, отзывы Google и записи FMCSA перед выбором компании' },
    ],
    pricingFactors: [
      { factor: 'Расстояние', impact: 'Основной фактор стоимости', description: 'Большее расстояние = выше стоимость' },
      { factor: 'Вес/объём', impact: 'Прямая зависимость', description: 'Оплата за фунт или кубический фут' },
      { factor: 'Сезон', impact: 'Умеренное влияние', description: 'Лето (пик) дороже на 20-30%' },
      { factor: 'Доступ', impact: 'Дополнительные сборы', description: 'Лестницы, длинная переноска, shuttle-сервис' },
      { factor: 'Услуги упаковки', impact: 'Опциональная доплата', description: 'Профессиональная упаковка добавляет 15-25%' },
      { factor: 'Страхование', impact: 'Рекомендуется', description: 'Полная защита стоимости для спокойствия' },
    ],
  },
  zh: {
    shippingMethods: [
      { method: '海运 (FCL)', cost: '最经济', bestFor: '整户搬家', description: '独享 20 或 40 英尺集装箱。适合大型搬家且时间灵活。', features: ['门到门服务', '最具成本效益', '安全集装箱', '适合大体积'] },
      { method: '海运 (LCL)', cost: '预算友好', bestFor: '较小货运', description: '与其他货运共享集装箱空间。适合 1-2 卧室公寓。', features: ['按使用空间付费', '灵活体积', '拼箱运输', '成本高效'] },
      { method: '空运', cost: '高端定价', bestFor: '紧急/贵重物品', description: '最快的国际运输方式。推荐用于时间敏感或高价值货物。', features: ['快递交付', '温控', '最高安全性', '优先处理'] },
    ],
    continents: ['欧洲', '亚洲', '澳大利亚与大洋洲', '南美洲', '非洲', '中东'],
    wwServices: [
      { title: '专业打包', description: '使用国际级材料的专业打包', included: ['定制木箱', '气泡膜与缓冲', '标注清单', '易碎品处理'] },
      { title: '清关', description: '完整文件与报关代理服务', included: ['海关表格', '进口许可', '关税计算', '代理协调'] },
      { title: '门到门服务', description: '完整取件并送达新地址', included: ['上门取件', '港口处理', '目的地交付', '拆包选项'] },
      { title: '综合保险', description: '国际搬家的全值保护', included: ['全险覆盖', '海运保险', '理赔协助', '安心保障'] },
    ],
    processSteps: [
      { title: '免费咨询', description: '与国际搬家专家讨论您的需求' },
      { title: '勘察与报价', description: '线上或入户勘察评估体积并提供准确报价' },
      { title: '文件准备', description: '准备所有必要文件、海关表格和许可' },
      { title: '专业打包', description: '专家团队仔细打包并标注所有物品' },
      { title: '出口与运输', description: '集装箱装载、封箱并运往目的港' },
      { title: '清关', description: '我们的代理在目的地处理所有海关手续' },
      { title: '最终交付', description: '送达新家，可按需提供拆包' },
    ],
    prohibitedItems: ['易燃液体和爆炸物', '易腐食品', '植物和土壤（许多国家限制）', '武器和弹药', '非法药物和管制物质'],
    isServices: [
      { title: '全服务搬家', description: '门到门全流程，含专业打包、装卸、运输和拆包', features: ['专业打包', '装卸服务', '家具拆装', '拆包服务'] },
      { title: '部分/拼车搬家', description: '较小搬家的经济方案，与其他货运共享卡车空间', features: ['更低成本', '灵活排期', '同等保护', '适合 1-2 卧室'] },
      { title: '快速搬家', description: '专属卡车与加急交付的优先服务', features: ['专属卡车', '3-5 天交付', '优先排期', '实时追踪'] },
      { title: 'White Glove 服务', description: '高端搬家体验，专为高价值与易碎物品提供特殊处理', features: ['定制木箱', '温控运输', '安装服务', '礼宾支持'] },
    ],
    movingTips: [
      { title: '提前预订', tip: '提前 4-8 周预订搬家日期，旺季（5-9 月）尤其重要' },
      { title: '先整理物品', tip: '打包前出售或捐赠不需要的物品以降低成本' },
      { title: '获取多家报价', tip: '至少比较 3 份估价以确保竞争价格并了解包含内容' },
      { title: '阅读评价', tip: '选择搬家公司前查看 BBB 评级、Google 评价和 FMCSA 记录' },
    ],
    pricingFactors: [
      { factor: '距离', impact: '主要成本因素', description: '距离越长 = 成本越高' },
      { factor: '重量/体积', impact: '直接相关', description: '按磅或立方英尺计费' },
      { factor: '季节', impact: '中等影响', description: '夏季（旺季）贵 20-30%' },
      { factor: '通行条件', impact: '额外费用', description: '楼梯、长距离搬运、shuttle 服务' },
      { factor: '打包服务', impact: '可选附加', description: '专业打包增加 15-25%' },
      { factor: '保险', impact: '推荐', description: '全值保护，安心无忧' },
    ],
  },
};

nestedText.ru.shippingMethods[1].features[2] = 'Консолидированная доставка';
nestedText.ru.processSteps[4].description = 'Контейнер загружен, опломбирован и отправлен в порт назначения';
flatMeta.zh.freeMovingQuote.trust.licensed = '持证投保';

function applyNested(ww, is, loc) {
  const t = nestedText[loc];
  ww.shippingMethods = ww.shippingMethods.map((item, i) => ({ ...item, ...t.shippingMethods[i] }));
  ww.popularDestinations = ww.popularDestinations.map((item, i) => ({ ...item, continent: t.continents[i] }));
  ww.services = ww.services.map((item, i) => ({ ...item, ...t.wwServices[i] }));
  ww.processSteps = ww.processSteps.map((item, i) => ({ ...item, ...t.processSteps[i] }));
  ww.prohibitedItems = t.prohibitedItems;
  is.services = is.services.map((item, i) => ({ ...item, ...t.isServices[i] }));
  is.movingTips = is.movingTips.map((item, i) => ({ ...item, ...t.movingTips[i] }));
  is.pricingFactors = is.pricingFactors.map((item, i) => ({ ...item, ...t.pricingFactors[i] }));
}

export function buildPageOverlays() {
  const out = {};
  for (const loc of ['ar', 'es', 'ru', 'zh']) {
    const meta = flatMeta[loc];
    const fq = cloneEnPage('freeMovingQuote');
    const { addonLabels, ...fqRest } = meta.freeMovingQuote;
    Object.assign(fq, fqRest);
    if (addonLabels) setAddonServices(fq, addonLabels);

    const ww = cloneEnPage('worldwideMoving');
    Object.assign(ww, meta.worldwideMoving);
    const is = cloneEnPage('interstateMoving');
    Object.assign(is, meta.interstateMoving);
    applyNested(ww, is, loc);

    out[loc] = { freeMovingQuote: fq, worldwideMoving: ww, interstateMoving: is };
  }
  return out;
}
