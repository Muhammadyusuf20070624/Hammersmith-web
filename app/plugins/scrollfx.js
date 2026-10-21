// v-scroll-fx — elementga aylantirish holatini beradi: CSS o'zgaruvchisi --p
//   -1 — element ekranning pastida, 0 — o'rtada, 1 — tepada.
// Uni CSS o'zi ishlatadi (masalan, translateX(calc(var(--p) * 24px))) — parallaks,
// sarlavha qatorlarining siljishi va h.k.
//
// - Bitta scroll tinglovchi + requestAnimationFrame, faqat ekrandagi elementlar hisoblanadi.
// - Server HTML'ida hech narsa qo'shilmaydi; «harakatni kamaytirish» rejimida — o'chiq (--p = 0).
export default defineNuxtPlugin((nuxtApp) => {
  const visible = new Set()
  let io = null
  let ticking = false

  function update() {
    ticking = false
    const vh = window.innerHeight
    for (const el of visible) {
      const r = el.getBoundingClientRect()
      const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / vh))
      el.style.setProperty('--p', p.toFixed(3))
    }
  }

  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(update)
  }

  function setup() {
    if (io) return true
    if (!import.meta.client || !('IntersectionObserver' in window)) return false
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    io = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)
      onScroll()
    }, { rootMargin: '20% 0px' })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return true
  }

  nuxtApp.vueApp.directive('scroll-fx', {
    getSSRProps: () => ({}),
    mounted(el) {
      if (setup()) io.observe(el)
    },
    beforeUnmount(el) {
      visible.delete(el)
      io?.unobserve(el)
    },
  })
})
