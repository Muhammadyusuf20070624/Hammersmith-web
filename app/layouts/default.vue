<script setup>
import { SOON_PAGES, THEME_PANEL } from '~/utils/content'

// «Tez orada» sahifalarida sahifa komponenti umuman chizilmaydi (menyu yuklanmaydi) — o'rnida ComingSoon
const route = useRoute()
const soonKey = computed(() => SOON_PAGES[route.path.replace(/\/$/, '') || '/'])
</script>

<template>
  <div class="layout">
    <SiteHeader />
    <main>
      <ComingSoon v-if="soonKey" :page="soonKey" />
      <slot v-else />
    </main>
    <SiteFooter />
    <ToTop />
    <ThemePanel v-if="THEME_PANEL" />
  </div>
</template>
