// app/utils/content.js — tilga bog'liq bo'lmagan ma'lumotlar: havolalar,
// rasmlar, telefon, filiallar, menyu manbasi.
//
// Matnlar app/locales/{ru,uz,en}.js da — komponentlar ularni useLang() dan oladi.
// Bu yerdagi `key` lar locale fayllaridagi kalitlarga mos keladi.

// VAQTINCHALIK: dizayn variantlari paneli (rang/shrift). Variant tanlangach — false
export const THEME_PANEL = true

export const BRAND = { name: 'Hammersmith', tagline: 'Steaks · Beer · Atmosphere', logo: '/images/logo-128.png' }

// Asosiy raqam: emenu'dagi «Markaziy ofis» telefoni. TASDIQLANISHI KERAK — call-markaz raqami
// boshqa bo'lsa, shu yerda almashtiriladi
export const PHONE = { label: '+998 71 202-00-99', href: 'tel:+998712020099' }

// Ish vaqti — Instagram profilida: har kuni 15:00–01:00 (barcha filiallarda bir xil deb olingan;
// biror filialda farq qilsa — o'sha filialga `hours` yoziladi)
export const HOURS = '15:00 – 01:00'

// Menyu (nomlari locale'dagi `nav` da). page — sahifa, hash — bo'lim
export const LANDING = '/'
export const MENU_PAGE = '/menu'
// VAQTINCHA «Tez orada»: shu sahifalar o'rniga ComingSoon ekrani chiqadi (sahifa kodi joyida).
// Sahifani ochish uchun — ro'yxatdan o'chiriladi. Kalit — locale'dagi nav nomi
export const SOON_PAGES = { '/menu': 'menu', '/about': 'about', '/contacts': 'contacts' }

export const NAV = [
  { key: 'menu', page: MENU_PAGE },
  { key: 'branches', page: LANDING, hash: 'studios' },
  { key: 'about', page: '/about' },
  { key: 'contacts', page: '/contacts' },
]

// Rasmlar — public/images/ dagi fayllar. Fayl hali qo'yilmagan bo'lsa,
// o'rnida yumshoq joy ushlagich chiqadi (PhotoPlaceholder).
// dish-* — emenu.uz dagi Hammersmith menyusi suratlari; hero-grill-* — hero videosidan kadrlar
const IMG = '/images/'
export const IMAGES = {
  hero: IMG + 'hero-grill-1.jpg',
  about: IMG + 'dish-grillset.jpg',
  cta: IMG + 'hero-grill-2.jpg',
}

// Filiallar (emenu.uz → branches, restaurant_id = 1). Nomi/manzili locale'dagi studios.branches da.
// phone — filialning o'z raqami (bo'lmasa umumiy PHONE ko'rsatiladi).
// photos — VAQTINCHA bo'sh: filial suratlari kelganda public/images/branch-<key>-1.jpg, -2.jpg qo'yiladi
// va shu ro'yxatga yoziladi; ungacha brend rangidagi joy ushlagich chiqadi.
const yandex = (q) => 'https://yandex.uz/maps/?text=' + encodeURIComponent('Hammersmith, Ташкент, ' + q)
export const STUDIO_GALLERY = [
  { key: 'novza', map: yandex('улица Мукими, 21'), mapQuery: 'Ташкент, улица Мукими, 21', phone: null, photos: [] },
  { key: 'orda', map: yandex('улица Шайхантахур, 29'), mapQuery: 'Ташкент, улица Шайхантахур, 29', phone: { label: '+998 99 099-97-89', href: 'tel:+998990999789' }, photos: [] },
  { key: 'minor', map: yandex('проспект Амира Темура, 62'), mapQuery: 'Ташкент, проспект Амира Темура, 62', phone: null, photos: [] },
  { key: 'uzbum', map: yandex('Фаргона йули, 44'), mapQuery: 'Ташкент, Фаргона йули, 44', phone: null, photos: [] },
  { key: 'parkent', map: yandex('улица Султанали Машхади, 52'), mapQuery: 'Ташкент, улица Султанали Машхади, 52', phone: null, photos: [] },
]
export const STUDIOS = STUDIO_GALLERY.map((b) => b.key)

