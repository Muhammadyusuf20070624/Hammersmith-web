// Hammersmith — steak-house va pab tarmog'i sayti.
// Tuzilish BiletMax saytidagi bilan bir xil: app/ ichida sahifalar, layout,
// komponentlar (global / reusable / ui), SCSS tokenlar va mixinlar.
// Sayt domeni: OG rasm, og:url va canonical shu manzil bilan yoziladi (messenjerlar nisbiy yo'lni o'qimaydi).
// DOMEN HALI KELISHILMAGAN: serverda NUXT_PUBLIC_SITE_URL beriladi (zaxira qiymat — vaqtinchalik).
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://hammersmith.uz'

// Playfair Display — katta sarlavhalar (klassik London pab/brasseri uslubi, kirill bor);
// Onest — oddiy matn, tugma, menyu
const fontsHref = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Onest:wght@300..600&display=swap'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-09',
  // dev rejimida pastda chiqadigan Nuxt DevTools paneli kerak emas
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      siteUrl,
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Hammersmith — стейки, пиво и атмосфера',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#F8F3EC' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo-64.png' },
        { rel: 'apple-touch-icon', href: '/images/logo-128.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: fontsHref },
      ],
    },
  },
  // Eski manzillar — 301 bilan mos sahifaga (tarqalgan havolalar buzilmasin)
  routeRules: {
    '/classes': { redirect: { to: '/menu', statusCode: 301 } },
    '/offers': { redirect: { to: '/', statusCode: 301 } },
    '/coaches': { redirect: { to: '/about', statusCode: 301 } },
    '/login': { redirect: { to: '/', statusCode: 301 } },
    '/profile': { redirect: { to: '/', statusCode: 301 } },
    '/profile/**': { redirect: { to: '/', statusCode: 301 } },
  },
  // Komponentlar papka prefiksisiz: <SiteHeader>, <PriceCard>, <Icon> (BiletMax'dagidek)
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['@/assets/scss/main.scss'],
  // iOS/Android: teginishdan keyin :hover holati «qotib» qoladi (kartochka ko'tarilgan, ikonka burilgan holda turadi).
  // Plagin barcha :hover qoidalarini build paytida @media (hover: hover) ichiga o'raydi — sichqonchada o'zgarishsiz
  postcss: { plugins: { 'postcss-hover-media-feature': {} } },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *; @use "@/assets/scss/_mixins.scss" as *;',
        },
      },
    },
  },
})
