<script setup>
// Ichki sahifa bosh bloki — bosh sahifadagi kabi yumaloq suratli karta (Aluna uslubida):
// surat sekin yaqinlashadi va aylantirganda parallaks, sarlavha so'zma-so'z chiqadi,
// orqada ulkan kontur so'z (ghost), o'ng pastda shisha kartochka (slot).
const props = defineProps({
  image: { type: String, required: true },
  position: { type: String, default: 'center' },
  alt: { type: String, default: '' },
  kicker: { type: String, default: '' },
  line1: { type: String, required: true },
  line2: { type: String, default: '' },
  text: { type: String, default: '' },
  cta: { type: String, default: '' },
  ctaHref: { type: String, default: '#form' },
  // fon ustidagi ulkan kontur so'z — bezak, ekran o'quvchilar o'qimaydi
  ghost: { type: String, default: '' },
})

const { t, lang } = useLang()

const words = computed(() => [
  ...props.line1.split(' ').map((text) => ({ text, accent: false })),
  ...(props.line2 ? props.line2.split(' ').map((text) => ({ text, accent: true })) : []),
])
</script>

<template>
  <section class="phero">
    <div class="phero__card">
      <div v-scroll-fx class="phero__media">
        <img :src="image" :alt="alt" :style="{ objectPosition: position }" class="phero__img" fetchpriority="high" decoding="async" />
      </div>
      <span v-if="ghost" class="phero__ghost" aria-hidden="true">{{ ghost }}</span>

      <div class="phero__inner container container--wide">
        <nav class="phero__crumbs rise-in" :aria-label="t.pages.home">
          <NuxtLink to="/">{{ t.pages.home }}</NuxtLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ kicker || line1 }}</span>
        </nav>

        <div class="phero__text">
          <p v-if="kicker" class="phero__kicker rise-in" style="--rise-delay: 80ms">{{ kicker }}</p>
          <h1 class="phero__title">
            <template v-for="(w, i) in words" :key="`${lang}-${i}`">
              <span class="phero__word" :class="{ 'accent-italic': w.accent }" :style="{ '--i': i }">{{ w.text }}</span>{{ ' ' }}
            </template>
          </h1>
          <p v-if="text" class="phero__lead rise-in" style="--rise-delay: 420ms">{{ text }}</p>
          <a v-if="cta" :href="ctaHref" class="btn btn--primary phero__cta rise-in" style="--rise-delay: 540ms">
            {{ cta }}
            <span class="phero__cta-icon"><Icon name="arrow" :size="16" /></span>
          </a>
        </div>

        <!-- pastki qator (bosh sahifadagi kabi): chapda joy nomi, o'ngda shisha kartochka -->
        <div class="phero__bottom">
          <p class="phero__place">{{ t.hero.place }}</p>
          <div v-if="$slots.default" class="phero__glass rise-in" style="--rise-delay: 700ms">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.phero {
  --inset: 12px;

  padding: var(--inset) var(--inset) 0;

  @include down($bp-sm) {
    --inset: 8px;
  }
}

.phero__card {
  // iOS Safari: yumaloq burchak ichida scale/transform animatsiyasi paytida ham kesilsin (to'rtburchak burchak chaqnamasin)
  isolation: isolate;
  position: relative;
  display: flex;
  overflow: hidden;
  // bosh sahifa heroi bilan bir xil: header (72px) ostida deyarli butun ekran
  min-height: clamp(560px, calc(100svh - 72px - var(--inset) * 2), 900px);
  border-radius: clamp(20px, 2.4vw, 32px);
  background: var(--deep-2);

  @include down($bp-md) {
    min-height: clamp(600px, calc(100svh - 60px - var(--inset) * 2), 720px);
  }
}

// Surat: tashqi qatlam aylantirishda siljiydi (--p), ichki surat yuklanganda sekin yaqinlashadi
.phero__media {
  position: absolute;
  inset: -40px 0;
  transform: translate3d(0, calc(var(--p, 0) * 40px), 0);
  will-change: transform;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgb(var(--deep-rgb) / 0.78) 0%, rgb(var(--deep-rgb) / 0.42) 45%, rgb(var(--deep-rgb) / 0.08) 75%),
      linear-gradient(0deg, rgb(var(--deep-rgb) / 0.55) 0%, rgb(var(--deep-rgb) / 0) 40%);

    @include down($bp-lg) {
      background: linear-gradient(180deg, rgb(var(--deep-rgb) / 0.85) 0%, rgb(var(--deep-rgb) / 0.55) 50%, rgb(var(--deep-rgb) / 0.8) 100%);
    }
  }
}

