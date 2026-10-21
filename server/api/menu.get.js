// Menyu: emenu.uz ochiq API'dan olinadi, saytga kerakli ko'rinishga keltiriladi va keshlanadi.
//
// - Til: ?lang=ru|uz|en → emenu'ga Accept-Language sarlavhasi bilan yuboriladi.
// - Bo'limlar content.js → EMENU.groups bo'yicha (ildiz kategoriya). Ro'yxatda yo'q ildizlar
//   (tamaki, kalyan, idish «boy»i, depozit/test, merch) saytga chiqmaydi.
// - Kesh: 10 daqiqa (stale-while-revalidate) — emenu'da narx o'zgarsa, sayt o'zi yangilanadi,
//   emenu vaqtincha ishlamasa, oxirgi menyu ko'rsatiladi.
import { EMENU } from '~/utils/content'

const LANGS = ['ru', 'uz', 'en']

const media = (url) => (url ? (url.startsWith('http') ? url : EMENU.media + url) : null)

function normalize(data) {
  const cats = (data.categories || []).filter((c) => !EMENU.hiddenCategories.includes(c.id))
  return EMENU.groups.map((g) => {
    // guruhning o'zi (ildiz) ham mahsulotli bo'lishi mumkin (masalan, «Qahva», «BBQ») — u birinchi turadi
    const list = cats
      .filter((c) => g.roots.includes(c.id) || g.roots.includes(c.parent_id))
      .sort((a, b) => (g.roots.includes(b.id) - g.roots.includes(a.id)) || (a.order_num - b.order_num))
      .map((c) => ({
        id: c.id,
        name: c.name.trim(),
        items: (c.products || [])
          .filter((p) => p.is_available !== false && p.price > 0)
          .map((p) => ({
            id: p.id,
            name: p.name.trim(),
            text: (p.composition || p.description || '').trim(),
            price: p.price,
            img: media(p.image_url),
            soldOut: !!p.out_of_stock,
            mins: p.preparation_minutes || null,
          })),
      }))
      .filter((c) => c.items.length)
    return { key: g.key, cats: list }
  }).filter((g) => g.cats.length)
}

export default defineCachedEventHandler(async (event) => {
  const q = getQuery(event)
  const lang = LANGS.includes(q.lang) ? q.lang : 'ru'
  try {
    const data = await $fetch(EMENU.api + EMENU.branchId, {
      headers: { 'Accept-Language': lang },
      timeout: 10000,
    })
    return { lang, updated: new Date().toISOString(), groups: normalize(data) }
  } catch (e) {
    throw createError({ statusCode: 502, statusMessage: 'Menu source unavailable' })
  }
}, {
  name: 'emenu',
  maxAge: 60 * 10,
  swr: true,
  getKey: (event) => {
    const lang = getQuery(event).lang
    return LANGS.includes(lang) ? lang : 'ru'
  },
})