// Bosh blok fon videosi. Manba: Pexels, Denys Gromov —
// https://www.pexels.com/video/close-up-shot-of-grilled-steak-6577410/
// (Pexels litsenziyasi: tijoratda bepul, muallifni ko'rsatish shart emas).
// To'liq 9,5 s, ovozsiz: 1920px WebM (VP9, ~1.2 MB) + MP4 (H.264, ~1.4 MB) — brauzer mosini oladi.
// Restoranning o'z videosi kelsa — shu fayllar almashtiriladi.
export const HERO_VIDEO = {
  desktop: { webm: '/videos/hero.webm', mp4: '/videos/hero.mp4', poster: IMG + 'hero-video-poster.jpg' },
  // telefon: o'sha video, tik (720×1280) kesilgan — steyk kadr markazida, ~0.6–0.7 MB
  mobile: { webm: '/videos/hero-mobile.webm', mp4: '/videos/hero-mobile.mp4', poster: IMG + 'hero-video-poster-mobile.jpg' },
}

// Bosh blok slayderi (video o'ynamaganda): surat, alt kaliti (locale'dagi alt.*), kadrning ko'rinadigan qismi
export const HERO_SLIDES = [
  { src: IMG + 'hero-grill-1.jpg', alt: 'hero', position: 'center 45%' },
  { src: IMG + 'hero-grill-2.jpg', alt: 'heroGrill', position: 'center 50%' },
  { src: IMG + 'hero-grill-3.jpg', alt: 'heroFire', position: '40% 50%' },
]

// «Biz haqimizda»: ustma-ust 3 ta surat — aylantirganda yelpig'ichdek yoyiladi (oxirgisi — eng oldida)
export const ABOUT_STACK = [IMG + 'dish-beerset.jpg', IMG + 'dish-tomahawk.jpg', IMG + 'dish-grillset.jpg']

// Bosh sahifadagi «Menyudan» bloki: emenu mahsulot id lari (surati bor, brend taomlari).
// Narx va nom emenu'dan jonli olinadi; mahsulot menyudan olib tashlansa — kartochka chiqmaydi
export const FEATURED_DISHES = [136, 114, 156, 180, 175, 354, 152, 640]

// Menyu manbasi: emenu.uz ochiq API. Menyu hamma filialda bir xil — bitta filial (Novza) olinadi.
// Til Accept-Language sarlavhasi bilan tanlanadi (ru / uz / en). Server orqali, keshlanadi — server/api/menu.get.js
export const EMENU = {
  api: 'https://api.emenu.uz/api/v1/public/menu/',
  branchId: 2,
  media: 'https://api.emenu.uz',
  // Saytdagi bo'limlar: emenu'dagi ildiz kategoriyalar (parent_id) bo'yicha.
  // Ro'yxatda yo'q ildizlar (tamaki, kalyan, idish-tovoq «boy»i, depozit/test, merch, yozgi bar) — saytga chiqmaydi
  groups: [
    { key: 'grill', roots: [49] },
    { key: 'kitchen', roots: [78] },
    { key: 'bar', roots: [79] },
    { key: 'drinks', roots: [81] },
    { key: 'coffee', roots: [62] },
  ],
  // guruh ichida bo'lsa ham chiqmaydigan ichki kategoriyalar: «Кофе Стаф» (xodimlar uchun)
  hiddenCategories: [65],
}

export const BENEFIT_ICONS = ['flame', 'beer', 'clock', 'pin']

// Oferta shartnomasi havolasi kelganda shu yerga yoziladi.
// Bo'sh bo'lsa — formada matn havolasiz, footerda havola chiqmaydi
export const OFFER_HREF = ''

// Maxfiylik siyosati sahifasi (footer va forma roziligida havola)
export const PRIVACY_PAGE = '/privacy'

// Restoranning yuridik rekvizitlari — maxfiylik siyosatida «operator» sifatida ko'rsatiladi.
// Olinganda to'ldiriladi; bo'sh maydon sahifada chiqmaydi (taxminiy ma'lumot yozilmaydi)
export const LEGAL = { company: '', inn: '', address: '', email: '' }

export const INSTAGRAM = { handle: '@hammersmith.uz', href: 'https://www.instagram.com/hammersmith.uz/' }

export const FOOTER = {
  // Ijtimoiy tarmoqlar. Instagram — rasmiy; qolganlarining havolasi kelganda href yoziladi
  // (bo'sh bo'lsa — ikonka ko'rinadi, lekin bosilmaydi: taxminiy havola qo'yilmaydi)
  socials: [
    { icon: 'instagram', label: 'Instagram ' + INSTAGRAM.handle, href: INSTAGRAM.href },
    { icon: 'telegram', label: 'Telegram', href: '' },
    { icon: 'facebook', label: 'Facebook', href: '' },
  ],
}
