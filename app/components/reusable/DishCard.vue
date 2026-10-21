<script setup>
// Taom kartochkasi (emenu ma'lumoti): surat, nom, tarkib (2 qator), narx, tayyorlanish vaqti.
// Bosh sahifadagi «Menyudan» bloki va /menu sahifasida.
// Surati yo'q taomda (ichimliklarning bir qismi) — rasm o'rniga ixcham ko'rinish (row).
import { formatPrice } from '~/composables/useMenu'

const props = defineProps({
  dish: { type: Object, required: true },
})

const { t } = useLang()
const failed = ref(false)
const hasImg = computed(() => props.dish.img && !failed.value)
</script>

<template>
  <article class="dish" :class="{ 'dish--row': !hasImg, 'dish--sold': dish.soldOut }">
    <div v-if="hasImg" class="dish__media">
      <img :src="dish.img" :alt="dish.name" loading="lazy" decoding="async" width="500" height="500" @error="failed = true" />
      <span v-if="dish.mins" class="dish__time"><Icon name="clock" :size="13" />{{ t.menu.from }} {{ dish.mins }} {{ t.menu.minutes }}</span>
    </div>
    <div class="dish__body">
      <h3 class="dish__name">{{ dish.name }}</h3>
      <p v-if="dish.text" class="dish__text">{{ dish.text }}</p>
      <p class="dish__price">{{ formatPrice(dish.price) }} <small>{{ t.menu.sum }}</small></p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.dish {
  @include card;
  @include card-hover;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  &--sold {
    opacity: 0.55;
  }
}

.dish__media {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--deep-2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s var(--ease-out);
  }
}

@media (hover: hover) {
  .dish:hover .dish__media img {
    transform: scale(1.04);
  }
}

.dish__time {
  position: absolute;
  left: var(--space-3);
  bottom: var(--space-3);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border-radius: 999px;
  background: rgb(var(--deep-rgb) / 0.6);
  backdrop-filter: blur(6px);
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}

.dish__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);

  @include down($bp-sm) {
    padding: var(--space-3);
  }
}

.dish__name {
  font-size: var(--text-base);
  font-weight: 600;
  line-height: 1.3;

  @include down($bp-sm) {
    font-size: var(--text-sm);
  }
}

.dish__text {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: var(--text-xs);
  line-height: 1.45;
  color: var(--text-muted);
}

.dish__price {
  margin-top: auto;
  padding-top: var(--space-1);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--accent);

  small {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--text-muted);
  }
}

// suratsiz taom (ichimliklar): nom chapda, narx o'ngda — bir qatorda
.dish--row .dish__body {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  gap: 2px var(--space-4);

  .dish__text {
    grid-column: 1;
  }

  .dish__price {
    grid-column: 2;
    grid-row: 1;
    margin: 0;
    padding: 0;
    white-space: nowrap;
  }
}
</style>
