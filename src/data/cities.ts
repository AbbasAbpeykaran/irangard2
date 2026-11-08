export type AttractionCategory =
  | 'history'
  | 'garden'
  | 'religious'
  | 'tomb'
  | 'museum'
  | 'market'
  | 'nature'
  | 'park';

export type AttractionArea = 'shiraz' | 'fars' | 'tehran-city' | 'tehran-province';

export type Attraction = {
  id: string;
  name: string;
  description: string;
  category: AttractionCategory;
  area: AttractionArea;
  /** Extra roles shown as small context in the guide; does not create duplicate progress items. */
  tags?: string[];
};

export type LocalFood = {
  id: string;
  name: string;
  description: string;
};

export type City = {
  id: string;
  name: string;
  provinceCode: string;
  latitude: number;
  longitude: number;
  attractions: Attraction[];
  localFoods: LocalFood[];
  sources: string[];
};

export const cities: City[] = [
  {
    id: 'shiraz',
    name: 'شیراز',
    provinceCode: 'IR-14',
    latitude: 29.5918,
    longitude: 52.5837,
    sources: [
      'https://visitiran.ir/province/fars-province',
      'https://visitiran.ir/en/attraction/vakil-bazaar-0',
      'https://whc.unesco.org/en/list/114',
      'https://whc.unesco.org/en/list/1106',
      'https://whc.unesco.org/en/tentativelists/898',
      'https://www.ivisitiran.com/en/city/parks/21/Parks-of-Shiraz',
      'https://en.icro.ir/Iranian%E2%80%93Cuisine/Shirazi-Kalam-Polau',
      'https://www.heritagepersia.com/blog/shiraz-food-guide/',
      'https://miras.iranhc.org/heritage/%D8%A2%D8%A8%D8%B4%D8%A7%D8%B1-%D9%85%D8%A7%D8%B1%DA%AF%D9%88%D9%86-1037',
      'https://documents1.worldbank.org/curated/en/558491468771287007/pdf/E869v1.pdf',
      'https://www.tasnimnews.ir/fa/news/1394/02/23/738281/سایه-سنگین-محرومیت-در-منطقه-تاریخی-سعدی-شیراز-تصاویر',
      'https://shirazisho.ir/آب-انبار-وکیل/',
      'https://bame-shiraz.ir/museums-of-shiraz/',
    ],
    attractions: [
      // Historic and archaeological sites in Shiraz
      {
        id: 'shiraz-arg-karim-khan',
        name: 'ارگ کریم‌خان',
        description: 'دژ و اقامتگاه حکومتی کریم‌خان زند در مرکز شهر؛ یکی از شاخص‌ترین یادگارهای دوره زندیه.',
        category: 'history', area: 'shiraz', tags: ['مجموعه زندیه', 'دوره زندیه'],
      },
      {
        id: 'shiraz-vakil-mosque',
        name: 'مسجد وکیل',
        description: 'مسجدی از مجموعه زندیه با شبستان ستون‌دار و معماری سنگی چشمگیر؛ در نزدیکی بازار و حمام وکیل.',
        category: 'religious', area: 'shiraz', tags: ['مجموعه زندیه', 'تاریخی'],
      },
      {
        id: 'shiraz-vakil-bazaar',
        name: 'بازار وکیل',
        description: 'بازار تاریخی ساخته‌شده در روزگار کریم‌خان زند؛ راسته‌ها و سراهای آن برای دیدن صنایع‌دستی و حال‌وهوای بازار سنتی مناسب‌اند.',
        category: 'market', area: 'shiraz', tags: ['مجموعه زندیه', 'تاریخی'],
      },
      {
        id: 'shiraz-vakil-bath',
        name: 'حمام وکیل',
        description: 'حمام تاریخی مجموعه زندیه که امروز بخشی از آن کاربری موزه گرمابه دارد.',
        category: 'history', area: 'shiraz', tags: ['مجموعه زندیه', 'موزه گرمابه'],
      },
      {
        id: 'shiraz-saraye-moshir',
        name: 'سرای مشیر',
        description: 'کاروان‌سرای بازار با حیاط مرکزی و حجره‌های صنایع‌دستی؛ توقفی دلنشین در گردش بازار وکیل.',
        category: 'market', area: 'shiraz', tags: ['بازارگردی'],
      },
      {
        id: 'shiraz-quran-gate',
        name: 'دروازه قرآن',
        description: 'دروازه تاریخی در ورودی شمالی شیراز که به نمادهای شناخته‌شده شهر تبدیل شده است.',
        category: 'history', area: 'shiraz',
      },
      {
        id: 'shiraz-jame-atiq',
        name: 'مسجد جامع عتیق',
        description: 'از کهن‌ترین مسجدهای شیراز؛ حیاط و خدای‌خانه تاریخی آن از بخش‌های شاخص مجموعه‌اند.',
        category: 'religious', area: 'shiraz', tags: ['تاریخی'],
      },
      {
        id: 'shiraz-abu-nasr',
        name: 'قصر ابونصر',
        description: 'محوطه‌ای باستانی در حاشیه شرقی شیراز که بقایای معماری و آثار چند دوره تاریخی در آن گزارش شده است.',
        category: 'history', area: 'shiraz', tags: ['محوطه باستانی', 'حاشیه شهر'],
      },

      // Gardens and green places
      {
        id: 'shiraz-eram',
        name: 'باغ ارم',
        description: 'باغ ایرانی شناخته‌شده با محورهای منظم، سروهای بلند و عمارت قاجاری؛ بخشی از پرونده جهانی «باغ ایرانی».',
        category: 'garden', area: 'shiraz', tags: ['باغ تاریخی', 'میراث جهانی باغ ایرانی'],
      },
      {
        id: 'shiraz-afifabad',
        name: 'باغ عفیف‌آباد (گلشن)',
        description: 'باغ تاریخی غرب شیراز که عمارت آن به موزه نظامی اختصاص یافته است؛ باغ و موزه را در یک بازدید می‌توان دید.',
        category: 'garden', area: 'shiraz', tags: ['موزه نظامی باغ عفیف‌آباد'],
      },
      {
        id: 'shiraz-narenjestan-qavam',
        name: 'نارنجستان قوام',
        description: 'مجموعه باغ و عمارت قاجاری خاندان قوام با حیاط نارنج، تزئینات آینه‌کاری و بخش‌های تاریخی؛ موزه نارنجستان نیز به همین مجموعه مربوط است.',
        category: 'garden', area: 'shiraz', tags: ['عمارت قاجاری', 'موزه نارنجستان قوام'],
      },
      {
        id: 'shiraz-jahan-nama',
        name: 'باغ جهان‌نما',
        description: 'یکی از باغ‌های تاریخی شیراز در محدوده شمالی شهر و نزدیک حافظیه و دروازه قرآن.',
        category: 'garden', area: 'shiraz', tags: ['باغ تاریخی'],
      },
      {
        id: 'shiraz-delgosha',
        name: 'باغ دلگشا',
        description: 'باغی تاریخی در شمال‌شرق شیراز، نزدیک سعدیه؛ درختان مرکبات و فضای باغی از ویژگی‌های شناخته‌شده آن است.',
        category: 'garden', area: 'shiraz', tags: ['باغ تاریخی'],
      },
      {
        id: 'shiraz-haft-tanan',
        name: 'هفت‌تنان',
        description: 'باغ و بنای تاریخی معروف به هفت‌تنان با سنگ‌قبرها و نگاره‌های تاریخی؛ موزه سنگ نیز در این مجموعه معرفی می‌شود.',
        category: 'museum', area: 'shiraz', tags: ['باغ تاریخی', 'آرامگاه هفت‌تنان', 'موزه هفت‌تنان'],
      },
      {
        id: 'shiraz-chehel-tanan',
        name: 'چهل‌تنان',
        description: 'محوطه آرامگاهی تاریخی در شیراز که در فهرست دیدنی‌های قدیمی شهر قرار دارد.',
        category: 'tomb', area: 'shiraz', tags: ['محوطه تاریخی'],
      },
      {
        id: 'shiraz-nazar-pars',
        name: 'باغ نظر و موزه پارس',
        description: 'باغ نظر با عمارت کلاه‌فرنگی؛ موزه پارس در همین عمارت قرار دارد و با آرامگاه کریم‌خان زند پیوند تاریخی دارد.',
        category: 'museum', area: 'shiraz', tags: ['باغ تاریخی', 'عمارت کلاه‌فرنگی', 'آرامگاه کریم‌خان زند'],
      },
      {
        id: 'shiraz-bagh-melli',
        name: 'باغ ملی',
        description: 'فضای سبز شهری برای استراحت و قدم‌زدن؛ با باغ‌های تاریخی مجموعه‌ای مثل ارم و دلگشا تفاوت دارد.',
        category: 'park', area: 'shiraz',
      },
      {
        id: 'shiraz-bagh-jannat',
        name: 'باغ جنت',
        description: 'بوستان بزرگ شهری در شیراز، مناسب قدم‌زدن و استراحت در فضای سبز.',
        category: 'park', area: 'shiraz',
      },
      {
        id: 'shiraz-chamran-boulevard',
        name: 'بلوار چمران',
        description: 'محور شهری در کنار فضای سبز و رودخانه خشک؛ بیشتر برای پیاده‌روی و تفریح شهری شناخته می‌شود تا یک اثر تاریخی.',
        category: 'park', area: 'shiraz',
      },

      // Religious places and tombs
      {
        id: 'shiraz-nasir-ol-molk',
        name: 'مسجد نصیرالملک',
        description: 'مسجد قاجاری مشهور به مسجد صورتی؛ شیشه‌های رنگی و کاشی‌کاری‌های آن در نور صبح جلوه ویژه‌ای دارند.',
        category: 'religious', area: 'shiraz', tags: ['مسجد تاریخی'],
      },
      {
        id: 'shiraz-shah-cheragh',
        name: 'آستان شاهچراغ',
        description: 'آرامگاه احمد بن موسی، از مهم‌ترین زیارتگاه‌های شیراز؛ آینه‌کاری‌ها و فضاهای معماری مجموعه از دیدنی‌های آن است.',
        category: 'religious', area: 'shiraz',
      },
      {
        id: 'shiraz-ali-ibn-hamzeh',
        name: 'امامزاده علی‌بن‌حمزه',
        description: 'آرامگاه تاریخی در نزدیکی رودخانه خشک با گنبد، آینه‌کاری و تزئینات داخلی چشمگیر.',
        category: 'religious', area: 'shiraz',
      },
      {
        id: 'shiraz-hafezieh',
        name: 'حافظیه',
        description: 'آرامگاه حافظ، شاعر نامدار ایرانی؛ محوطه باغی و گنبد آرامگاه از نمادهای فرهنگی شیراز است.',
        category: 'tomb', area: 'shiraz', tags: ['آرامگاه شاعر'],
      },
      {
        id: 'shiraz-saadieh',
        name: 'سعدیه',
        description: 'آرامگاه سعدی در باغی آرام در شمال‌شرق شیراز؛ بنای امروزی آرامگاه در میانه قرن بیستم شکل گرفته است.',
        category: 'tomb', area: 'shiraz', tags: ['آرامگاه شاعر'],
      },
      {
        id: 'shiraz-khwaju',
        name: 'آرامگاه خواجوی کرمانی',
        description: 'آرامگاه شاعر کرمانی در دامنه کوه صبوی، نزدیک دروازه قرآن و مشرف به ورودی شمالی شهر.',
        category: 'tomb', area: 'shiraz', tags: ['آرامگاه شاعر', 'چشم‌انداز شهری'],
      },
      {
        id: 'shiraz-sibawayh',
        name: 'آرامگاه سیبویه',
        description: 'آرامگاه منسوب به سیبویه، دانشمند نامدار علم نحو، در بافت تاریخی شیراز.',
        category: 'tomb', area: 'shiraz', tags: ['آرامگاه دانشمند'],
      },
      {
        id: 'shiraz-babakoohi',
        name: 'آرامگاه باباکوهی',
        description: 'آرامگاه و مجموعه‌ای در ارتفاعات شمالی شیراز؛ بازدید از مسیرهای کوهستانی را باید با توجه به شرایط مسیر و همراهی مناسب برنامه‌ریزی کرد.',
        category: 'tomb', area: 'shiraz', tags: ['ارتفاعات شمالی'],
      },
      {
        id: 'shiraz-gahvareh-did',
        name: 'گهواره‌دید',
        description: 'نقطه‌ای تاریخی و چشم‌اندازی در ارتفاعات شمالی شیراز، نزدیک دروازه قرآن و آرامگاه خواجوی کرمانی.',
        category: 'nature', area: 'shiraz', tags: ['چشم‌انداز شهری'],
      },
      {
        id: 'shiraz-chah-morteza-ali',
        name: 'چاه مرتاض‌علی',
        description: 'چاه و مکان تاریخی در ارتفاعات Chehel Maqam شیراز؛ مسیر و شرایط دسترسی را پیش از برنامه‌ریزی بررسی کن.',
        category: 'nature', area: 'shiraz', tags: ['ارتفاعات'],
      },
      {
        id: 'shiraz-babakoohi-mountain',
        name: 'کوه باباکوهی',
        description: 'ارتفاعات شمالی شیراز با مسیرهای کوهپایه‌ای و چشم‌انداز شهر؛ شرایط مسیر، آب‌وهوا و دسترسی را پیش از حرکت بررسی کن.',
        category: 'nature', area: 'shiraz', tags: ['کوه‌پیمایی سبک', 'ارتفاعات شمالی'],
      },

      // Museums and historic houses not already represented above
      {
        id: 'shiraz-zinat-ol-molk',
        name: 'خانه زینت‌الملک و موزه مشاهیر',
        description: 'خانه تاریخی قاجاری با حیاط و تزئینات داخلی؛ روبه‌روی نارنجستان قوام. این بنا با عنوان موزه زینت‌الملک و موزه مشاهیر نیز شناخته می‌شود.',
        category: 'museum', area: 'shiraz', tags: ['خانه تاریخی', 'موزه زینت‌الملک', 'موزه مشاهیر'],
      },
      {
        id: 'shiraz-divankhaneh',
        name: 'عمارت دیوان‌خانه',
        description: 'بنای تاریخی مرتبط با مجموعه حکومتی زندیه؛ پیش از برنامه‌ریزی بازدید، وضعیت دسترسی عمومی آن را بررسی کن.',
        category: 'museum', area: 'shiraz', tags: ['بنای تاریخی'],
      },
      {
        id: 'shiraz-shapouri',
        name: 'خانه و عمارت شاپوری',
        description: 'عمارت مسکونی دوره پهلوی اول با ترکیبی از عناصر معماری ایرانی و اروپایی و باغی کوچک در پیرامون بنا.',
        category: 'museum', area: 'shiraz', tags: ['خانه تاریخی'],
      },
      {
        id: 'shiraz-natural-history-museum',
        name: 'موزه تاریخ طبیعی دانشگاه شیراز',
        description: 'مجموعه‌ای آموزشی با نمونه‌هایی از جانوران، گیاهان و زمین‌شناسی؛ ساعت و امکان بازدید ممکن است تغییر کند.',
        category: 'museum', area: 'shiraz',
      },
      {
        id: 'shiraz-water-museum',
        name: 'موزه آب (آب‌انبار وکیل؛ از آب‌انبارهای کریم‌خانی)',
        description: 'آب‌انبار وکیل از سازه‌های آبی ساخته‌شده در روزگار کریم‌خان زند است و با عنوان موزه یا گالری آب معرفی شده؛ نام رایج بنا «آب‌انبار وکیل» است، نه آب‌انبار کریم‌خانی به‌عنوان نام مستقل. وضعیت فعالیت و امکان بازدید را پیش از رفتن بررسی کن.',
        category: 'museum', area: 'shiraz', tags: ['مجموعه زندیه', 'موزه آب'],
      },

      // Places in Fars outside Shiraz
      {
        id: 'shiraz-persepolis',
        name: 'تخت جمشید (پارسه)',
        description: 'مجموعه شاهی هخامنشی که ساخت تراس آن در روزگار داریوش بزرگ، حدود ۵۱۸ پیش از میلاد، آغاز شد؛ در فهرست میراث جهانی یونسکو ثبت شده است.',
        category: 'history', area: 'fars', tags: ['محوطه باستانی', 'میراث جهانی'],
      },
      {
        id: 'shiraz-naqsh-e-rostam',
        name: 'نقش رستم',
        description: 'محوطه‌ای در نزدیکی تخت جمشید با آرامگاه‌های صخره‌ای شاهان هخامنشی و نقش‌برجسته‌های دوره ساسانی.',
        category: 'history', area: 'fars', tags: ['محوطه باستانی'],
      },
      {
        id: 'shiraz-naqsh-e-rajab',
        name: 'نقش رجب',
        description: 'محوطه‌ای کوچک در نزدیکی نقش رستم با نقش‌برجسته‌های مهم ساسانی؛ معمولاً در کنار بازدید از تخت جمشید و نقش رستم برنامه‌ریزی می‌شود.',
        category: 'history', area: 'fars', tags: ['نقش‌برجسته ساسانی'],
      },
      {
        id: 'shiraz-pasargadae',
        name: 'پاسارگاد و آرامگاه کوروش بزرگ',
        description: 'نخستین پایتخت دودمانی هخامنشی که به فرمان کوروش بزرگ بنیان گذاشته شد؛ آرامگاه کوروش و بقایای کاخ‌ها و باغ‌ها در محوطه قرار دارند.',
        category: 'history', area: 'fars', tags: ['محوطه باستانی', 'میراث جهانی'],
      },
      {
        id: 'fars-maharlou-lake',
        name: 'دریاچه مهارلو',
        description: 'دریاچه‌ای شور در جنوب‌شرق شیراز که رنگ و میزان آب آن با فصل، بارندگی و شرایط محیطی تغییر می‌کند؛ پیش از حرکت وضعیت منطقه را بررسی کن.',
        category: 'nature', area: 'fars', tags: ['طبیعت‌گردی', 'وابسته به فصل'],
      },
      {
        id: 'fars-bamu-national-park',
        name: 'پارک ملی بمو',
        description: 'منطقه حفاظت‌شده در شمال‌شرق شیراز با ارزش طبیعی و زیستگاهی؛ ورود و بازدید باید مطابق مقررات و محدوده‌های مجاز محیط‌زیست باشد.',
        category: 'nature', area: 'fars', tags: ['منطقه حفاظت‌شده'],
      },
      {
        id: 'fars-margoon-waterfall',
        name: 'آبشار مارگون',
        description: 'آبشاری در منطقه سپیدان استان فارس و بیرون از شهر شیراز؛ به‌دلیل فاصله و شرایط جاده بهتر است یک برنامه جداگانه برای آن در نظر گرفته شود.',
        category: 'nature', area: 'fars', tags: ['سفر یک‌روزه', 'منطقه حفاظت‌شده'],
      },
    ],
    localFoods: [
      { id: 'food-faloodeh', name: 'فالوده شیرازی', description: 'دسر خنک و رشته‌ای که معمولاً با آب‌لیمو یا شربت و گاهی عرقیجات سرو می‌شود.' },
      { id: 'food-kalam-polo', name: 'کلم‌پلوی شیرازی', description: 'پلوی محلی با کلم، سبزی‌های معطر و کوفته‌ریزه؛ از شناخته‌شده‌ترین غذاهای شیراز.' },
      { id: 'food-ashe-sabzi', name: 'آش سبزی شیرازی', description: 'آشی سنتی و نسبتاً غلیظ که با سبزی، حبوبات و در برخی دستورها گوشت تهیه می‌شود.' },
      { id: 'food-salad-shirazi', name: 'سالاد شیرازی', description: 'ترکیب خیار، گوجه و پیاز خردشده با آب‌غوره یا آب‌لیمو و چاشنی‌های ساده.' },
      { id: 'food-koofteh-sabzi', name: 'کوفته سبزی', description: 'از غذاهای محلی فارس با سبزی‌های معطر و مواد میانی؛ دستور پخت آن در خانواده‌ها متفاوت است.' },
      { id: 'food-distillates', name: 'عرقیات و بهارنارنج', description: 'عرقیات گیاهی و فرآورده‌های بهارنارنج از سوغات شناخته‌شده شیراز و فارس هستند.' },
      { id: 'food-pickles', name: 'ترشیجات محلی فارس', description: 'انواع ترشی‌های محلی و چاشنی‌های سنتی که می‌توانند در کنار عرقیات و بهارنارنج در فهرست سوغات خوراکی قرار بگیرند.' },
    ],
  },
  {
    id: 'tehran',
    name: 'تهران',
    provinceCode: 'IR-07',
    latitude: 35.6892,
    longitude: 51.3890,
    sources: [
      'https://visitiran.ir/province/Tehran-Province',
      'https://visitiran.ir/en/TourismMap',
      'https://openadmindata.org/ir/provinces/tehran-ir028/',
    ],
    attractions: [
      { id: 'tehran-golestan', name: 'کاخ گلستان', description: 'مجموعه\u200cای از کاخ\u200cها و بناهای سلطنتی دوره قاجار در قلب تهران؛ از مهم\u200cترین یادگارهای تاریخی پایتخت.', category: 'history', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-saadabad', name: 'مجموعه فرهنگی\u200cتاریخی سعدآباد', description: 'مجموعه\u200cای گسترده از کاخ\u200cها، موزه\u200cها و باغ\u200cهای تاریخی در شمال تهران.', category: 'history', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-niavaran', name: 'مجموعه فرهنگی\u200cتاریخی نیاوران', description: 'مجموعه\u200cای از بناهای سلطنتی معاصر، از جمله کاخ صاحبقرانیه و کوشک احمدشاهی.', category: 'history', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-masoudieh', name: 'عمارت مسعودیه', description: 'عمارت قاجاری با تزئینات معماری و حیاط\u200cهای تاریخی در محدوده بهارستان.', category: 'history', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-abad-museum', name: 'موزه ملی ایران', description: 'مجموعه\u200cای مهم از آثار باستان\u200cشناسی و تاریخ ایران در دو ساختمان باستان\u200cشناسی و دوران اسلامی.', category: 'museum', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-abgineh', name: 'موزه آبگینه و سفالینه', description: 'موزه\u200cای در عمارتی تاریخی با مجموعه\u200cای از شیشه و سفال ایران.', category: 'museum', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-moghadam', name: 'موزه مقدم', description: 'خانه\u200cای تاریخی با حیاط\u200cها، کاشی\u200cها و اشیای گردآوری\u200cشده؛ بازدید را با ساعات رسمی هماهنگ کن.', category: 'museum', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-carpet', name: 'موزه فرش ایران', description: 'موزه\u200cای تخصصی برای آشنایی با قالی و قالی\u200cبافی مناطق مختلف ایران.', category: 'museum', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-reza-abbasi', name: 'موزه رضا عباسی', description: 'مجموعه\u200cای از آثار هنر و تاریخ ایران از دوره\u200cهای گوناگون.', category: 'museum', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-jewelry', name: 'موزه جواهرات ملی', description: 'گنجینه\u200cای از جواهرات تاریخی ایران؛ فعالیت و زمان بازدید ممکن است محدود باشد.', category: 'museum', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-pars', name: 'موزه و باغ نگارستان', description: 'باغ و عمارت تاریخی با مجموعه\u200cهای هنری و فرهنگی در مرکز تهران.', category: 'museum', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-military', name: 'موزه نظامی سعدآباد', description: 'موزه\u200cای در مجموعه سعدآباد با موضوع تاریخ نظامی؛ بخشی از بازدید مجموعه است.', category: 'museum', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-bazaar', name: 'بازار بزرگ تهران', description: 'بازار سرپوشیده و تاریخی پایتخت با راسته\u200cها و سراهای متعدد.', category: 'market', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-tajrish', name: 'بازار تجریش', description: 'بازاری پرجنب\u200cوجوش در شمال تهران، نزدیک میدان تجریش و امامزاده صالح.', category: 'market', area: 'tehran-city', tags: ['شمیرانات'] },
      { id: 'tehran-30tir', name: 'خیابان سی تیر', description: 'خیابانی تاریخی در مرکز تهران با موزه\u200cها و بناهای شاخص پیرامون آن.', category: 'history', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-bagh-melli', name: 'میدان مشق و سردر باغ ملی', description: 'محدوده\u200cای تاریخی با سردر شناخته\u200cشده و ساختمان\u200cهای مهم فرهنگی پیرامون آن.', category: 'history', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-shams', name: 'شمس\u200cالعماره', description: 'بنای شاخص مجموعه کاخ گلستان و از نمادهای معماری تهران قاجاری.', category: 'history', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-azadi', name: 'برج آزادی', description: 'بنای یادمانی شناخته\u200cشده در میدان آزادی؛ نمادی از معماری معاصر ایران.', category: 'history', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-milad', name: 'برج میلاد', description: 'برج مخابراتی و مجموعه بازدید و تفریحی در غرب تهران؛ امکانات وابسته به زمان فعالیت\u200cاند.', category: 'park', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-tabiat', name: 'پل طبیعت', description: 'پل پیاده\u200cگذر میان دو پارک بزرگ تهران با چشم\u200cانداز شهری.', category: 'park', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-chitgar', name: 'دریاچه شهدای خلیج فارس (چیتگر)', description: 'دریاچه و مجموعه تفریحی در غرب تهران؛ وضعیت فعالیت امکانات را پیش از مراجعه بررسی کن.', category: 'nature', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-jamshidieh', name: 'پارک جمشیدیه', description: 'پارکی کوهپایه\u200cای در شمال تهران با مسیرهای سنگی و چشم\u200cانداز شهر.', category: 'park', area: 'tehran-city', tags: ['شمیرانات'] },
      { id: 'tehran-laleh', name: 'پارک لاله', description: 'پارکی بزرگ در مرکز تهران، نزدیک چند موزه و فضای فرهنگی.', category: 'park', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-mellat', name: 'پارک ملت', description: 'پارکی گسترده در شمال تهران با مسیرهای پیاده\u200cروی و فضای سبز.', category: 'park', area: 'tehran-city', tags: ['تهران'] },
      { id: 'tehran-tochal', name: 'مجموعه تفریحی توچال', description: 'مجموعه کوهستانی و تله\u200cکابین در شمال تهران؛ فعالیت مسیرها و امکانات وابسته به شرایط جوی است.', category: 'nature', area: 'tehran-city', tags: ['شمیرانات'] },
      { id: 'tehran-darband', name: 'دربند', description: 'مسیر گردشگری و کوهپایه\u200cای در شمال تهران با بافت پیاده\u200cراه و چشم\u200cانداز کوهستان.', category: 'nature', area: 'tehran-city', tags: ['شمیرانات'] },
      { id: 'tehran-darakeh', name: 'درکه', description: 'محدوده\u200cای کوهپایه\u200cای و مسیر طبیعت\u200cگردی در شمال تهران.', category: 'nature', area: 'tehran-city', tags: ['شمیرانات'] },
      { id: 'tehran-ferdows', name: 'باغ فردوس و موزه سینما', description: 'عمارت و باغ تاریخی که امروز موزه سینمای ایران در آن قرار دارد.', category: 'museum', area: 'tehran-city', tags: ['شمیرانات'] },
      { id: 'rey-toghrol', name: 'برج طغرل', description: 'بنای تاریخی دوره سلجوقی در شهرری با معماری آجری شاخص.', category: 'history', area: 'tehran-province', tags: ['ری'] },
      { id: 'rey-cheshmeh', name: 'چشمه\u200cعلی ری', description: 'محوطه\u200cای تاریخی در شهرری با پیشینه باستانی و نقش\u200cبرجسته قاجاری.', category: 'history', area: 'tehran-province', tags: ['ری'] },
      { id: 'rey-rashkan', name: 'دژ رشکان', description: 'بقایای دژی تاریخی در محدوده شهرری که به استحکامات کهن این منطقه مربوط است.', category: 'history', area: 'tehran-province', tags: ['ری'] },
      { id: 'rey-mil', name: 'تپه میل', description: 'محوطه باستانی آتشکده\u200cای در جنوب\u200cشرق شهرری؛ بازدید را با وضعیت دسترسی هماهنگ کن.', category: 'history', area: 'tehran-province', tags: ['ری'] },
      { id: 'rey-shahabd', name: 'آستان حضرت عبدالعظیم حسنی', description: 'مجموعه زیارتی و معماری تاریخی مهم در شهرری.', category: 'religious', area: 'tehran-province', tags: ['ری'] },
      { id: 'rey-bibi', name: 'بقعه بی\u200cبی شهربانو', description: 'مجموعه\u200cای زیارتی در ارتفاعات جنوب\u200cشرق ری؛ مسیر و شرایط دسترسی را پیش از حرکت بررسی کن.', category: 'religious', area: 'tehran-province', tags: ['ری'] },
      { id: 'shemiran-saleh', name: 'امامزاده صالح تجریش', description: 'بقعه\u200cای شناخته\u200cشده در میدان تجریش و یکی از نقاط مهم مذهبی شمیرانات.', category: 'religious', area: 'tehran-city', tags: ['شمیرانات'] },
      { id: 'shemiran-ahaar', name: 'روستای آهار و مسیر شکراب', description: 'روستایی کوهستانی در شمیرانات با مسیرهای طبیعت\u200cگردی؛ وضعیت مسیر را پیش از حرکت بررسی کن.', category: 'nature', area: 'tehran-province', tags: ['شمیرانات'] },
      { id: 'shemiran-afjeh', name: 'روستای افجه و دشت هویج', description: 'روستایی در لواسانات و مسیر دسترسی به دشت هویج؛ مقصدی فصلی و وابسته به شرایط مسیر.', category: 'nature', area: 'tehran-province', tags: ['شمیرانات'] },
      { id: 'shemiran-fasham', name: 'فشم', description: 'منطقه\u200cای کوهستانی و گردشگری در رودبار قصران با طبیعت و مسیرهای ییلاقی.', category: 'nature', area: 'tehran-province', tags: ['شمیرانات'] },
      { id: 'shemiran-meygun', name: 'میگون', description: 'منطقه\u200cای کوهستانی در رودبار قصران با چشم\u200cاندازهای البرز.', category: 'nature', area: 'tehran-province', tags: ['شمیرانات'] },
      { id: 'shemiran-lavasan', name: 'لواسان و سد لتیان', description: 'منطقه شهری و طبیعت\u200cپایه در شمال\u200cشرق تهران؛ دسترسی به حریم سد تابع مقررات است.', category: 'nature', area: 'tehran-province', tags: ['شمیرانات'] },
      { id: 'damavand-tar', name: 'دریاچه تار', description: 'دریاچه کوهستانی در شهرستان دماوند؛ مسیر دسترسی و وضعیت جاده را پیش از سفر بررسی کن.', category: 'nature', area: 'tehran-province', tags: ['دماوند'] },
      { id: 'damavand-hovir', name: 'دریاچه هویر', description: 'دریاچه\u200cای کوهستانی در نزدیکی دریاچه تار با شرایط دسترسی فصلی.', category: 'nature', area: 'tehran-province', tags: ['دماوند'] },
      { id: 'damavand-chashmeh', name: 'چشمه اعلا', description: 'چشمه و تفرجگاه شناخته\u200cشده در نزدیکی شهر دماوند.', category: 'nature', area: 'tehran-province', tags: ['دماوند'] },
      { id: 'damavand-shibli', name: 'برج شبلی', description: 'برج آرامگاهی تاریخی در شهر دماوند با معماری آجری.', category: 'history', area: 'tehran-province', tags: ['دماوند'] },
      { id: 'damavand-roodafshan', name: 'غار رودافشان', description: 'غاری طبیعی در شهرستان دماوند؛ بازدید نیازمند توجه به شرایط مسیر و ایمنی غارنوردی است.', category: 'nature', area: 'tehran-province', tags: ['دماوند'] },
      { id: 'damavand-abali', name: 'پیست اسکی آبعلی', description: 'مجموعه ورزش\u200cهای زمستانی در آبعلی؛ فعالیت آن وابسته به فصل و شرایط برف است.', category: 'nature', area: 'tehran-province', tags: ['دماوند'] },
      { id: 'firuzkuh-vashi', name: 'تنگه واشی', description: 'دره و مسیر طبیعی شناخته\u200cشده در فیروزکوه؛ عبور از آب و شرایط فصلی نیازمند بررسی قبلی است.', category: 'nature', area: 'tehran-province', tags: ['فیروزکوه'] },
      { id: 'firuzkuh-khomdeh', name: 'چشمه خمده', description: 'چشمه\u200cای طبیعی در شهرستان فیروزکوه؛ امکانات و شرایط استفاده را پیش از سفر بررسی کن.', category: 'nature', area: 'tehran-province', tags: ['فیروزکوه'] },
      { id: 'firuzkuh-gaduk', name: 'کاروانسرای گدوک', description: 'کاروانسرای تاریخی در مسیر فیروزکوه و گردنه گدوک.', category: 'history', area: 'tehran-province', tags: ['فیروزکوه'] },
      { id: 'varamin-jame', name: 'مسجد جامع ورامین', description: 'مسجدی تاریخی از دوره ایلخانی با تزئینات آجری و کاشی\u200cکاری.', category: 'religious', area: 'tehran-province', tags: ['ورامین'] },
      { id: 'varamin-alaeddin', name: 'برج علاءالدوله', description: 'برج آرامگاهی تاریخی در شهر ورامین.', category: 'history', area: 'tehran-province', tags: ['ورامین'] },
      { id: 'varamin-iraj', name: 'قلعه ایرج', description: 'محوطه و دژ باستانی بزرگ در محدوده ورامین؛ بازدید باید با رعایت محدوده\u200cهای مجاز انجام شود.', category: 'history', area: 'tehran-province', tags: ['ورامین'] },
      { id: 'pishva-shoghali', name: 'تپه شغالی پیشوا', description: 'محوطه باستانی در شهرستان پیشوا با اهمیت در شناخت استقرارهای کهن منطقه.', category: 'history', area: 'tehran-province', tags: ['پیشوا'] },
      { id: 'shahriar-joghin', name: 'قلعه جوقین', description: 'بنای تاریخی در شهرستان شهریار که به\u200cعنوان یکی از آثار شاخص منطقه شناخته می\u200cشود.', category: 'history', area: 'tehran-province', tags: ['شهریار'] },
      { id: 'malard-rostam', name: 'تخت رستم ملارد', description: 'محوطه تاریخی و مذهبی باستانی در شهرستان ملارد.', category: 'history', area: 'tehran-province', tags: ['ملارد'] },
      { id: 'pakdasht-nature', name: 'پارک ملی و منطقه حفاظت\u200cشده خجیر', description: 'منطقه طبیعی حفاظت\u200cشده در شرق تهران؛ ورود و بازدید فقط مطابق ضوابط محیط\u200cزیست.', category: 'nature', area: 'tehran-province', tags: ['پاکدشت / شرق تهران'] },
    ],
    localFoods: [
      { id: 'tehran-food-valak', name: 'والک‌پلو', description: 'پلوی فصلی با گیاه والک که در نواحی کوهپایه‌ای تهران شناخته شده است.' },
      { id: 'tehran-food-dampokhtak', name: 'دمپختک', description: 'غذایی خانگی و سنتی با برنج و باقالی زرد.' },
      { id: 'tehran-food-doogh', name: 'دوغ و نان محلی آبالی', description: 'از خوراکی‌ها و سوغات شناخته‌شده منطقه آبالی و شرق تهران.' },
    ],
  },
];
