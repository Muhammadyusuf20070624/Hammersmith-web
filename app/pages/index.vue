<script setup>
import { ABOUT_STACK, BENEFIT_ICONS, FEATURED_DISHES, HERO_SLIDES, HERO_VIDEO, IMAGES, MENU_PAGE } from '~/utils/content'

// Shisha kartochkadagi kichik doiralar — menyu suratlaridan
const PROOF_AVATARS = ['tomahawk', 'ribs', 'beerset', 'burger'].map((n) => `/images/dish-${n}.jpg`)

const { t, lang } = useLang()

// Yuguruvchi lenta — menyudagi steyklar (nomlari hamma tilda bir xil yoziladi)
const marqueeItems = ['Tomahawk', 'Ribeye', 'T-Bone', 'New York', 'Porterhouse', 'Denver', 'Machete', 'Pork Ribs', 'Craft Beer']

// «Menyudan» bloki: emenu'dan jonli narx va nom (content.js → FEATURED_DISHES)
const { byId, pending: menuPending } = useMenu({ only: FEATURED_DISHES })
const featured = computed(() => FEATURED_DISHES.map((id) => byId.value.get(id)).filter(Boolean))

// «О студии» galereyasi: suratlar + tanlangan tildagi yozuvlar
const aboutPhotos = computed(() => ABOUT_STACK.map((src, i) => ({ src, alt: t.value.about.photos[i], caption: t.value.about.photos[i] })))

// Bosh sarlavha so'zma-so'z chiqadi; urg'u so'zlar (kursiv) ham alohida so'z
const heroWords = computed(() => [
  ...t.value.hero.title.split(' ').map((text) => ({ text, accent: false })),
  ...t.value.hero.titleAccent.split(' ').map((text) => ({ text, accent: true })),
])

// ---- Bosh blok slayderi: har SLIDE_MS da almashadi, sekin kattalashish (Ken Burns).
// Loader yo'qolguncha va sahifa yashirin bo'lsa — to'xtab turadi.
const SLIDE_MS = 6000
const slide = ref(0)
let timer = null

function stop() {
  clearInterval(timer)
  timer = null
}
// Fon videosi: kompyuterda (≥1024px) o'ynaydi; telefonda, «trafikni tejash» va
// «harakatni kamaytirish» rejimlarida — umuman yuklanmaydi, slayder qoladi
const heroVideo = ref(null)
const videoOn = ref(false)

// Fon videosi: kompyuterda — yotiq, telefon/planshetda (≤ 768px) — tik va yengilroq.
// «Trafikni tejash» va «harakatni kamaytirish» rejimlarida yuklanmaydi (suratlar slayderi qoladi).
const videoSrc = ref(null)

function tryVideo() {
  const v = heroVideo.value
  if (!v || navigator.connection?.saveData) return
  videoSrc.value = window.matchMedia('(max-width: 768px)').matches ? HERO_VIDEO.mobile : HERO_VIDEO.desktop
  v.poster = videoSrc.value.poster
  v.innerHTML = `<source src="${videoSrc.value.webm}" type="video/webm"><source src="${videoSrc.value.mp4}" type="video/mp4">`
  v.load()
  v.preload = 'auto'
  v.play().then(() => {
    videoOn.value = true
    stop()
  }).catch(() => {})
}

function start() {
  stop()
  if (videoOn.value) return
  if (document.hidden || document.documentElement.classList.contains('wk-loading')) return
  timer = setInterval(() => { slide.value = (slide.value + 1) % HERO_SLIDES.length }, SLIDE_MS)
}
function goSlide(i) {
  slide.value = i
  start()
}

let mo = null
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  tryVideo()
  start()
  document.addEventListener('visibilitychange', start)
  // loader tugaganda (html'dan wk-loading olinganda) boshlanadi
  mo = new MutationObserver(() => { if (!timer) start() })
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})
onBeforeUnmount(() => {
  stop()
  mo?.disconnect()
  document.removeEventListener('visibilitychange', start)
})

usePageSeo({
  title: () => t.value.seoTitle,
  description: () => t.value.hero.text,
  image: 'home',
})
</script>

