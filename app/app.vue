<script setup>
// <html lang> tanlangan tilga mos (ekran o'quvchilar va qidiruv uchun)
const { lang } = useLang()
useHead({ htmlAttrs: { lang } })

// Hamma sahifalar uchun umumiy OpenGraph teglari; sahifaga xosi — usePageSeo()
const OG_LOCALE = { ru: 'ru_RU', uz: 'uz_UZ', en: 'en_US' }
useSeoMeta({
  ogSiteName: 'Hammersmith',
  ogType: 'website',
  ogLocale: () => OG_LOCALE[lang.value],
  ogLocaleAlternate: () => Object.entries(OG_LOCALE).filter(([k]) => k !== lang.value).map(([, v]) => v),
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <SiteLoader />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
