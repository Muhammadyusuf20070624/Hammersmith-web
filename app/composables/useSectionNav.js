// Menyu bo'yicha o'tish: { page, hash }.
// - O'sha sahifada bo'lsa — bo'limga silliq aylantiriladi (manzilga # qo'shilmaydi).
// - Boshqa sahifada bo'lsa — avval sahifa ochiladi, so'ng bo'limga aylantiriladi.
// page bo'lmasa — joriy sahifadagi bo'lim (masalan, footer «Kontaktlar» — u har sahifada bor).
export function useSectionNav() {
  const route = useRoute()

  const hrefOf = (item) => (item.page ? item.page + (item.hash ? `#${item.hash}` : '') : `#${item.hash}`)

  async function scrollTo(id) {
    // yangi sahifa chizilib, bo'lim paydo bo'lishini kutamiz
    for (let i = 0; i < 30; i++) {
      const el = document.getElementById(id)
      if (el) return el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      await new Promise((r) => setTimeout(r, 50))
    }
  }

  async function go(item) {
    if (!item.page || route.path === item.page) {
      if (item.hash) return scrollTo(item.hash)
      return window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // router yangi sahifada avval tepaga aylantiradi (router.options) — bo'limga
    // aylantirish sahifa to'liq almashgandan (page:finish) keyin bo'lishi kerak
    const nuxtApp = useNuxtApp()
    const finished = new Promise((resolve) => {
      const off = nuxtApp.hook('page:finish', () => { off(); resolve() })
    })
    await navigateTo(item.page)
    if (!item.hash) return
    await Promise.race([finished, new Promise((r) => setTimeout(r, 1500))])
    await new Promise((r) => setTimeout(r, 60))
    await scrollTo(item.hash)
  }

  return { go, hrefOf }
}