<template>
  <div>
    <!-- ===== Bosh blok: yumaloq karta (Aluna uslubida) ===== -->
    <!-- Karta ekran chetidan biroz ichkarida; ichida slayder, matn va burchaklarda
         kichik yozuv, slayd raqamlari va shisha kartochka -->
    <section id="promo" class="hero" :class="{ 'has-video': videoOn }">
      <div class="hero__card">
        <div class="hero__media">
          <img v-for="(s, i) in HERO_SLIDES" :key="s.src" :src="s.src" :alt="t.alt[s.alt]" class="hero__slide"
            :class="{ 'is-active': i === slide }" :style="{ objectPosition: s.position }"
            :fetchpriority="i === 0 ? 'high' : 'auto'" :loading="i === 0 ? 'eager' : 'lazy'" decoding="async" />
          <!-- manba ekranga qarab JS'da qo'yiladi (tryVideo) — keraksiz fayl yuklanmaydi -->
          <video ref="heroVideo" class="hero__video" muted loop playsinline preload="none"
            aria-hidden="true" tabindex="-1" />
        </div>

        <div class="hero__inner container container--wide">
          <p class="hero__kicker rise-in">{{ t.hero.badge }}</p>

          <div class="hero__text">
            <h1 class="hero__title">
              <!-- so'zlar orasida haqiqiy bo'sh joy — matn sifatida ham «На пробное занятие» bo'lib o'qilsin -->
              <template v-for="(w, i) in heroWords" :key="`${lang}-${i}`">
                <span class="hero__word" :class="{ 'accent-italic': w.accent }" :style="{ '--i': i }">{{ w.text }}</span>{{ ' ' }}
              </template>
            </h1>
            <p class="hero__lead rise-in" style="--rise-delay: 420ms">{{ t.hero.text }}</p>
            <div class="hero__ctas rise-in" style="--rise-delay: 540ms">
              <NuxtLink :to="MENU_PAGE" class="btn btn--primary hero__cta">
                {{ t.hero.cta }}
                <span class="hero__cta-icon"><Icon name="arrow" :size="16" /></span>
              </NuxtLink>
              <a href="#form" class="hero__cta2">{{ t.header.cta }}</a>
            </div>
          </div>

          <div class="hero__bottom">
            <div class="hero__bottom-left">
              <div class="hero__dots">
                <button v-for="(s, i) in HERO_SLIDES" :key="s.src" type="button" class="hero__dot"
                  :class="{ 'is-active': i === slide }" :aria-label="`${t.alt.slide} ${i + 1}`" :aria-current="i === slide" @click="goSlide(i)">
                  <span>{{ String(i + 1).padStart(2, '0') }}</span>
                  <i :key="`${slide}-${i}`" class="hero__dot-bar" />
                </button>
              </div>
              <p class="hero__place">{{ t.hero.place }}</p>
            </div>

            <div class="hero__proof rise-in" style="--rise-delay: 700ms">
              <div class="hero__proof-head">
                <span class="hero__avatars" aria-hidden="true">
                  <img v-for="src in PROOF_AVATARS" :key="src" :src="src" alt="" width="34" height="34" loading="lazy" />
                </span>
                <strong>{{ t.hero.proofTitle }}</strong>
              </div>
              <p>{{ t.hero.proofText }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== Ishonch qatori ===== -->
    <TrustStrip :items="t.trust" :label="t.eyebrow.about" />

    <!-- ===== Filiallar (boshliq talabi: bosh sahifada darhol 5 filial) ===== -->
    <StudiosSection />

    <!-- ===== Menyudan: tanlangan taomlar (emenu) ===== -->
    <section class="section featured">
      <div class="container">
        <div v-reveal class="featured__head">
          <div>
            <p class="eyebrow">{{ t.eyebrow.menu }}</p>
            <BigTitle :line1="t.featured.title" :line2="t.featured.titleAccent" />
          </div>
          <div class="featured__aside">
            <p>{{ t.featured.text }}</p>
            <NuxtLink :to="MENU_PAGE" class="btn btn--primary">{{ t.featured.all }} <Icon name="arrow" :size="16" /></NuxtLink>
          </div>
        </div>
        <ul v-if="featured.length" class="featured__grid">
          <li v-for="(d, i) in featured" :key="d.id" v-reveal="i % 4">
            <DishCard :dish="d" />
          </li>
        </ul>
        <ul v-else-if="menuPending" class="featured__grid" aria-hidden="true">
          <li v-for="i in 4" :key="i" class="featured__skeleton" />
        </ul>
      </div>
    </section>

    <!-- ===== Ulkan lenta ===== -->
    <Marquee class="giant-marquee" variant="giant" reverse :duration="60" :items="['Hammersmith', 'Steaks', 'Beer', 'Atmosphere']" />

    <!-- ===== Nega Hammersmith ===== -->
    <section class="section">
      <div class="container">
        <div v-reveal>
          <p class="eyebrow">{{ t.eyebrow.why }}</p>
          <BigTitle :line1="t.why.title" :line2="t.why.titleAccent" />
        </div>
        <div class="benefits">
          <PhotoPlaceholder v-reveal v-scroll-fx class="benefits__photo parallax" ratio="4 / 3" :src="IMAGES.about" :alt="t.about.photos[2]" />
          <ul class="benefits__list">
            <li v-for="(item, i) in t.why.items" :key="i" v-reveal="i + 1" class="benefit">
              <span class="benefit__icon"><Icon :name="BENEFIT_ICONS[i]" :size="22" /></span>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
              <span class="benefit__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ===== Biz haqimizda ===== -->
    <section id="about" class="section about">
      <div class="container">
        <div v-reveal>
          <p class="eyebrow">{{ t.eyebrow.about }}</p>
          <BigTitle :line1="t.about.title" :line2="t.about.titleAccent" />
        </div>
        <div class="about__inner">
          <PhotoStack v-reveal v-scroll-fx class="about__stack" :photos="aboutPhotos" />
          <div v-reveal="1" class="about__text">
            <p v-for="(text, i) in t.about.paragraphs" :key="i">{{ text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== «Yonuvchi matn» ===== -->
    <section class="section statement">
      <div class="container">
        <span class="statement__icon"><Icon name="flame" :size="32" /></span>
        <ScrollText :text="t.statement" />
      </div>
    </section>

    <!-- ===== Yuguruvchi lenta ===== -->
    <Marquee :items="marqueeItems" />

    <LeadForm />
  </div>
</template>

<style lang="scss" scoped>
// ---- Bosh blok: yumaloq karta (Aluna uslubida) ----
.hero {
  --inset: 12px;

  padding: var(--inset) var(--inset) 0;

  @include down($bp-sm) {
    --inset: 8px;
  }
}

.hero__card {
  // iOS Safari: yumaloq burchak ichida scale/transform animatsiyasi paytida ham kesilsin (to'rtburchak burchak chaqnamasin)
  isolation: isolate;
  position: relative;
  display: flex;
  overflow: hidden;
  // header (72px) ostida deyarli butun ekran
  min-height: clamp(560px, calc(100svh - 72px - var(--inset) * 2), 900px);
  border-radius: clamp(20px, 2.4vw, 32px);
  background: var(--deep-2);

  @include down($bp-md) {
    min-height: clamp(560px, calc(100svh - 60px - var(--inset) * 2), 760px);
  }
}

.hero__media {
  position: absolute;
  // o'z qatlami: slaydlar va soya shu ichida qoladi, matn (z-index: 1) ustida turadi
  z-index: 0;
  inset: 0;

  // Chap tomonda va pastda yumshoq to'q soya — oq matn va kartochka o'qilsin
  &::after {
    content: '';
    position: absolute;
    // slaydlar ustida (faol slayd z-index: 1)
    z-index: 2;
    inset: 0;
    background:
      linear-gradient(90deg, rgb(var(--deep-rgb) / 0.66) 0%, rgb(var(--deep-rgb) / 0.32) 42%, rgb(var(--deep-rgb) / 0) 68%),
      linear-gradient(0deg, rgb(var(--deep-rgb) / 0.5) 0%, rgb(var(--deep-rgb) / 0) 38%);

    // telefonda matn butun en bo'ylab — soya ham pastdan yuqoriga, kuchliroq
    @include down($bp-lg) {
      // matn tepada, kartochka pastda — soya ikkala chetda kuchli, o'rtada suratga joy
      background: linear-gradient(180deg, rgb(var(--deep-rgb) / 0.82) 0%, rgb(var(--deep-rgb) / 0.55) 45%, rgb(var(--deep-rgb) / 0.25) 65%, rgb(var(--deep-rgb) / 0.75) 100%);
    }
  }
}

// Video faol slayd (z-index 1) ustida — DOMda undan keyin turadi; soya (z-index 2) esa videoning ustida
.hero__video {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  // ayol kadrning o'ng tomonida — chapdagi matn bilan to'qnashmasin
  object-position: 70% center;
  opacity: 0;
  transition: opacity 0.8s ease;
  pointer-events: none;

  .has-video & {
    opacity: 1;
  }
}

// video o'ynayotganda slayd raqamlari kerak emas
.has-video .hero__dots {
  display: none;
}

// Slaydlar ustma-ust: faoli yumshoq paydo bo'ladi va 7 soniyada sekin yaqinlashadi
.hero__slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.08);
  // so'nib bo'lgach (1.2s) — keyingi safar uchun kattalashtirilgan holatga qaytadi
  transition: opacity 1.2s ease, transform 0s 1.2s;

  &.is-active {
    z-index: 1;
    opacity: 1;
    transform: scale(1);
    transition: opacity 1.2s ease, transform 7s linear;
  }
}

// Karta ichi: tepada kichik yozuv, o'rtada matn, pastda raqamlar va kartochka.
// Chap chekka header logotipi bilan bir chiziqda (karta chekkasi --inset hisobga olinadi)
.hero__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: auto 1fr auto;
  // keng ekranda ham header bilan bir chiziq: karta ichida konteyner ikki chekka (--inset) torroq
  max-width: calc(#{$container-wide} - var(--inset) * 2);
  gap: var(--space-8);
  padding: clamp(28px, 5vw, 72px) calc(var(--wide-pad) - var(--inset)) clamp(24px, 3vw, 40px);
  color: #fff;
}

.hero__kicker {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
}

.hero__text {
  align-self: center;
  max-width: 640px;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(40px, 5.2vw, 82px);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.025em;

  // qorong'i surat ustida urg'u so'z — logotip oltini
  .accent-italic {
    color: var(--accent-on-dark);
  }
}

.hero__word {
  display: inline-block;
  animation: word-in 0.8s var(--ease-out) both;
  animation-delay: calc(var(--i) * 90ms + 80ms);
}

@keyframes word-in {
  from {
    opacity: 0;
    transform: translateY(0.45em);
  }
}

.hero__lead {
  margin-top: var(--space-5);
  max-width: 460px;
  font-size: var(--text-lg);
  color: rgba(255, 255, 255, 0.86);
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-6);
  margin-top: var(--space-8);
}

