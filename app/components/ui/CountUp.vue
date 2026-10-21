<script setup>
// Raqamni ekranga kirganda 0 dan sanab chiqaradi: «30+» → 0+ … 30+.
// Faqat «son + belgi» ko'rinishidagi qiymatlar sanaladi («9–21» kabi oraliq — yo'q).
// Server HTML'ida va «harakatni kamaytirish» rejimida — darhol yakuniy qiymat.
const props = defineProps({
  value: { type: String, required: true },
  duration: { type: Number, default: 1200 },
})

const el = ref(null)
const shown = ref(props.value)
watch(() => props.value, (v) => { shown.value = v })

onMounted(() => {
  const m = props.value.match(/^(\d+)(\D*)$/)
  if (!m || !('IntersectionObserver' in window)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const r = el.value.getBoundingClientRect()
  if (r.top < window.innerHeight && r.bottom > 0) return

  const target = Number(m[1])
  const suffix = m[2]
  shown.value = `0${suffix}`

  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return
    io.disconnect()
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / props.duration)
      const eased = 1 - (1 - p) ** 3
      shown.value = `${Math.round(target * eased)}${suffix}`
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, { threshold: 0.6 })
  io.observe(el.value)
})
</script>

<template>
  <span ref="el" class="count-up">{{ shown }}</span>
</template>

<style scoped>
/* raqamlar eni bir xil — sanayotganda matn «titramaydi» */
.count-up {
  font-variant-numeric: lining-nums tabular-nums;
}
</style>
