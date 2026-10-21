// emenu menyusi (server/api/menu.get.js orqali, keshlangan). Til almashsa — qayta olinadi.
// only: [id, ...] berilsa — faqat shu taomlar olinadi (bosh sahifa): sahifaga butun menyu joylanmaydi.
export function useMenu({ only = null } = {}) {
  const { lang } = useLang()
  const res = useFetch('/api/menu', {
    key: computed(() => `menu-${only ? 'featured-' : ''}${lang.value}`),
    query: { lang },
    default: () => null,
    transform: only ? (d) => ({ items: flat(d).filter((p) => only.includes(p.id)) }) : undefined,
  })
  // id → taom
  const byId = computed(() => {
    const map = new Map()
    for (const p of res.data.value?.items || flat(res.data.value)) map.set(p.id, p)
    return map
  })
  return { ...res, byId }
}

function flat(d) {
  const out = []
  for (const g of d?.groups || []) for (const c of g.cats) out.push(...c.items)
  return out
}

// Narx: 185000 → «185 000»
export const formatPrice = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