// ikkinchi harakat — matnli havola (bron formasi)
.hero__cta2 {
  padding-block: var(--space-2);
  font-weight: 600;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  transition: border-color var(--t-fast), color var(--t-fast);

  &:hover {
    color: var(--accent-on-dark);
    border-color: var(--accent-on-dark);
  }
}

// Tugma: matn + alohida doiradagi strelka (Aluna dagi kabi)
.hero__cta {
  padding: 8px 8px 8px 26px;
  gap: var(--space-4);
  font-size: var(--text-base);
}

.hero__cta-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);

  :deep(svg) {
    transition: transform var(--t-hover);
  }
}

// (umumiy .btn:hover svg suradi — bu yerda doira ichida)
.hero__cta:hover .hero__cta-icon :deep(svg) {
  transform: translateX(2px);
}

.hero__bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-6);
}

.hero__bottom-left {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.hero__place {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
}

.hero__dots {
  display: flex;
  gap: var(--space-4);

  @include down($bp-sm) {
    display: none;
  }
}

.hero__dot {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-block: 8px;
  gap: var(--space-2);
  width: 64px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.6);
  transition: color var(--t-fast);

  &.is-active,
  &:hover {
    color: #fff;
  }
}

// progress: faol slaydda SLIDE_MS (6s) davomida to'ladi
.hero__dot-bar {
  position: relative;
  width: 100%;
  height: 2px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.3);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: #fff;
    transform: scaleX(0);
    transform-origin: left;

    .is-active & {
      animation: dot-fill 6s linear forwards;
    }
  }
}

