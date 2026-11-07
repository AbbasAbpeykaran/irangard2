export type AttractionCategory =
  | 'history'
  | 'garden'
  | 'religious'
  | 'tomb'
  | 'museum'
  | 'market'
  | 'nature'
  | 'park';

export type AttractionArea = 'shiraz' | 'fars';

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
];
