// Maxfiylik siyosati matni (3 tilda). Sayt aslida yig'adigan ma'lumotlarga mos:
// stol bron qilish formasi (ism, telefon, filial, sana, vaqt, mehmonlar soni, izoh) va cookie (lang — til).
// Shaxsiy kabinet, to'lov, SMS yo'q. Analitika/reklama trekeri yo'q — qo'shilsa, «cookies» bo'limi yangilanadi.
// Huquqiy asos — O'zbekiston Respublikasining «Shaxsga doir ma'lumotlar to'g'risida»gi Qonuni (O'RQ-547, 02.07.2019).
// Matn namuna: e'lon qilishdan oldin restoran yuristi ko'rib chiqishi kerak.
//
// body: satr — xatboshi; { list: [...] } — ro'yxat.

export const PRIVACY_UPDATED = '20.10.2026'

export const PRIVACY = {
  ru: {
    seo: 'Политика конфиденциальности — Hammersmith',
    eyebrow: 'Документы',
    title: 'Политика',
    accent: 'конфиденциальности',
    lead: 'Как мы собираем, используем и защищаем данные, которые вы оставляете на сайте при бронировании стола.',
    updated: 'Редакция от',
    toc: 'Содержание',
    summaryTitle: 'Коротко',
    summary: [
      { icon: 'shield', text: 'Мы не продаём и не передаём ваши данные для рекламы.' },
      { icon: 'pin', text: 'Данные хранятся на серверах в Узбекистане, как требует закон.' },
      { icon: 'check', text: 'Вы можете в любой момент узнать, исправить или удалить свои данные.' },
    ],
    legalTitle: 'Реквизиты оператора',
    legalLabels: { company: 'Организация', inn: 'ИНН', address: 'Юридический адрес', email: 'E-mail' },
    sections: [
      {
        id: 'general',
        title: 'Общие положения',
        body: [
          'Настоящая политика описывает, как сеть ресторанов Hammersmith (далее — «Ресторан», «мы») обрабатывает персональные данные посетителей сайта и гостей, которые бронируют стол.',
          'Политика разработана в соответствии с Законом Республики Узбекистан «О персональных данных» и применяется ко всем данным, которые вы оставляете на сайте и при звонке в ресторан.',
          'Отправляя форму бронирования, вы подтверждаете, что ознакомились с политикой и даёте согласие на обработку данных на описанных условиях.',
        ],
      },
      {
        id: 'data',
        title: 'Какие данные мы собираем',
        body: [
          'Мы собираем только то, что нужно для бронирования стола:',
          { list: [
            'Форма бронирования: имя, номер телефона, выбранный филиал, дата и время визита, количество гостей, пожелания к брони.',
            'Технические данные: язык сайта, IP-адрес, тип браузера и устройства, время посещения — их автоматически фиксирует сервер.',
          ] },
          'Мы не запрашиваем на сайте паспортные данные и данные банковских карт.',
        ],
      },
      {
        id: 'purposes',
        title: 'Зачем мы их используем',
        body: [
          { list: [
            'Связаться с вами и подтвердить, изменить или отменить бронь.',
            'Подготовить стол в выбранном филиале к вашему визиту.',
            'Улучшать работу сайта и качество обслуживания.',
            'Выполнять требования законодательства Республики Узбекистан.',
          ] },
          'Рекламные сообщения мы отправляем только с вашего отдельного согласия; от них можно отказаться в любой момент.',
        ],
      },
      {
        id: 'legal',
        title: 'Основания обработки',
        body: [
          'Мы обрабатываем данные на основании вашего согласия, а также когда это необходимо для исполнения вашей брони и для выполнения обязанностей, установленных законом.',
          'Согласие можно отозвать в любой момент — после этого мы прекратим обработку, кроме случаев, когда хранение данных требует закон.',
        ],
      },
      {
        id: 'cookies',
        title: 'Файлы cookie',
        body: [
          'Сайт использует только необходимый cookie:',
          { list: [
            'lang — запоминает выбранный язык сайта (до 1 года).',
          ] },
          'Рекламных и аналитических cookie сейчас нет. Если они появятся, мы обновим этот раздел. Cookie можно удалить в настройках браузера — тогда сайт забудет выбранный язык.',
        ],
      },
      {
        id: 'storage',
        title: 'Хранение и защита',
        body: [
          'Персональные данные граждан Узбекистана хранятся на серверах, расположенных на территории Республики Узбекистан, как этого требует закон.',
          'Мы храним данные не дольше, чем это нужно для целей обработки, или до отзыва согласия, если более долгий срок не установлен законом.',
          'Доступ к данным есть только у сотрудников, которым он нужен для работы. Мы применяем технические и организационные меры защиты от утраты, несанкционированного доступа и изменения данных.',
        ],
      },
      {
        id: 'sharing',
        title: 'Передача третьим лицам',
        body: [
          'Мы не продаём персональные данные. Передаём их только в объёме, необходимом для работы сервисов:',
          { list: [
            'хостинг-провайдеру, на серверах которого работает сайт;',
            'государственным органам — только в случаях, предусмотренных законом.',
          ] },
          'Меню на сайте загружается из сервиса электронного меню emenu.uz; при этом ваши персональные данные ему не передаются.',
        ],
      },
      {
        id: 'rights',
        title: 'Ваши права',
        body: [
          'Вы вправе:',
          { list: [
            'узнать, какие ваши данные мы обрабатываем и зачем;',
            'потребовать исправить неточные данные;',
            'потребовать удалить данные или ограничить их обработку;',
            'отозвать согласие на обработку и отказаться от рассылок.',
          ] },
          'Чтобы воспользоваться правами, позвоните нам или напишите в Instagram. Мы ответим в сроки, установленные законом.',
        ],
      },
      {
        id: 'changes',
        title: 'Изменения политики',
        body: [
          'Мы можем обновлять политику, например при появлении новых функций сайта. Актуальная редакция всегда доступна на этой странице, дата обновления указана в её начале.',
        ],
      },
      {
        id: 'contacts',
        title: 'Контакты',
        body: [
          'По вопросам обработки персональных данных обращайтесь:',
        ],
      },
    ],
    contactPhone: 'Телефон',
    contactInstagram: 'Instagram',
    contactBranches: 'Филиалы',
  },

  uz: {
    seo: 'Maxfiylik siyosati — Hammersmith',
    eyebrow: 'Hujjatlar',
    title: 'Maxfiylik',
    accent: 'siyosati',
    lead: "Stol bron qilishda saytda qoldirgan ma'lumotlaringizni qanday yig'ishimiz, ishlatishimiz va himoya qilishimiz haqida.",
    updated: 'Tahrir sanasi',
    toc: 'Mundarija',
    summaryTitle: 'Qisqacha',
    summary: [
      { icon: 'shield', text: "Ma'lumotlaringizni sotmaymiz va reklama uchun bermaymiz." },
      { icon: 'pin', text: "Ma'lumotlar qonun talabiga ko'ra O'zbekistondagi serverlarda saqlanadi." },
      { icon: 'check', text: "Istalgan vaqtda ma'lumotlaringizni bilishingiz, tuzatishingiz yoki o'chirishingiz mumkin." },
    ],
    legalTitle: 'Operator rekvizitlari',
    legalLabels: { company: 'Tashkilot', inn: 'STIR', address: 'Yuridik manzil', email: 'E-mail' },
    sections: [
      {
        id: 'general',
        title: 'Umumiy qoidalar',
        body: [
          "Ushbu siyosat Hammersmith restoranlar tarmog'i (bundan buyon — «Restoran», «biz») sayt foydalanuvchilari va stol bron qiluvchi mehmonlarning shaxsga doir ma'lumotlarini qanday qayta ishlashini tavsiflaydi.",
          "Siyosat O'zbekiston Respublikasining «Shaxsga doir ma'lumotlar to'g'risida»gi Qonuniga muvofiq ishlab chiqilgan va saytda hamda restoranga qo'ng'iroq qilganda qoldirgan barcha ma'lumotlarga taalluqli.",
          "Bron formasini yuborib, siz siyosat bilan tanishganingizni va ma'lumotlaringizni shu shartlarda qayta ishlashga rozilik berganingizni tasdiqlaysiz.",
        ],
      },
      {
        id: 'data',
        title: "Qanday ma'lumotlarni yig'amiz",
        body: [
          "Faqat stol bron qilish uchun keraklisini yig'amiz:",
          { list: [
            "Bron formasi: ism, telefon raqami, tanlangan filial, tashrif sanasi va vaqti, mehmonlar soni, bron bo'yicha istaklar.",
            "Texnik ma'lumotlar: sayt tili, IP-manzil, brauzer va qurilma turi, tashrif vaqti — ularni server avtomatik qayd etadi.",
          ] },
          "Saytda pasport va bank kartasi ma'lumotlarini so'ramaymiz.",
        ],
      },
      {
        id: 'purposes',
        title: 'Ulardan nima uchun foydalanamiz',
        body: [
          { list: [
            "Siz bilan bog'lanish va bronni tasdiqlash, o'zgartirish yoki bekor qilish.",
            'Tanlangan filialda tashrifingizga stol tayyorlash.',
            'Sayt ishini va xizmat sifatini yaxshilash.',
            "O'zbekiston Respublikasi qonunchiligi talablarini bajarish.",
          ] },
          "Reklama xabarlarini faqat alohida roziligingiz bilan yuboramiz; ulardan istalgan vaqtda voz kechish mumkin.",
        ],
      },
      {
        id: 'legal',
        title: 'Qayta ishlash asoslari',
        body: [
          "Ma'lumotlarni roziligingiz asosida, shuningdek bronni bajarish va qonunda belgilangan majburiyatlarni bajarish uchun zarur bo'lganda qayta ishlaymiz.",
          "Rozilikni istalgan vaqtda qaytarib olishingiz mumkin — shundan so'ng, qonun saqlashni talab qiladigan holatlardan tashqari, qayta ishlashni to'xtatamiz.",
        ],
      },
      {
        id: 'cookies',
        title: 'Cookie fayllari',
        body: [
          'Sayt faqat zarur cookie dan foydalanadi:',
          { list: [
            'lang — tanlangan sayt tilini eslab qoladi (1 yilgacha).',
          ] },
          "Hozir reklama va analitika cookie lari yo'q. Ular paydo bo'lsa, ushbu bo'limni yangilaymiz. Cookie ni brauzer sozlamalarida o'chirish mumkin — shunda sayt tanlangan tilni unutadi.",
        ],
      },
      {
        id: 'storage',
        title: 'Saqlash va himoya',
        body: [
          "O'zbekiston fuqarolarining shaxsga doir ma'lumotlari qonun talabiga ko'ra O'zbekiston Respublikasi hududidagi serverlarda saqlanadi.",
          "Ma'lumotlarni qayta ishlash maqsadlari uchun zarur bo'lgan muddatdan yoki rozilik qaytarib olinguncha uzoq saqlamaymiz, agar qonunda uzoqroq muddat belgilanmagan bo'lsa.",
          "Ma'lumotlarga faqat ish uchun zarur bo'lgan xodimlar kira oladi. Ma'lumotlarni yo'qotish, ruxsatsiz kirish va o'zgartirishdan himoya qilish uchun texnik va tashkiliy choralar ko'ramiz.",
        ],
      },
      {
        id: 'sharing',
        title: 'Uchinchi shaxslarga berish',
        body: [
          "Shaxsga doir ma'lumotlarni sotmaymiz. Ularni faqat xizmatlar ishlashi uchun zarur hajmda beramiz:",
          { list: [
            'sayt ishlaydigan serverlar egasi — xosting-provayderga;',
            "davlat organlariga — faqat qonunda nazarda tutilgan hollarda.",
          ] },
          "Saytdagi menyu emenu.uz elektron menyu xizmatidan yuklanadi; bunda shaxsga doir ma'lumotlaringiz unga berilmaydi.",
        ],
      },
      {
        id: 'rights',
        title: 'Sizning huquqlaringiz',
        body: [
          'Siz quyidagilarga haqlisiz:',
          { list: [
            "qaysi ma'lumotlaringiz va nima uchun qayta ishlanayotganini bilish;",
            "noto'g'ri ma'lumotlarni tuzatishni talab qilish;",
            "ma'lumotlarni o'chirish yoki qayta ishlashni cheklashni talab qilish;",
            "qayta ishlashga rozilikni qaytarib olish va xabarnomalardan voz kechish.",
          ] },
          "Huquqlardan foydalanish uchun bizga qo'ng'iroq qiling yoki Instagram'da yozing. Qonunda belgilangan muddatlarda javob beramiz.",
        ],
      },
      {
        id: 'changes',
        title: "Siyosatdagi o'zgarishlar",
        body: [
          "Siyosatni yangilashimiz mumkin, masalan saytda yangi imkoniyatlar paydo bo'lganda. Amaldagi tahrir doim shu sahifada, yangilangan sana uning boshida ko'rsatilgan.",
        ],
      },
      {
        id: 'contacts',
        title: 'Aloqa',
        body: [
          "Shaxsga doir ma'lumotlarni qayta ishlash bo'yicha murojaat uchun:",
        ],
      },
    ],
    contactPhone: 'Telefon',
    contactInstagram: 'Instagram',
    contactBranches: 'Filiallar',
  },

  en: {
    seo: 'Privacy policy — Hammersmith',
    eyebrow: 'Documents',
    title: 'Privacy',
    accent: 'policy',
    lead: 'How we collect, use and protect the data you leave on the website when booking a table.',
    updated: 'Last updated',
    toc: 'Contents',
    summaryTitle: 'In short',
    summary: [
      { icon: 'shield', text: 'We do not sell your data or share it for advertising.' },
      { icon: 'pin', text: 'Data is stored on servers in Uzbekistan, as required by law.' },
      { icon: 'check', text: 'You can request access to, correction or deletion of your data at any time.' },
    ],
    legalTitle: 'Data controller details',
    legalLabels: { company: 'Company', inn: 'TIN', address: 'Registered address', email: 'E-mail' },
    sections: [
      {
        id: 'general',
        title: 'General provisions',
        body: [
          'This policy describes how the Hammersmith restaurant chain (the «Restaurant», «we») processes the personal data of website visitors and guests who book a table.',
          'The policy follows the Law of the Republic of Uzbekistan «On Personal Data» and applies to all data you leave on the website or when calling the restaurant.',
          'By submitting the booking form, you confirm that you have read this policy and consent to the processing of your data on these terms.',
        ],
      },
      {
        id: 'data',
        title: 'What data we collect',
        body: [
          'We only collect what is needed to book a table:',
          { list: [
            'Booking form: name, phone number, chosen location, date and time of visit, number of guests, booking notes.',
            'Technical data: site language, IP address, browser and device type, time of visit — recorded automatically by the server.',
          ] },
          'We do not ask for passport details or bank card data on the website.',
        ],
      },
      {
        id: 'purposes',
        title: 'Why we use it',
        body: [
          { list: [
            'To contact you and confirm, change or cancel your booking.',
            'To prepare a table at your chosen location.',
            'To improve the website and the quality of service.',
            'To comply with the laws of the Republic of Uzbekistan.',
          ] },
          'We only send marketing messages with your separate consent; you can opt out at any time.',
        ],
      },
      {
        id: 'legal',
        title: 'Legal basis',
        body: [
          'We process data based on your consent, and where necessary to fulfil your booking and meet our legal obligations.',
          'You can withdraw consent at any time — we will then stop processing, except where the law requires us to keep the data.',
        ],
      },
      {
        id: 'cookies',
        title: 'Cookies',
        body: [
          'The website only uses an essential cookie:',
          { list: [
            'lang — remembers the selected site language (up to 1 year).',
          ] },
          'There are no advertising or analytics cookies at the moment. If that changes, we will update this section. You can delete cookies in your browser settings — the site will then forget your language choice.',
        ],
      },
      {
        id: 'storage',
        title: 'Storage and security',
        body: [
          'Personal data of citizens of Uzbekistan is stored on servers located in the Republic of Uzbekistan, as required by law.',
          'We keep data no longer than needed for the purposes of processing, or until consent is withdrawn, unless the law requires a longer period.',
          'Only staff who need the data for their work have access to it. We apply technical and organisational measures to protect it from loss, unauthorised access and alteration.',
        ],
      },
      {
        id: 'sharing',
        title: 'Sharing with third parties',
        body: [
          'We do not sell personal data. We only share it to the extent needed for services to work:',
          { list: [
            'with the hosting provider whose servers run the website;',
            'with government authorities — only where required by law.',
          ] },
          'The menu on the website is loaded from the emenu.uz digital menu service; your personal data is not shared with it.',
        ],
      },
      {
        id: 'rights',
        title: 'Your rights',
        body: [
          'You have the right to:',
          { list: [
            'know what data we process about you and why;',
            'ask us to correct inaccurate data;',
            'ask us to delete your data or restrict its processing;',
            'withdraw consent and unsubscribe from messages.',
          ] },
          'To exercise your rights, call us or message us on Instagram. We will reply within the time limits set by law.',
        ],
      },
      {
        id: 'changes',
        title: 'Changes to this policy',
        body: [
          'We may update this policy, for example when new website features appear. The current version is always available on this page, with the date of the last update at the top.',
        ],
      },
      {
        id: 'contacts',
        title: 'Contacts',
        body: [
          'For questions about personal data processing, contact us:',
        ],
      },
    ],
    contactPhone: 'Phone',
    contactInstagram: 'Instagram',
    contactBranches: 'Locations',
  },
}
