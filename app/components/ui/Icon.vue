<script setup>
// Ingichka chiziqli ikonkalar (stroke 1.6, currentColor) — bitta komponentda,
// tashqi kutubxonasiz. Yangi ikonka — PATHS ga bitta band.
const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  // katta ingichka ikonkalar uchun (Fitland uslubidagi qator) — kichikroq qiymat
  stroke: { type: [Number, String], default: 1.6 },
})

const PATHS = {
  flame: '<path d="M12 21c-3.9 0-7-2.8-7-6.6 0-3.1 2-5.3 3.6-7 .4 1.8 1.4 3 2.6 3.6C11 7.6 12.2 5 14.5 3c.2 2.6 1.4 4.4 2.7 6 1.1 1.4 1.8 3 1.8 4.7C19 17.9 15.9 21 12 21Z"/><path d="M12 21c-1.7 0-3-1.3-3-3 0-1.6 1.2-2.7 2.2-3.6.3 1 .9 1.5 1.6 1.7.2-1.2.8-2.1 1.7-2.8.3 1.3 1.5 2.6 1.5 4.3 0 1.9-1.6 3.4-4 3.4Z"/>',
  beer: '<path d="M6 8h10v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8Z"/><path d="M16 10.5h1.5a2 2 0 0 1 2 2V15a2 2 0 0 1-2 2H16"/><path d="M6 8a2.5 2.5 0 0 1 2.2-4.4A3 3 0 0 1 13.6 4 2.5 2.5 0 0 1 16 8"/><path d="M9.5 12v6M12.5 12v6"/>',
  dish: '<path d="M4 3v7a2 2 0 0 0 2 2v9M8 3v7a2 2 0 0 1-2 2M6 3v5"/><path d="M17 21V3c-2.2 1-3.5 3.6-3.5 7 0 2 1.2 3 3.5 3"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v9H5v-9"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  dumbbell: '<path d="M6 7v10M18 7v10M3 9.5v5M21 9.5v5M6 12h12"/>',
  users: '<path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20"/><circle cx="10" cy="8" r="3.5"/><path d="M20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.6a3.5 3.5 0 0 1 0 6.8"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
  lotus: '<path d="M12 20c-4.5 0-8-2.5-9-6 3 0 6 1 9 4 3-3 6-4 9-4-1 3.5-4.5 6-9 6Z"/><path d="M12 18c-1.8-2-2.8-4.5-2.8-7.2C9.2 8 10.3 5.6 12 4c1.7 1.6 2.8 4 2.8 6.8 0 2.7-1 5.2-2.8 7.2Z"/>',
  chart: '<path d="M5 20v-5M10 20v-9M15 20v-6M20 20V6"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H5v1.5A3.5 3.5 0 0 0 8.5 11M16 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 13v4M8.5 20h7M10 17h4"/>',
  phone: '<path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z"/>',
  pin: '<path d="M12 21s7-6.2 7-11.5a7 7 0 0 0-14 0C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  telegram: '<path d="M21 4 3 11l6 2 2 6 3-4 5 4 2-15Z"/><path d="m9 13 8-6"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6"/>',
  whatsapp: '<path d="M4 20l1.3-3.9A8.5 8.5 0 1 1 8.6 19L4 20Z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 1a5 5 0 0 1-3-3l1-1-1-2L9 8.5Z"/>',
  facebook: '<path d="M14 21v-7.5h2.5L17 10.5h-3V8.8c0-.9.3-1.5 1.6-1.5H17V4.6a20 20 0 0 0-2.3-.1c-2.3 0-3.7 1.4-3.7 3.9v2.1H8.5v3H11V21"/>',
  window: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M12 3v18M4 12h16M7 8.5 9 6.5M15 17.5l2-2"/>',
  shower: '<path d="M5 21V7.5A3.5 3.5 0 0 1 8.5 4v0A3.5 3.5 0 0 1 12 7.5V8"/><path d="M8.5 8h7l-1 2h-5Z"/><path d="M10 13v1M12 13.5v1M14 13v1M11 16.5v1M13 16.5v1M12 19.5v1"/>',
  locker: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M12 3v18M8 7h1.5M14.5 7H16M8 10h1.5M14.5 10H16M9.5 14v2.5M14.5 14v2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  palette: '<path d="M12 3a9 9 0 1 0 0 18c1.2 0 1.8-.9 1.4-1.9-.4-1 .3-2.1 1.4-2.1H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.3 3 8 7 9.5 4-1.5 7-5.2 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  wave: '<path d="M3 9c1.5 0 1.5-1.5 3-1.5S7.5 9 9 9s1.5-1.5 3-1.5S13.5 9 15 9s1.5-1.5 3-1.5S19.5 9 21 9M3 14c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5M3 19c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5"/>',
  snow: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  bear: '<circle cx="6.5" cy="6.5" r="2.3"/><circle cx="17.5" cy="6.5" r="2.3"/><circle cx="12" cy="10.5" r="5.3"/><path d="M10.3 12.3c.9.7 2.5.7 3.4 0M10 9.6h.01M14 9.6h.01"/><path d="M7.8 14.6c-1.6 1-2.6 2.6-2.6 4.4 0 1 .8 1.6 1.7 1.6h10.2c.9 0 1.7-.6 1.7-1.6 0-1.8-1-3.4-2.6-4.4"/>',
  home: '<path d="M4 11 12 4l8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  wallet: '<path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3"/><rect x="4" y="8" width="16" height="11" rx="2"/><circle cx="16" cy="13.5" r="1.2"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16Z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 14h2M14 18h2M18 18h2v2M16 16h2v2"/>',
  logout: '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M10 8l-4 4 4 4M6 12h10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/>',
  megaphone: '<path d="M4 10v4h3l7 4V6L7 10H4Z"/><path d="M18 9a4 4 0 0 1 0 6"/>',
  card: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
  cash: '<rect x="3" y="7" width="18" height="10" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9 5 3-5 3V9Z"/>',
}
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="stroke"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="PATHS[props.name] || ''" />
</template>
