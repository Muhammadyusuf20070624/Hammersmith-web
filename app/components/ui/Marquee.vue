<script setup>
// Yuguruvchi lenta: so'zlar cheksiz, sokin chapga suriladi (kontentm.uz dagi kabi).
// Ro'yxat ikki marta chiziladi va -50% ga suriladi — uzilishsiz aylanadi.
// Sichqoncha ustida — to'xtaydi; «harakatni kamaytirish» rejimida — qo'zg'almaydi.
defineProps({
  items: { type: Array, required: true },
  duration: { type: Number, default: 45 },
  // giant — ulkan harflar, navbatma-navbat to'liq va kontur (start.fitland.pro dagi kabi)
  variant: { type: String, default: 'default' },
  reverse: { type: Boolean, default: false },
})
</script>

<template>
  <div class="marquee" :class="[`marquee--${variant}`, { 'marquee--reverse': reverse }]" aria-hidden="true">
    <div class="marquee__track" :style="{ animationDuration: `${duration}s` }">
      <template v-for="copy in 2" :key="copy">
        <span v-for="(item, i) in items" :key="`${copy}-${i}`" class="marquee__item">
          {{ item }}<Icon name="flame" :size="22" class="marquee__sep" />
        </span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.marquee {
  overflow: hidden;
  padding-block: var(--space-5);
  border-block: 1px solid var(--border);
  // chetlarda yumshoq so'nish
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee-run linear infinite;

  .marquee:hover & {
    animation-play-state: paused;
  }
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-6);
  padding-right: var(--space-6);
  font-family: var(--font-display);
  font-size: clamp(24px, 3vw, 42px);
  font-weight: 500;
  font-style: italic;
  white-space: nowrap;
  color: var(--text);

  // har ikkinchisi — urg'u rangida, ritm uchun
  &:nth-child(even) {
    color: var(--accent-italic);
  }
}

.marquee__sep {
  color: var(--accent);
  opacity: 0.6;
}

// ---- ulkan variant ----
.marquee--giant {
  padding-block: var(--space-6);
  border: 0;

  .marquee__item {
    gap: var(--space-8);
    padding-right: var(--space-8);
    font-size: clamp(64px, 11vw, 180px);
    font-style: normal;
    font-weight: 600;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: var(--text);

    // har ikkinchisi — faqat kontur
    &:nth-child(even) {
      color: transparent;
      -webkit-text-stroke: 1.5px var(--accent);
    }
  }

  .marquee__sep {
    width: 0.4em;
    height: 0.4em;
    opacity: 0.8;
  }
}

.marquee--reverse .marquee__track {
  animation-direction: reverse;
}

@keyframes marquee-run {
  to {
    transform: translateX(-50%);
  }
}
</style>
