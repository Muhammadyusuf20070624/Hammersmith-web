// v-reveal — blok ekranga kirganda pastdan silliq paydo bo'ladi.
//
//   <div v-reveal>…</div>          oddiy
//   <li v-reveal="i">…</li>        i-tartib: kartochkalar ketma-ket (100ms qadam)
//
// Qoidalar:
// - Server HTML'ida hech narsa yashirilmaydi (JS ishlamasa ham mazmun ko'rinadi).
// - Ulanish paytida ekranda turgan blok yashirilmaydi — yuklanishda miltillamaydi.
// - «Harakatni kamaytirish» yoqilgan bo'lsa — animatsiya umuman yo'q.
// - Faqat opacity/transform — sahifa tezligiga ta'sir qilmaydi.
const STEP_MS = 100
const MAX_STEPS = 5

export default defineNuxtPlugin((nuxtApp) => {
  let observer = null
  const reduced = import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function getObserver() {
    if (observer) return observer
    observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('is-revealed')
        observer.unobserve(e.target)
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    return observer
  }

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el, { value }) {
      if (reduced || !('IntersectionObserver' in window)) return
      const r = el.getBoundingClientRect()
      // ko'rinmaydigan blok (masalan, telefonda display:none) — tegilmaydi
      if (!r.width && !r.height) return
      if (r.top < window.innerHeight && r.bottom > 0) return

      const step = Number.isFinite(value) ? Math.min(value, MAX_STEPS) : 0
      if (step) el.style.setProperty('--reveal-delay', `${step * STEP_MS}ms`)
      el.classList.add('reveal')
      getObserver().observe(el)
    },
    beforeUnmount(el) {
      observer?.unobserve(el)
    },
  })
})
