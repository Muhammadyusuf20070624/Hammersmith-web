# Hammersmith — steak-house va pab sayti

Toshkentdagi Hammersmith restoran-barlari tarmog'i sayti (5 filial). Nuxt 4, Vue 3, SCSS.

## Ishga tushirish

```
npm install --ignore-scripts
node node_modules/@nuxt/cli/bin/nuxi.mjs dev --port 3100   # http://localhost:3100
node node_modules/@nuxt/cli/bin/nuxi.mjs build
PORT=4700 node .output/server/index.mjs                     # build'ni sinash
```

## Tuzilish

- `app/locales/{ru,uz,en}.js` — barcha matnlar (3 tilda).
- `app/utils/content.js` — tilga bog'liq bo'lmagan ma'lumot: brend, telefon, 5 filial (`STUDIO_GALLERY`),
  hero videosi, rasmlar, emenu sozlamalari (`EMENU`).
- `server/api/menu.get.js` — menyu: emenu.uz ochiq API'dan olinadi, filtrlanadi (tamaki, kalyan, ichki
  kategoriyalar chiqmaydi), 10 daqiqa keshlanadi. `app/pages/menu.vue` — menyu sahifasi.
- `app/assets/scss/_tokens.scss` — ranglar; `app/utils/themes.js` — vaqtinchalik palitra/shrift variantlari
  (ThemePanel, `content.js → THEME_PANEL`).

## Hali qilinadigan

- Filial suratlari: `public/images/branch-<key>-1.jpg` qo'yib, `content.js → STUDIO_GALLERY[].photos` ga yozish.
- Yuqori sifatli logotip (SVG yoki katta PNG) — hozirgisi Instagram profil rasmidan (100×100).
- Telefon raqamlarini tasdiqlash (`PHONE` va filiallar `phone`).
- Bron formasi hozircha hech qayerga yubormaydi (`LeadForm.vue` → `send()`): manzil (API yoki Telegram) kelishilgach ulanadi.
- Sayt domeni: serverda `NUXT_PUBLIC_SITE_URL`.
