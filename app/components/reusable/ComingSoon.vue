<script setup>
// VAQTINCHA «Tez orada» ekrani — hali ochilmagan sahifalar o'rnida (layouts/default.vue, content.js → SOON_PAGES).
// Oddiy: logotip, sahifa nomi, bitta gap, «Bosh sahifaga». Qidiruv tizimlari indekslamaydi (noindex).
import { LANDING } from '~/utils/content'

const props = defineProps({
  // locale'dagi nav kaliti: menu / about / contacts
  page: { type: String, required: true },
})

const { t } = useLang()
const name = computed(() => t.value.nav[props.page])

useSeoMeta({
  title: () => `${name.value} — Hammersmith`,
  description: () => t.value.soon.text,
  robots: 'noindex, follow',
})
</script>

<template>
  <section class="soon container">
    <img src="/images/logo-128.png" alt="" width="72" height="72" class="soon__logo" />
    <h1 class="soon__title">{{ name }}</h1>
    <p class="soon__text">{{ t.soon.text }}</p>
    <NuxtLink :to="LANDING" class="btn btn--primary">{{ t.soon.home }}</NuxtLink>
  </section>
</template>

<style lang="scss" scoped>
.soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  min-height: 60svh;
  padding-block: var(--space-16);
  text-align: center;
}

.soon__logo {
  width: 72px;
  height: 72px;
  border-radius: 50%;
}

.soon__title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 600;
}

.soon__text {
  max-width: 420px;
  margin-bottom: var(--space-2);
  color: var(--text-secondary);
}
</style>
