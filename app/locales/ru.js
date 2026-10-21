// Русский — основной язык сайта. Ключи во всех трёх файлах одинаковые.
// Faktlar manbasi: Instagram @hammersmith.uz (Стейки • Пиво • Атмосфера • 15:00-01:00),
// emenu.uz (filiallar va menyu). Tekshirilmagan da'vo (tarix, yil, jonli musiqa va h.k.) yozilmaydi.
export default {
  langLabel: 'Русский',
  // tugmadagi qisqa nom — tilning o'z alifbosida
  langShort: 'РУ',
  seoTitle: 'Hammersmith — стейки, пиво и атмосфера в Ташкенте',

  // Bo'lim sarlavhasi ustidagi kichik yorliq
  eyebrow: {
    why: 'Hammersmith',
    about: 'О нас',
    studios: 'Филиалы',
    menu: 'Меню',
    form: 'Бронь',
  },

  gallery: {
    open: 'Смотреть фото',
    close: 'Закрыть',
    back: 'Ко всем фото',
    prev: 'Предыдущее фото',
    next: 'Следующее фото',
    hint: 'Нажмите на фото, чтобы открыть его целиком',
  },

  header: {
    navLabel: 'Основное меню',
    cta: 'Забронировать стол',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    menu: 'Меню',
    langLabel: 'Язык',
    toTop: 'Наверх',
  },

  nav: {
    menu: 'Меню',
    branches: 'Филиалы',
    about: 'О нас',
    contacts: 'Контакты',
  },

  hero: {
    title: 'Стейки, пиво',
    titleAccent: 'и атмосфера',
    text: 'Стейки на гриле, разливное пиво и закуски к нему — в пяти ресторанах Hammersmith в Ташкенте. Каждый день с 15:00 до 01:00.',
   
    cta: 'Смотреть меню',
    proofTitle: '5 ресторанов в Ташкенте',
    proofText: 'Новза, Орда, Минор, Узбум и Паркент — выберите ближайший и забронируйте стол.',
    place: 'Ташкент · 5 филиалов · 15:00 – 01:00',
  },

  alt: {
    hero: 'Стейки на открытом огне',
    heroGrill: 'Мясо на решётке гриля',
    heroFire: 'Огонь гриля',
    slide: 'Слайд',
  },

  // Bosh sahifa: nega Hammersmith (4 ta kartochka, ikonkalar — content.js BENEFIT_ICONS)
  why: {
    title: 'За чем',
    titleAccent: 'приходят к нам',
    items: [
      { title: 'Стейки на гриле', text: 'Томагавк, рибай, ти-бон, нью-йорк, денвер, мачете и другие — десять видов стейков в меню.' },
      { title: 'Пиво и закуски', text: 'Фильтрованное и нефильтрованное, тёмное и пшеничное пиво, сеты к пиву и копчёная рыба.' },
      { title: 'До часа ночи', text: 'Открыто каждый день с 15:00 до 01:00 — на ужин, встречу с друзьями или поздний вечер.' },
      { title: 'Пять адресов', text: 'Новза, Орда, Минор, Узбум и Паркент — рестораны в разных районах Ташкента.' },
    ],
  },

  about: {
    // ustma-ust suratlar / galereya yozuvlari (content.js ABOUT_STACK tartibida)
    photos: ['Пивной сет', 'Стейк томагавк', 'Гриль-ассорти от шефа'],
    title: 'Стейки, пиво',
    titleAccent: 'и атмосфера',
    paragraphs: [
      'Hammersmith — сеть ресторанов-баров в Ташкенте. В центре меню — мясо на гриле: стейки из говядины, свиные рёбра, BBQ-сеты «Meat Hunt» и гриль-ассорти для большой компании.',
      'К мясу — разливное и бутылочное пиво, закуски к пиву, копчёная рыба, салаты HS и коктейли. Пять филиалов работают каждый день с 15:00 до 01:00.',
    ],
  },

  // Bosh blok ostidagi ishonch qatori (raqamlar CountUp bilan sanaladi; emenu menyusi bo'yicha)
  trust: [
    { value: '5', label: 'ресторанов в Ташкенте' },
    { value: '10', label: 'видов стейков в меню' },
    { value: '20', label: 'позиций пива' },
    { value: '15–01', label: 'работаем каждый день' },
  ],

  // Filiallar (emenu.uz)
  studios: {
    title: 'Пять ресторанов',
    titleAccent: 'в Ташкенте',
    text: 'Одно меню и один характер в каждом филиале. Нажмите на адрес — откроется карта.',
    photo: 'Фото',
    hours: 'Ежедневно',
    call: 'Позвонить',
    route: 'Маршрут',
    photoSoon: 'Фото филиала скоро',
    branches: {
      novza: { name: 'Новза', address: 'ул. Мукими, 21' },
      orda: { name: 'Орда', address: 'ул. Шайхантахур, 29' },
      minor: { name: 'Минор', address: 'пр. Амира Темура, 62' },
      uzbum: { name: 'Узбум', address: 'Фаргона йули, 44' },
      parkent: { name: 'Паркент', address: 'ул. Султанали Машхади, 52' },
    },
  },

  // «Yonuvchi matn» bloki
  statement: 'Мясо на открытом огне, холодное пиво и долгий вечер с друзьями — Hammersmith работает каждый день до часу ночи.',

  // Bosh sahifadagi «Menyudan» bloki
  featured: {
    title: 'Из нашего',
    titleAccent: 'меню',
    text: 'Цены и наличие — из актуального меню ресторана.',
    all: 'Всё меню',
  },

  // Menyu sahifasi (emenu ma'lumoti)
  menu: {
    seo: 'Меню — Hammersmith',
    seoText: 'Меню ресторанов Hammersmith: стейки, BBQ, закуски к пиву, салаты, пиво и коктейли с ценами.',
    eyebrow: 'Меню',
    title: 'Меню',
    accent: 'Hammersmith',
    text: 'Одно меню во всех пяти филиалах. Цены в сумах.',
    groups: { grill: 'Гриль и BBQ', kitchen: 'Кухня', bar: 'Бар', drinks: 'Напитки', coffee: 'Кофе' },
    search: 'Найти блюдо',
    empty: 'Ничего не нашлось',
    sum: 'сум',
    from: 'от',
    minutes: 'мин',
    composition: 'Состав',
    error: 'Меню сейчас не загрузилось. Попробуйте обновить страницу или позвоните нам.',
    retry: 'Обновить',
    loading: 'Загружаем меню…',
    noPhoto: 'Без фото',
    categories: 'Разделы меню',
    adult: 'Алкогольные напитки продаются лицам старше 18 лет.',
  },

  cta: {
    lead: 'Оставьте заявку — администратор перезвонит и подтвердит бронь в выбранном филиале.',
    title: 'Забронируйте',
    titleAccent: 'стол',
    button: 'Забронировать стол',
  },

  form: {
    title: 'Бронь',
    titleAccent: 'стола',
    text: 'Оставьте контакты, филиал и время — мы перезвоним, чтобы подтвердить бронь.',
    name: 'Имя',
    phone: 'Телефон',
    studio: 'Филиал',
    date: 'Дата',
    time: 'Время',
    guests: 'Гостей',
    comment: 'Пожелания к брони',
    consentBefore: 'Я согласен(на) с',
    consentLink: 'договором оферты',
    consentMid: 'и',
    consentPolicy: 'обработкой персональных данных',
    consentAfter: '',
    submit: 'Отправить заявку',
    success: 'Спасибо! Мы перезвоним в ближайшее время, чтобы подтвердить бронь.',
    errors: {
      name: 'Укажите имя',
      phone: 'Укажите номер телефона полностью',
      studio: 'Выберите филиал',
      date: 'Укажите дату',
      time: 'Укажите время с 15:00 до 01:00',
      consent: 'Нужно согласие на обработку данных',
    },
  },

  // Ichki sahifalar: sarlavha bloklari va matnlar
  pages: {
    home: 'Главная',
    about: {
      seo: 'О нас — Hammersmith',
      eyebrow: 'О нас',
      title: 'Hammersmith',
      accent: 'Steak & Beer',
      text: 'Рестораны-бары в Ташкенте: стейки на гриле, пиво и атмосфера — каждый день с 15:00 до 01:00.',
      cta: 'Забронировать стол',
      valuesEyebrow: 'Что в меню',
      valuesTitle: 'Три вещи,',
      valuesAccent: 'ради которых приходят',
      values: [
        { title: 'Стейки', text: 'Томагавк, рибай, портерхаус, ти-бон, миньон, мачете и другие — на гриле.' },
        { title: 'Пиво', text: 'Разливное и бутылочное: светлое, нефильтрованное, тёмное, пшеничное и безалкогольное.' },
        { title: 'Атмосфера', text: 'Вечер с друзьями, большие сеты на компанию и кухня до часу ночи.' },
      ],
      menuEyebrow: 'Меню',
      menuTitle: 'Гриль, кухня',
      menuAccent: 'и бар',
      menuText: 'Гриль и BBQ, закуски к пиву, салаты HS, супы, паста, рыба, десерты, бар и коктейли.',
      menuLink: 'Открыть меню',
    },
    contacts: {
      seo: 'Контакты — Hammersmith',
      eyebrow: 'Контакты',
      title: 'Контакты',
      accent: 'и филиалы',
      text: 'Звоните, пишите в Instagram или приходите — пять ресторанов в Ташкенте ждут вас каждый день с 15:00 до 01:00.',
      call: 'Телефон',
      route: 'Открыть на карте',
      map: 'Карта филиала',
      cta: 'Позвонить',
      quick: [
        { title: 'Позвонить', text: 'Бронь стола и вопросы по меню' },
        { title: 'Instagram', text: 'Новости, акции и жизнь ресторанов' },
        { title: 'Меню', text: 'Цены и блюда во всех филиалах' },
      ],
      branchesEyebrow: 'Филиалы',
      branchesTitle: 'Приходите',
      branchesAccent: 'в гости',
      marquee: ['Новза', 'Орда', 'Минор', 'Узбум', 'Паркент'],
    },
  },

  // «Tez orada» ekrani (content.js → SOON_PAGES)
  soon: {
    text: 'Страница скоро будет готова.',
    home: 'На главную',
  },

  footer: {
    contactsTitle: 'Контакты',
    salesLabel: 'Телефон:',
    city: 'г. Ташкент',
    openMap: 'открыть на карте',
    hours: 'Ежедневно 15:00 – 01:00',
    copyright: '© 2026 Hammersmith. Все права защищены.',
    about: 'Рестораны-бары в Ташкенте: стейки, пиво и атмосфера.',
    siteTitle: 'Сайт',
    branchesTitle: 'Филиалы',
    madeBy: 'Разработчик сайта:',
    offer: 'Договор оферты',
    privacy: 'Политика конфиденциальности',
  },
}
