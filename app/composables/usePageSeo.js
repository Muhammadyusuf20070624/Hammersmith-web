// Sahifa SEO va OpenGraph (Telegram, WhatsApp, Facebook, X kartochkasi uchun):
// sarlavha, tavsif, to'liq manzil (og:url + canonical) va sahifa rasmi (public/images/og/<image>.jpg, 1200×630).
// Manzillar to'liq bo'lishi shart — messenjerlar nisbiy yo'lni o'qimaydi; domen NUXT_PUBLIC_SITE_URL dan.
// Umumiy teglar (sayt nomi, til, kartochka turi) — app.vue da.
export function usePageSeo({ title, description, image = 'home' }) {
  const { siteUrl } = useRuntimeConfig().public
  const route = useRoute()
  const url = computed(() => siteUrl + route.path)
  const img = `${siteUrl}/images/og/${image}.jpg`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: img,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageType: 'image/jpeg',
    ogImageAlt: title,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: img,
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