.phero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: phero-zoom 9s var(--ease-out) both;
}

@keyframes phero-zoom {
  from {
    transform: scale(1.16);
  }

  to {
    transform: scale(1.04);
  }
}

// Ulkan kontur so'z: karta pastida, aylantirganda o'ngga suriladi
.phero__ghost {
  position: absolute;
  z-index: 1;
  right: -0.04em;
  bottom: -0.2em;
  font-family: var(--font-display);
  font-size: clamp(120px, 19vw, 300px);
  font-style: italic;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1px rgb(255 255 255 / 0.22);
  pointer-events: none;
  user-select: none;
  animation: ghost-in 1.6s var(--ease-out) 0.3s both;

  @include down($bp-md) {
    font-size: 34vw;
    bottom: 0.9em;
  }
}

@keyframes ghost-in {
  from {
    opacity: 0;
    transform: translateX(8%);
  }
}

.phero__inner {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  max-width: calc(#{$container-wide} - var(--inset) * 2);
  gap: var(--space-8);
  padding: clamp(28px, 5vw, 72px) calc(var(--wide-pad) - var(--inset)) clamp(24px, 3vw, 40px);
  color: #fff;

  @include down($bp-md) {
    gap: var(--space-6);
    padding: var(--space-10) var(--space-5) var(--space-5);
  }
}

// Yo'l: shisha «pill»
.phero__crumbs {
  justify-self: start;
  display: inline-flex;
  gap: var(--space-2);
  padding: 7px 14px;
  border-radius: 999px;
  background: rgb(255 255 255 / 0.12);
  border: 1px solid rgb(255 255 255 / 0.2);
  backdrop-filter: blur(10px);
  font-size: 12px;
  font-weight: 600;
  color: rgb(255 255 255 / 0.75);

  a {
    color: #fff;
  }

  a:hover {
    color: var(--accent-on-dark);
  }
}

.phero__text {
  align-self: center;
  max-width: 660px;

  @include down($bp-md) {
    align-self: start;
  }
}

// Pastki qator: chapda joy nomi, o'ngda kartochka (bosh sahifadagi .hero__bottom)
.phero__bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-6);

  @include down($bp-md) {
    display: block;
  }
}

.phero__place {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgb(255 255 255 / 0.85);

  @include down($bp-md) {
    display: none;
  }
}

.phero__kicker {
  margin-bottom: var(--space-4);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgb(255 255 255 / 0.85);
}

.phero__title {
  font-family: var(--font-display);
  font-size: clamp(40px, 5.6vw, 88px);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.025em;

  .accent-italic {
    color: var(--accent-on-dark);
  }

  @include down($bp-md) {
    font-size: clamp(36px, 10.5vw, 46px);
    line-height: 1.06;
  }
}

.phero__word {
  display: inline-block;
  // telefonda uzun so'z («конфиденциальности») ekrandan keng bo'lsa — bo'g'in bo'yicha ko'chadi
  max-width: 100%;
  overflow-wrap: break-word;
  hyphens: auto;
  animation: phero-word 0.8s var(--ease-out) both;
  animation-delay: calc(var(--i) * 90ms + 120ms);
}

@keyframes phero-word {
  from {
    opacity: 0;
    transform: translateY(0.45em) rotate(2deg);
  }
}

.phero__lead {
  margin-top: var(--space-5);
  max-width: 480px;
  font-size: var(--text-lg);
  color: rgb(255 255 255 / 0.86);

  @include down($bp-md) {
    font-size: var(--text-sm);
  }
}

.phero__cta {
  margin-top: var(--space-8);
  padding: 8px 8px 8px 26px;
  gap: var(--space-4);
  font-size: var(--text-base);

  @include down($bp-md) {
    margin-top: var(--space-6);
    padding: 6px 6px 6px 20px;
    font-size: var(--text-sm);
  }
}

.phero__cta-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.22);

  :deep(svg) {
    transition: transform var(--t-hover);
  }

  @include down($bp-md) {
    width: 36px;
    height: 36px;
  }
}

.phero__cta:hover .phero__cta-icon :deep(svg) {
  transform: translateX(2px) rotate(-45deg);
}

// Shisha kartochka: o'ng past (telefonda — matn ostida, butun en)
.phero__glass {
  flex-shrink: 0;
  // bosh sahifadagi shisha kartochka kengligi
  width: 360px;
  max-width: 100%;
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  background: rgb(255 255 255 / 0.14);
  border: 1px solid rgb(255 255 255 / 0.22);
  backdrop-filter: blur(14px);

  @include down($bp-md) {
    width: 100%;
    padding: var(--space-4);
  }
}
</style>
