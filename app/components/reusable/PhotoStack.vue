<script setup>
// Ustma-ust suratlar + galereya.
//
// 1) Joyida: 3 ta surat ustma-ust; aylantirganda yelpig'ichdek yoyiladi (--p, v-scroll-fx),
//    sichqoncha ustida — ko'proq yoyiladi va kursor ortidan biroz egiladi.
// 2) Bosilganda: suratlar joyidan uchib chiqib, ekran o'rtasida katta yelpig'ich bo'ladi (FLIP).
// 3) Bittasi bosilsa — to'liq ko'rinish (← → bilan almashadi), «Barcha suratlar» — qaytadi.
// 4) Yopilganda (✕, Esc, fon) — suratlar uchib joyiga qaytadi.
// «Harakatni kamaytirish» rejimida uchish animatsiyalari yo'q, faqat ko'rsatish/yashirish.
const props = defineProps({
  // [{ src, alt, caption }]
  photos: { type: Array, required: true },
})

const { t } = useLang()
const stack = ref(null)
const closeBtn = ref(null)
const open = ref(false)
const closing = ref(false)
const active = ref(-1)
let cards = []
let lastFocus = null

const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)'
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const n = computed(() => props.photos.length)

// ---- joyidagi suratlar: kursor ortidan egilish ----
function onMove(e) {
  const el = stack.value
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
  el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
}
function onLeave() {
  stack.value?.style.setProperty('--mx', 0)
  stack.value?.style.setProperty('--my', 0)
}

