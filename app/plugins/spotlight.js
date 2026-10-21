// v-spotlight — kartochka ustida sichqoncha ortidan yuradigan yumshoq yorug'lik.
// Elementga --mx / --my (px) beradi; yorug'likni CSS o'zi chizadi, masalan:
//   background: radial-gradient(320px circle at var(--mx) var(--my), rgb(var(--glow-rgb) / .2), transparent 60%)
// Faqat sichqonchali qurilmalarda; telefonda va «harakatni kamaytirish» rejimida — hech narsa qilmaydi.
export default defineNuxtPlugin((nuxtApp) => {
  const fine = import.meta.client && window.matchMedia('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function onMove(e) {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${Math.round(e.clientX - r.left)}px`)
    el.style.setProperty('--my', `${Math.round(e.clientY - r.top)}px`)
  }

  nuxtApp.vueApp.directive('spotlight', {
    getSSRProps: () => ({}),
    mounted(el) {
      if (!fine) return
      el.classList.add('has-spotlight')
      el.addEventListener('pointermove', onMove, { passive: true })
    },
    beforeUnmount(el) {
      el.removeEventListener('pointermove', onMove)
    },
  })
})
