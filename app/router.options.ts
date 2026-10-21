import type { RouterConfig } from '@nuxt/schema'

// Sahifa ochilganda/yangilanganda doim tepadan boshlanadi: eski scroll joyi
// yoki manzildagi #bo'lim tiklanmaydi. Sahifa ichidagi o'tishlar
// plugins/anchors.client.js da (manzil o'zgarmaydi).
export default <RouterConfig>{
  scrollBehavior: () => ({ top: 0 }),
}