@keyframes dot-fill {
  to {
    transform: scaleX(1);
  }
}

// Shisha kartochka (o'ng past)
.hero__proof {
  max-width: 360px;
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(14px);

  p {
    margin-top: var(--space-3);
    font-size: var(--text-sm);
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.9);
  }

  @include down($bp-md) {
    display: none;
  }
}

.hero__proof-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);

  strong {
    font-size: var(--text-sm);
    font-weight: 600;
  }
}

.hero__avatars {
  display: flex;

  img {
    width: 34px;
    height: 34px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.9);

    & + img {
      margin-left: -10px;
    }
  }
}

// ---- Menyudan: tanlangan taomlar ----
.featured__head {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: var(--space-6);

  @include down($bp-md) {
    grid-template-columns: 1fr;
  }
}

.featured__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  max-width: 340px;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-5);
  margin: var(--space-8) 0 0;
  padding: 0;
  list-style: none;

  @include down($bp-lg) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include down($bp-sm) {
    gap: var(--space-3);
  }
}

.featured__skeleton {
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-lg);
  background: linear-gradient(100deg, var(--surface-soft) 30%, var(--surface) 50%, var(--surface-soft) 70%) 0 0 / 300% 100%;
  animation: shimmer 1.4s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: -150% 0;
  }
}