// ---- FLIP: joyidagi kartadan galereyadagi o'rniga (yoki teskari) ----
// Har bir kartaning holati: markazi (ekranda), haqiqiy eni, burilish burchagi va masshtabi.
// getBoundingClientRect qiyshiq kartada kattaroq «quti» beradi — shuning uchun eni
// offsetWidth dan, burchak va masshtab esa transform matritsasidan olinadi
function angleScale(el) {
  const m = new DOMMatrix(getComputedStyle(el).transform)
  return { a: Math.atan2(m.b, m.a) * 180 / Math.PI, k: Math.hypot(m.a, m.b) }
}
function geom(el, rotEl = el) {
  const r = el.getBoundingClientRect()
  const { a, k } = angleScale(rotEl)
  return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, w: el.offsetWidth * (rotEl === el ? k : 1), a }
}
function stackGeoms() {
  return [...stack.value.querySelectorAll('.ps-stack__card')].map((el) => geom(el))
}
function fly(from, back) {
  return cards.map((el, i) => {
    if (!el || !from[i]) return null
    const item = el.parentElement
    const to = geom(el, item)
    const k = angleScale(item).k || 1
    // karta yelpig'ichdagi burilgan konteyner ichida — ekrandagi siljishni
    // konteyner burchagiga teskari aylantirib, uning o'lchamiga bo'lamiz
    const rad = (-to.a * Math.PI) / 180
    const ex = from[i].cx - to.cx
    const ey = from[i].cy - to.cy
    const dx = (ex * Math.cos(rad) - ey * Math.sin(rad)) / k
    const dy = (ex * Math.sin(rad) + ey * Math.cos(rad)) / k
    const s = from[i].w / (el.offsetWidth * k)
    const rot = from[i].a - to.a
    const at = { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${s})` }
    // qaytishda aynan joyidagi karta holatiga tushadi — so'ng galereya yopilib, haqiqiy karta ochiladi
    const frames = back ? [{ transform: 'none' }, at] : [at, { transform: 'none' }]
    return el.animate(frames, {
      duration: back ? 560 : 680,
      delay: (back ? n.value - 1 - i : i) * 50,
      easing: EASE,
      fill: 'both',
    })
  }).filter(Boolean)
}

async function openGallery() {
  lastFocus = document.activeElement
  const from = stackGeoms()
  cards = []
  active.value = -1
  open.value = true
  document.documentElement.style.overflow = 'hidden'
  await nextTick()
  closeBtn.value?.focus({ preventScroll: true })
  if (!reduced()) fly(from, false).forEach((a) => a.finished.then(() => a.cancel()).catch(() => {}))
}

async function closeGallery() {
  if (closing.value) return
  closing.value = true
  if (active.value >= 0) {
    active.value = -1
    await new Promise((r) => setTimeout(r, 320))
  }
  if (!reduced()) {
    const anims = fly(stackGeoms(), true)
    await Promise.all(anims.map((a) => a.finished.catch(() => {})))
  }
  open.value = false
  closing.value = false
  document.documentElement.style.overflow = ''
  ;(lastFocus || stack.value)?.focus({ preventScroll: true })
}

// to'liq ko'rinishdan yelpig'ichga qaytish — fokus o'sha suratga (klaviatura bilan yuruvchilar uchun)
function backToFan() {
  const i = active.value
  active.value = -1
  nextTick(() => document.querySelectorAll('.ps-item')[i]?.focus({ preventScroll: true }))
}

function show(i) {
  active.value = (i + n.value) % n.value
}

function onKey(e) {
  if (!open.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    active.value >= 0 ? backToFan() : closeGallery()
  } else if (active.value >= 0 && e.key === 'ArrowRight') show(active.value + 1)
  else if (active.value >= 0 && e.key === 'ArrowLeft') show(active.value - 1)
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (open.value) document.documentElement.style.overflow = ''
})
</script>

<template>
  <div class="ps" :class="{ 'is-away': open }">
    <button ref="stack" type="button" class="ps-stack" :aria-label="t.gallery.open" @click="openGallery"
      @pointermove="onMove" @pointerleave="onLeave">
      <img v-for="(ph, i) in photos" :key="ph.src" :src="ph.src" :alt="ph.alt" class="ps-stack__card"
        :class="`ps-stack__card--${i}`" loading="lazy" decoding="async" />
      <span class="ps-stack__hint"><Icon name="expand" :size="16" />{{ t.gallery.open }}</span>
    </button>

    <Teleport to="body">
      <Transition name="ps-fade">
        <div v-if="open" class="ps-modal" :class="{ 'is-closing': closing, 'has-active': active >= 0 }" role="dialog"
          aria-modal="true" :aria-label="t.gallery.open" @click.self="closeGallery">
          <button ref="closeBtn" type="button" class="ps-btn ps-close" :aria-label="t.gallery.close" @click="closeGallery">
            <Icon name="close" :size="22" />
          </button>

          <!-- yelpig'ich -->
          <div class="ps-fan" @click.self="closeGallery">
            <button v-for="(ph, i) in photos" :key="ph.src" type="button" class="ps-item"
              :class="{ 'is-active': i === active }" :style="{ '--o': i - (n - 1) / 2 }" :aria-label="ph.caption"
              @click="show(i)">
              <span :ref="(el) => { cards[i] = el }" class="ps-item__card">
                <img :src="ph.src" :alt="ph.alt" />
                <span class="ps-item__caption">{{ ph.caption }}</span>
              </span>
            </button>
          </div>
          <p class="ps-hint">{{ t.gallery.hint }}</p>

          <!-- to'liq ko'rinish -->
          <Transition name="ps-full">
            <div v-if="active >= 0" :key="active" class="ps-full" @click.self="backToFan">
              <img :src="photos[active].src" :alt="photos[active].alt" />
              <p class="ps-full__caption">{{ photos[active].caption }} · {{ active + 1 }}/{{ n }}</p>
            </div>
          </Transition>
          <div v-if="active >= 0" class="ps-nav">
            <button type="button" class="ps-btn" :aria-label="t.gallery.prev" @click="show(active - 1)">
              <Icon name="arrow" :size="20" class="ps-back-icon" />
            </button>
            <button type="button" class="ps-btn ps-btn--wide" @click="backToFan">
              <Icon name="expand" :size="16" />{{ t.gallery.back }}
            </button>
            <button type="button" class="ps-btn" :aria-label="t.gallery.next" @click="show(active + 1)">
              <Icon name="arrow" :size="20" />
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
// ================= joyidagi ustma-ust suratlar =================
.ps {
  // --p — v-scroll-fx dan (ota elementda): aylantirishga qarab yoyilish
  --f: clamp(0, calc(var(--p, 0) + 0.85), 1);
  --spread: 22%;

  position: relative;

  @include down($bp-sm) {
    --spread: 12%;
  }
}

.ps-stack {
  --h: 0;
  --s: calc(var(--f) + var(--h) * 0.35);

  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  cursor: zoom-in;

  @media (hover: hover) {
    &:hover {
      --h: 1;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 6px;
    border-radius: var(--radius-lg);
  }
}

.ps-stack__card {
  position: absolute;
  top: 8%;
  left: 17%;
  width: 66%;
  height: 84%;
  object-fit: cover;
  border: 6px solid #fff;
  border-radius: var(--radius-lg);
  box-shadow: 0 18px 40px rgb(var(--shade-rgb) / 0.18);
  transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out);
  will-change: transform;

  // kursor ortidan: orqadagilar ko'proq, oldingisi kamroq siljiydi
  // Orqadagi ikkitasi pastki markazdan buriladi va biroz kichikroq: yuqori burchaklari
  // oldingi surat ortida qoladi (aks holda tepadan «4-kartochka»dek chiqib turardi)
  &--0,
  &--1 {
    transform-origin: 50% 100%;
  }

  &--0 {
    transform: translate(calc(var(--spread) * -1 * var(--s) + var(--mx, 0) * 22px), calc(4% + var(--my, 0) * 14px))
      rotate(calc(-3deg - 7deg * var(--s))) scale(0.9);
  }

  &--1 {
    transform: translate(calc(var(--spread) * var(--s) + var(--mx, 0) * 22px), calc(4% + var(--my, 0) * 14px))
      rotate(calc(3deg + 6deg * var(--s))) scale(0.9);
  }

  &--2 {
    transform: translate(calc(var(--mx, 0) * 10px), calc(-3% * var(--f) + var(--my, 0) * 6px))
      rotate(calc(-2deg + 2deg * var(--f) + var(--mx, 0) * 3deg));
  }

  .ps-stack:hover & {
    box-shadow: 0 26px 50px rgb(var(--shade-rgb) / 0.24);
  }
}

// galereya ochiq (yopilish uchishi ham) — joyidagi suratlar yashirin, ikkilanmasin
.is-away .ps-stack__card,
.is-away .ps-stack__hint {
  opacity: 0;
  transition: none;
}

.ps-stack__hint {
  position: absolute;
  left: 50%;
  bottom: 2%;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-md);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--accent);
  white-space: nowrap;
  transform: translate(-50%, 0);
  transition: transform var(--t-hover), background var(--t-hover);

  .ps-stack:hover & {
    transform: translate(-50%, -6px);
    background: #fff;
  }
}

// ================= galereya =================
.ps-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgb(var(--deep-rgb) / 0.78);
  backdrop-filter: blur(10px);
  transition: background 0.45s ease;

  &.is-closing {
    background: rgb(var(--deep-rgb) / 0);
    backdrop-filter: blur(0);
  }
}

.ps-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-width: 48px;
  height: 48px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.24);
  color: #fff;
  font-size: var(--text-sm);
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  transition: background var(--t-fast);

  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }

  &--wide {
    padding: 0 20px;
  }
}

.ps-close {
  position: absolute;
  top: clamp(14px, 3vw, 28px);
  right: clamp(14px, 3vw, 28px);
  z-index: 3;
}

.ps-back-icon {
  transform: rotate(180deg);
}

// yelpig'ich: o'rtadagi markazda, yondagilar qiyshiq va biroz orqada
.ps-fan {
  --w: min(28vw, 360px, 42vh);
  --step: 0.92;

  position: absolute;
  inset: 0;

  @include down($bp-sm) {
    --w: min(54vw, 280px);
    --step: 0.34;
  }
}

.ps-item {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: calc(10 - var(--o) * var(--o));
  width: var(--w);
  aspect-ratio: 4 / 5;
  padding: 0;
  transform: translate(-50%, -50%) translateX(calc(var(--o) * var(--w) * var(--step))) rotate(calc(var(--o) * 6deg));
  transition: transform 0.45s var(--ease-out), opacity 0.35s ease;
  cursor: zoom-in;

  @media (hover: hover) {
    &:hover {
      z-index: 20;
      transform: translate(-50%, -50%) translateX(calc(var(--o) * var(--w) * var(--step))) translateY(-14px) rotate(0deg) scale(1.03);
    }
  }

  // to'liq ko'rinish ochiq: yelpig'ich chetga tarqaladi va so'nadi
  .has-active & {
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, -50%) translateX(calc(var(--o) * var(--w) * 1.6)) rotate(calc(var(--o) * 12deg)) scale(0.9);
  }
}

.ps-item__card {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  border: 6px solid #fff;
  border-radius: var(--radius-lg);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.35);
  background: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.ps-item__caption {
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.92);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text);
  text-align: left;
}

.ps-hint {
  position: absolute;
  left: 0;
  right: 0;
  bottom: clamp(18px, 5vh, 48px);
  padding-inline: 16px;
  text-align: center;
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.75);
  transition: opacity 0.3s;

  .has-active &,
  .is-closing & {
    opacity: 0;
  }
}

// to'liq ko'rinish
.ps-full {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: 72px 16px 110px;

  img {
    max-width: min(92vw, 1400px);
    max-height: 100%;
    min-height: 0;
    object-fit: contain;
    border-radius: var(--radius-lg);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
  }
}

.ps-full__caption {
  font-size: var(--text-sm);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}

// butun kenglik + markazda: «left: 50%» bilan absolyut blok ekranning faqat yarmini oladi va
// telefonda «Ко всем фото» uch qatorga sinardi (iOS skrinshoti)
.ps-nav {
  position: absolute;
  left: 0;
  right: 0;
  bottom: clamp(18px, 4vh, 36px);
  z-index: 3;
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  padding: 0 var(--space-4);
}

// ---- o'tishlar ----
// faqat fon so'nadi — suratlar uchish paytida doim ko'rinib turadi
.ps-fade-enter-active {
  transition: background 0.4s ease, backdrop-filter 0.4s ease;
}

// fon yopilish animatsiyasi paytida (is-closing) allaqachon so'ngan — qo'shimcha kutish yo'q
.ps-fade-leave-active {
  transition: none;
}

.ps-fade-enter-from,
.ps-fade-leave-to {
  background: rgb(var(--deep-rgb) / 0);
  backdrop-filter: blur(0);
}

.ps-full-enter-active {
  transition: opacity 0.4s ease, transform 0.45s var(--ease-out);
}

.ps-full-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.ps-full-enter-from {
  opacity: 0;
  transform: scale(0.92);
}

.ps-full-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
