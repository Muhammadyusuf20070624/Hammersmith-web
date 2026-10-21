<script setup>
// Sahifa ochilganda loader: logotip, «Hammersmith» harfma-harf, to'luvchi chiziq.
//
// - Server HTML'ida bor — sahifa birinchi kadrdanoq yopiq turadi.
// - Kamida MIN_MS (harflar o'qilib ulgursin), ko'pi bilan MAX_MS (sekin tarmoqda ham kutmasin).
// - <html> dagi .wk-loading — bosh blok animatsiyalarini loader yo'qolguncha to'xtatib turadi
//   (klass head'dagi kichik skript bilan faqat JS bor bo'lsa qo'yiladi).
// - JS ishlamasa — CSS'dagi zaxira animatsiya 3 soniyada o'zi yashiradi.
import { BRAND } from '~/utils/content'

const MIN_MS = 900
const MAX_MS = 2500

const hidden = ref(false)
const gone = ref(false)
const letters = BRAND.name.split('')

useHead({
  script: [{ key: 'wk-loading', tagPosition: 'head', innerHTML: "if(!window.__wkLoaded){document.documentElement.classList.add('wk-loading');setTimeout(function(){document.documentElement.classList.remove('wk-loading')},3000)}" }],
})

onMounted(() => {
  // sahifa allaqachon yuklangan (masalan, HMR) — loader kerak emas
  if (window.__wkLoaded) {
    gone.value = true
    document.documentElement.classList.remove('wk-loading')
    return
  }
  const start = performance.now()
  let done = false
  const hide = () => {
    if (done) return
    done = true
    const wait = Math.max(0, MIN_MS - (performance.now() - start))
    setTimeout(() => {
      hidden.value = true
      // belgi qayta qo'yilmasin (dev'dagi HMR yoki head qayta chizilganda) — aks holda
      // bosh blok animatsiyalari to'xtab, matn va tugma ko'rinmay qolardi
      window.__wkLoaded = true
      document.documentElement.classList.remove('wk-loading')
      // so'nish tugagach — DOMdan butunlay olib tashlanadi
      setTimeout(() => { gone.value = true }, 600)
    }, wait)
  }
  if (document.readyState === 'complete') hide()
  else window.addEventListener('load', hide, { once: true })
  setTimeout(hide, MAX_MS)
})
</script>

<template>
  <div v-if="!gone" class="loader" :class="{ 'is-hidden': hidden }" aria-hidden="true">
    <div class="loader__inner">
      <img :src="BRAND.logo" alt="" width="88" height="88" class="loader__logo" />
      <p class="loader__name">
        <span v-for="(ch, i) in letters" :key="i" :style="{ '--i': i }">{{ ch === ' ' ? ' ' : ch }}</span>
      </p>
      <span class="loader__bar"><span /></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: var(--page-gradient), var(--bg);
  transition: opacity 0.5s var(--ease-out), visibility 0.5s;
  // JS ishlamasa — 3 soniyada o'zi yo'qoladi
  animation: loader-fallback 0.5s 3s forwards;

  &.is-hidden {
    opacity: 0;
    visibility: hidden;

    .loader__inner {
      transform: scale(1.04);
    }
  }
}

.loader__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  transition: transform 0.5s var(--ease-out);
}

.loader__logo {
  width: 88px;
  height: 88px;
  animation: loader-logo 0.7s var(--ease-out) both, loader-breathe 2.4s 0.7s ease-in-out infinite;
}

.loader__name {
  display: flex;
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  color: var(--text);

  span {
    display: inline-block;
    animation: loader-letter 0.5s var(--ease-out) both;
    animation-delay: calc(0.25s + var(--i) * 45ms);
  }
}

.loader__bar {
  position: relative;
  width: 140px;
  height: 3px;
  overflow: hidden;
  border-radius: 3px;
  background: var(--border);

  span {
    position: absolute;
    inset: 0;
    border-radius: 3px;
    background: var(--accent-gradient);
    transform-origin: left;
    animation: loader-bar 1.6s 0.2s var(--ease-out) both;
  }
}

// «Harakatni kamaytirish» rejimida — loader umuman yo'q
@media (prefers-reduced-motion: reduce) {
  .loader {
    display: none;
  }
}

@keyframes loader-logo {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
}

@keyframes loader-breathe {
  50% {
    transform: scale(1.05);
  }
}

@keyframes loader-letter {
  from {
    opacity: 0;
    transform: translateY(0.4em);
  }
}

@keyframes loader-bar {
  from {
    transform: scaleX(0);
  }
}

@keyframes loader-fallback {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>
