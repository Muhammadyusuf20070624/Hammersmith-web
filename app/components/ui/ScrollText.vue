<script setup>
// «Yonuvchi matn» (Aluna uslubida): aylantirgan sari so'zlar birma-bir och rangdan
// to'q rangga o'tadi — odam matnni «o'qib boradi».
// Server HTML'ida, JS'siz va «harakatni kamaytirish» rejimida — butun matn odatiy rangda.
const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: 'p' },
})

const words = computed(() => props.text.split(' '))
const root = ref(null)
const live = ref(false)
const lit = ref(0)
let raf = 0

function update() {
  raf = 0
  const el = root.value?.$el ?? root.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const vh = window.innerHeight
  // blok tepasi ekranning 85% ga kelganda boshlanadi, pastki qismi 35% ga yetganda tugaydi
  const from = vh * 0.85
  const to = vh * 0.35
  const p = (from - r.top) / (from - to + r.height)
  lit.value = Math.round(Math.min(1, Math.max(0, p)) * words.value.length)
}

function onScroll() {
  if (!raf) raf = requestAnimationFrame(update)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  live.value = true
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <component :is="tag" ref="root" class="stext" :class="{ 'is-live': live }">
    <template v-for="(w, i) in words" :key="i">
      <span class="stext__w" :class="{ 'is-on': i < lit }">{{ w }}</span>{{ ' ' }}
    </template>
  </component>
</template>

<style lang="scss" scoped>
.stext {
  margin: 0 auto;
  max-width: 1080px;
  font-family: var(--font-display);
  font-size: clamp(26px, 3.4vw, 50px);
  font-weight: 500;
  line-height: 1.18;
  letter-spacing: -0.02em;
  text-align: center;
  text-wrap: balance;
  color: var(--text);
}

.stext__w {
  transition: color 0.35s ease;

  .is-live & {
    color: var(--border-strong);
  }

  .is-live &.is-on {
    color: var(--text);
  }
}
</style>
