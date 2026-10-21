// Sahifa ichidagi havolalar (#form, #about …).
//
// Oddiy `<a href="#form">` manzil oxiriga #form qo'shadi va sahifa yangilanganda
// brauzer yana shu bo'limga tushib qoladi. Shuning uchun:
// - ichki havola bosilsa — bo'limga silliq aylantiriladi, manzil o'zgarmaydi;
// - sahifa yangilansa — doim tepadan ochiladi (brauzer eski scroll joyini tiklamaydi).
export default defineNuxtPlugin((nuxtApp) => {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

  // Oldingi versiyadan qolgan #... bilan ochilgan bo'lsa — manzilni tozalab, tepaga.
  // Router o'z ishini tugatgach (app:mounted) — aks holda u yana #bo'limga tushiradi
  nuxtApp.hook('app:mounted', async () => {
    const router = useRouter()
    if (!router.currentRoute.value.hash) return
    await router.replace({ hash: '' })
    // html'da scroll-behavior: smooth — bu yerda sakrash bir zumda bo'lsin.
    // Brauzer #bo'limga o'zi sahifa to'liq yuklangach ham sakrashi mumkin — keyin yana tepaga
    const toTop = () => window.scrollTo({ top: 0, behavior: 'instant' })
    toTop()
    if (document.readyState === 'complete') requestAnimationFrame(toTop)
    else window.addEventListener('load', () => requestAnimationFrame(toTop), { once: true })
  })

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = e.target.closest?.('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href').slice(1)
    const target = id && document.getElementById(id)
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})
