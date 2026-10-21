<script setup>
// Ishonch qatori: 4 ta raqam (ekranga kirganda sanab chiqadi) va izoh
defineProps({
  items: { type: Array, required: true },
  label: { type: String, default: '' },
})
</script>

<template>
  <section class="container container--wide trust-wrap" :aria-label="label">
    <ul class="trust">
      <li v-for="(s, i) in items" :key="i" class="trust__item">
        <strong><CountUp :value="s.value" /></strong>
        <span class="trust__label">{{ s.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.trust-wrap {
  margin-top: var(--space-6);
}

.trust {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 0;
  padding: var(--space-5) 0;
  list-style: none;
  border-radius: var(--radius-xl);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);

  @include down($bp-md) {
    grid-template-columns: 1fr 1fr;
    row-gap: var(--space-5);
  }
}

.trust__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 0 var(--space-4);
  text-align: center;

  // ingichka ajratuvchi chiziqlar (qator boshidagisida yo'q)
  & + & {
    border-left: 1px solid var(--border);
  }

  @include down($bp-md) {
    &:nth-child(odd) {
      border-left: 0;
    }
  }

  strong {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: 600;
    line-height: 1.1;
    color: var(--accent);
  }
}

// alohida class: «span» deb yozilsa, hisoblagichning ichki span'iga ham tushadi
.trust__label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-secondary);
}
</style>
