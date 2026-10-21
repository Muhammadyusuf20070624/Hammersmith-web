<script setup>
// Ulkan ikki qatorli sarlavha (start.fitland.pro uslubida, bizning shriftlarda):
// 1-qator — to'q, 2-qator — urg'u rangidagi kursiv va o'ngga surilgan.
// Aylantirganda qatorlar bir-biriga qarama-qarshi biroz siljiydi (v-scroll-fx → --p).
defineProps({
  line1: { type: String, required: true },
  line2: { type: String, default: '' },
  tag: { type: String, default: 'h2' },
  // to'q fonli bo'limlar uchun (oq matn)
  light: { type: Boolean, default: false },
})
</script>

<template>
  <component :is="tag" v-scroll-fx class="big-title" :class="{ 'big-title--light': light }">
    <span class="big-title__line">{{ line1 }}</span>{{ ' ' }}
    <span v-if="line2" class="big-title__line big-title__line--accent">{{ line2 }}</span>
  </component>
</template>

<style lang="scss" scoped>
.big-title {
  --shift: 28px;

  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 80px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
  color: var(--text);

  // planshet/telefonda siljish kichik — qator ekran chetiga chiqmasin
  @include down($bp-lg) {
    --shift: 10px;
  }
}

.big-title__line {
  display: block;
  text-wrap: balance;
  transform: translate3d(calc(var(--p, 0) * var(--shift) * -1), 0, 0);
  will-change: transform;
}

.big-title__line--accent {
  margin-top: 0.08em;
  padding-left: clamp(20px, 9vw, 180px);
  font-style: italic;
  font-weight: 500;
  color: var(--accent-italic);
  transform: translate3d(calc(var(--p, 0) * var(--shift)), 0, 0);
}

.big-title--light {
  color: #fff;

  .big-title__line--accent {
    color: var(--accent-on-dark);
  }
}

// Telefon (Aluna uslubi): o'rtada, ~32px, chekinish va siljish yo'q
@include down($bp-md) {
  .big-title {
    --shift: 0px;

    font-size: clamp(28px, 8.2vw, 36px);
    line-height: 1.12;
    text-align: center;
  }

  .big-title__line--accent {
    margin-top: 0.04em;
    padding-left: 0;
  }
}
</style>
