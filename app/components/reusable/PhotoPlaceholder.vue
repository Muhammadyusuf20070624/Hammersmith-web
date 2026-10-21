<script setup>
// Rasm o'rni. `src` berilsa — rasm, berilmasa — yumshoq gradientli joy
// ushlagich. Real restoran suratlari kelganda public/images/ ga qo'yiladi va
// content.js da yo'li yoziladi; komponentlarga tegish shart emas.
const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  // berilmasa — tanlangan tildagi «Фото»
  label: { type: String, default: null },
  ratio: { type: String, default: '4 / 3' },
  // rasm kesilganda qaysi qismi ko'rinib tursin (object-position), masalan 'center 30%'
  position: { type: String, default: '' },
})
// Fayl hali qo'yilmagan (404) — rasm o'rniga joy ushlagich
const failed = ref(false)
// Sahifa serverda chiziladi: rasm 404 bo'lishi Vue ulanishidan oldin sodir
// bo'lsa @error yo'qoladi — shuning uchun ulangach rasm holatini o'zimiz tekshiramiz
const img = ref(null)
onMounted(() => {
  const el = img.value
  if (el && el.complete && el.naturalWidth === 0) failed.value = true
})
const { lang } = useLang()
const PHOTO = { ru: 'Фото', uz: 'Surat', en: 'Photo' }
watch(() => props.src, () => { failed.value = false })
</script>

<template>
  <div class="photo" :style="{ aspectRatio: ratio }">
    <img v-if="src && !failed" ref="img" :src="src" :alt="alt" :style="position ? { objectPosition: position } : null" loading="lazy" decoding="async" @error="failed = true" />
    <span v-else class="photo__label">{{ label ?? PHOTO[lang] }}</span>
  </div>
</template>

<style lang="scss" scoped>
.photo {
  // iOS Safari: yumaloq burchak ichida scale/transform animatsiyasi paytida ham kesilsin (to'rtburchak burchak chaqnamasin)
  isolation: isolate;
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background:
    radial-gradient(120% 90% at 20% 15%, var(--surface-soft) 0%, transparent 60%),
    linear-gradient(135deg, var(--accent-soft) 0%, var(--tint) 100%);
  border: 1px solid var(--border);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.photo__label {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}
</style>