// ---- «Yonuvchi matn» ----
.statement {
  text-align: center;
}

.statement__icon {
  display: inline-grid;
  margin-bottom: var(--space-6);
  color: var(--accent);
}

// ---- Ulkan lenta ----
.giant-marquee {
  margin-top: var(--space-12);

  @include down($bp-md) {
    margin-top: var(--space-8);
  }
}

// ---- Parallaks: surat o'z ramkasida aylantirishga qarab biroz siljiydi (v-scroll-fx → --p) ----
.parallax :deep(img) {
  transform: translate3d(0, calc(var(--p, 0) * 30px), 0) scale(1.12);
  will-change: transform;
}

// ---- Afzalliklar ----
.benefits {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--space-6);
  margin-top: var(--space-8);

  @include down($bp-lg) {
    grid-template-columns: 1fr;
  }
}

.benefits__photo {
  height: 100%;

  @include down($bp-sm) {
    display: none;
  }
}

.benefits__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // ikki qator bir xil balandlikda — kartochkalar tartibli ko'rinadi
  grid-auto-rows: 1fr;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;

  // telefonda bir ustun — har kartochka o'z matni balandligida (bo'sh joy qolmasin)
  @include down($bp-md) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: var(--space-3);
  }
}

.benefit {
  @include card;
  @include card-hover;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  font-size: var(--text-sm);

  h3 {
    margin-bottom: var(--space-1);
    font-family: var(--font-display);
    font-size: var(--text-lg);
    font-weight: 600;
  }

  p {
    color: var(--text-secondary);
  }

  @include down($bp-md) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.benefit__num {
  position: absolute;
  top: var(--space-4);
  right: var(--space-5);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-style: italic;
  color: var(--border-strong);

  @include down($bp-md) {
    display: none;
  }
}

.benefit__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent);
}

// ---- Biz haqimizda ----
.about__inner {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  align-items: center;
  gap: var(--space-12);
  margin-top: var(--space-10);

  @include down($bp-lg) {
    grid-template-columns: 1fr;
    gap: var(--space-6);
    margin-top: var(--space-6);
  }
}

// zigzag: «Nega Hammersmith»da surat chapda — bu yerda o'ngda.
// Ustma-ust suratlar va galereya — PhotoStack.vue
.about__stack {
  order: 2;
  aspect-ratio: 5 / 4;

  @include down($bp-lg) {
    order: 0;
  }
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  color: var(--text-secondary);
  font-size: var(--text-sm);

  .eyebrow {
    margin-bottom: 0;
  }

  .section-title {
    margin-bottom: var(--space-2);
    color: var(--text);
  }
}

// ================= Telefon (Aluna uslubi) =================
@include down($bp-md) {
  .hero__card {
    min-height: clamp(600px, calc(100svh - 60px - var(--inset) * 2), 720px);
  }

  .hero__inner {
    gap: var(--space-6);
    padding: var(--space-10) var(--space-5) var(--space-5);
  }

  .hero__text {
    align-self: start;
  }

  .hero__title {
    font-size: clamp(34px, 9.6vw, 42px);
    line-height: 1.08;
  }

  // Aluna kabi kam so'z: sarlavha + tugma; batafsil matn pastdagi kartochkada
  .hero__lead {
    display: none;
  }

  .hero__ctas {
    margin-top: var(--space-6);
  }

  .hero__cta {
    padding: 6px 6px 6px 20px;
    font-size: var(--text-sm);
  }

  .hero__cta-icon {
    width: 36px;
    height: 36px;
  }

  .hero__bottom-left {
    display: none;
  }

  // shisha kartochka telefonda ham — butun en bo'ylab, pastda
  .hero__proof {
    display: block;
    max-width: none;
    width: 100%;
    padding: var(--space-4);

    p {
      font-size: var(--text-xs);
    }
  }

  .hero__bottom {
    display: block;
  }

  .hero__video {
    object-position: center;
  }


  .statement__icon {
    margin-bottom: var(--space-4);
  }
}
</style>
