<script setup>
// Menyu sahifasi — emenu.uz ma'lumoti (server/api/menu.get.js, 10 daqiqalik kesh).
// Tuzilish: ixcham to'q sarlavha → yopishqoq panel (bo'lim tablari: Gril / Oshxona / Bar / Ichimliklar / Qahva,
// qidiruv, bo'lim ichidagi kategoriya chiplari) → kategoriyalar bo'yicha taom kartochkalari → bron formasi.
// Qidiruvda — barcha bo'limlar bo'yicha natija.
const { t, lang } = useLang()
const { data, pending, error, refresh } = useMenu()

usePageSeo({
  title: () => t.value.menu.seo,
  description: () => t.value.menu.seoText,
  image: 'menu',
})

const groups = computed(() => data.value?.groups || [])
const groupKey = ref('grill')
watch(groups, (g) => {
  if (g.length && !g.some((x) => x.key === groupKey.value)) groupKey.value = g[0].key
}, { immediate: true })
const group = computed(() => groups.value.find((g) => g.key === groupKey.value) || groups.value[0])

// ---- qidiruv: nom va tarkib bo'yicha, katta-kichik harf va o'/o' farqisiz ----
const query = ref('')
const norm = (s) => s.toLowerCase().replace(/[ʻʼ'`‘’]/g, '').replace(/ё/g, 'е')
const found = computed(() => {
  const q = norm(query.value.trim())
  if (q.length < 2) return null
  const out = []
  for (const g of groups.value) for (const c of g.cats) {
    const items = c.items.filter((p) => norm(p.name).includes(q) || norm(p.text).includes(q))
    if (items.length) out.push({ ...c, items })
  }
  return out
})
const shownCats = computed(() => found.value ?? group.value?.cats ?? [])

// ---- kategoriya chiplari: bosilganda bo'limga aylanadi, ekrandagisi belgilanadi ----
const activeCat = ref(null)
const chips = ref(null)
let io = null

function observe() {
  io?.disconnect()
  if (!import.meta.client || !('IntersectionObserver' in window)) return
  io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) activeCat.value = Number(e.target.dataset.id)
  }, { rootMargin: '-35% 0px -60% 0px' })
  document.querySelectorAll('.mcat').forEach((el) => io.observe(el))
}

function goCat(id) {
  const el = document.getElementById(`cat-${id}`)
  if (!el) return
  activeCat.value = id
  const bar = document.querySelector('.mbar')
  const y = el.getBoundingClientRect().top + window.scrollY - (bar?.offsetHeight || 0) - 80
  window.scrollTo({ top: y, behavior: 'smooth' })
}

function pickGroup(key) {
  groupKey.value = key
  query.value = ''
  const top = document.querySelector('.mbar')?.offsetTop
  if (top && window.scrollY > top) window.scrollTo({ top: top - 72, behavior: 'smooth' })
}

// faol chip lentada ko'rinib tursin
watch(activeCat, async (id) => {
  await nextTick()
  const el = chips.value?.querySelector(`[data-id="${id}"]`)
  if (el) chips.value.scrollTo({ left: el.offsetLeft - chips.value.offsetWidth / 2 + el.offsetWidth / 2, behavior: 'smooth' })
})

watch([shownCats, lang], async () => {
  activeCat.value = shownCats.value[0]?.id ?? null
  await nextTick()
  observe()
})
onMounted(observe)
onBeforeUnmount(() => io?.disconnect())

const isBar = computed(() => !found.value && (groupKey.value === 'bar' || groupKey.value === 'drinks'))
// suratli taomlar kartochka to'rida, suratsizlar (ichimliklar) — ixcham ro'yxatda
const split = (items) => ({ cards: items.filter((p) => p.img), rows: items.filter((p) => !p.img) })
</script>

<template>
  <div>
    <!-- ===== Ixcham sarlavha ===== -->
    <header class="mhead">
      <div class="mhead__card">
        <img src="/images/hero-grill-2.jpg" alt="" class="mhead__bg" aria-hidden="true" fetchpriority="high" />
        <div class="mhead__inner container container--wide">
          <nav class="mhead__crumbs" :aria-label="t.pages.home">
            <NuxtLink to="/">{{ t.pages.home }}</NuxtLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{{ t.menu.eyebrow }}</span>
          </nav>
          <h1 class="mhead__title">{{ t.menu.title }} <span class="accent-italic">{{ t.menu.accent }}</span></h1>
          <p class="mhead__text">{{ t.menu.text }}</p>
        </div>
      </div>
    </header>

    <!-- ===== Yopishqoq panel: bo'limlar, qidiruv, kategoriyalar ===== -->
    <div class="mbar">
      <div class="container container--wide mbar__inner">
        <div class="mbar__top">
          <div class="mbar__tabs" role="tablist" :aria-label="t.menu.categories">
            <button v-for="g in groups" :key="g.key" type="button" role="tab" class="mbar__tab"
              :class="{ 'is-active': !found && g.key === groupKey }" :aria-selected="!found && g.key === groupKey" @click="pickGroup(g.key)">
              {{ t.menu.groups[g.key] }}
            </button>
          </div>
          <label class="mbar__search">
            <Icon name="search" :size="18" />
            <span class="visually-hidden">{{ t.menu.search }}</span>
            <input v-model="query" type="search" :placeholder="t.menu.search" autocomplete="off" />
          </label>
        </div>
        <div v-if="shownCats.length > 1" ref="chips" class="mbar__chips">
          <button v-for="c in shownCats" :key="c.id" type="button" class="mbar__chip" :data-id="c.id"
            :class="{ 'is-active': c.id === activeCat }" @click="goCat(c.id)">
            {{ c.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- ===== Taomlar ===== -->
    <section class="section mlist">
      <div class="container container--wide">
        <div v-if="pending && !groups.length" class="mgrid" aria-hidden="true">
          <div v-for="i in 8" :key="i" class="mskeleton" />
        </div>

        <div v-else-if="error && !groups.length" class="mstate">
          <p>{{ t.menu.error }}</p>
          <button type="button" class="btn btn--primary" @click="refresh()">{{ t.menu.retry }}</button>
        </div>

        <p v-else-if="found && !found.length" class="mstate">{{ t.menu.empty }}</p>

        <template v-else>
          <p v-if="isBar" class="madult"><Icon name="shield" :size="18" />{{ t.menu.adult }}</p>
          <section v-for="c in shownCats" :id="`cat-${c.id}`" :key="`${groupKey}-${c.id}`" class="mcat" :data-id="c.id">
            <h2 class="mcat__title">{{ c.name }} <small>{{ c.items.length }}</small></h2>
            <ul v-if="split(c.items).cards.length" class="mgrid">
              <li v-for="d in split(c.items).cards" :key="d.id"><DishCard :dish="d" /></li>
            </ul>
            <ul v-if="split(c.items).rows.length" class="mrows">
              <li v-for="d in split(c.items).rows" :key="d.id"><DishCard :dish="d" /></li>
            </ul>
          </section>
        </template>
      </div>
    </section>

    <LeadForm />
  </div>
</template>

<style lang="scss" scoped>
// ---- Sarlavha: past to'q karta, fonda gril kadri ----
.mhead {
  --inset: 12px;

  padding: var(--inset) var(--inset) 0;

  @include down($bp-sm) {
    --inset: 8px;
  }
}

.mhead__card {
  isolation: isolate;
  position: relative;
  overflow: hidden;
  border-radius: clamp(20px, 2.4vw, 32px);
  background: var(--deep-2);
  color: #fff;
}

.mhead__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 55%;
  opacity: 0.55;
  mask-image: linear-gradient(90deg, transparent 0%, #000 70%);

  @include down($bp-md) {
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, #000 100%);
  }
}

.mhead__inner {
  padding-block: clamp(32px, 5vw, 72px);
}

.mhead__crumbs {
  display: flex;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.7);

  a:hover {
    color: #fff;
  }
}

.mhead__title {
  margin-top: var(--space-4);
  font-family: var(--font-display);
  font-size: clamp(38px, 5vw, 72px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;

  .accent-italic {
    color: var(--accent-on-dark);
  }
}

.mhead__text {
  margin-top: var(--space-3);
  max-width: 480px;
  color: rgba(255, 255, 255, 0.82);
}

// ---- Yopishqoq panel (header ostida) ----
.mbar {
  position: sticky;
  top: 72px;
  z-index: 50;
  margin-top: var(--space-4);
  background: rgb(var(--bg-rgb) / 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);

  @include down($bp-md) {
    top: 60px;
  }
}

.mbar__inner {
  display: grid;
  // minmax(0, …) — suriladigan tablar/chiplar qatori ustunni ekrandan kengaytirmasin
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-3);
  padding-block: var(--space-3);
}

.mbar__top {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);

  @include down($bp-md) {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: var(--space-3);
  }
}

.mbar__tabs,
.mbar__chips {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.mbar__tab {
  flex-shrink: 0;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--text);
  transition: background var(--t-fast), color var(--t-fast), border-color var(--t-fast);

  &:hover {
    border-color: var(--accent);
  }

  &.is-active {
    background: var(--accent-gradient);
    border-color: transparent;
    color: var(--accent-contrast);
  }
}

.mbar__search {
  position: relative;
  display: flex;
  align-items: center;
  width: min(320px, 100%);

  @include down($bp-md) {
    width: 100%;
  }

  :deep(svg) {
    position: absolute;
    left: 14px;
    color: var(--text-muted);
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 44px;
    padding: 0 16px 0 42px;
    border-radius: 999px;
    border: 1px solid var(--border-strong);
    background: var(--surface);
    font: inherit;
    font-size: var(--text-sm);
    color: var(--text);

    &:focus {
      outline: none;
      border-color: var(--accent);
      box-shadow: 0 0 0 3px var(--accent-soft);
    }
  }
}

.mbar__chip {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--surface-soft);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-secondary);
  transition: background var(--t-fast), color var(--t-fast);

  &:hover {
    color: var(--text);
  }

  &.is-active {
    background: var(--deep-1);
    color: #fff;
  }
}

// ---- Ro'yxat ----
.mlist {
  padding-top: var(--space-8);
}

.mcat {
  & + & {
    margin-top: var(--space-12);
  }
}

.mcat__title {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 600;

  small {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--text-muted);
  }
}

.mgrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: var(--space-5);
  margin: 0;
  padding: 0;
  list-style: none;

  @include down($bp-sm) {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }
}

.mrows {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-3);
  margin: var(--space-5) 0 0;
  padding: 0;
  list-style: none;

  @include down($bp-sm) {
    grid-template-columns: 1fr;
  }
}

.mskeleton {
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-lg);
  background: linear-gradient(100deg, var(--surface-soft) 30%, var(--surface) 50%, var(--surface-soft) 70%) 0 0 / 300% 100%;
  animation: shimmer 1.4s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: -150% 0;
  }
}

.mstate {
  display: grid;
  justify-items: center;
  gap: var(--space-4);
  padding: var(--space-16) 0;
  text-align: center;
  color: var(--text-secondary);
}

.madult {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--accent-soft);
  font-size: var(--text-sm);
  color: var(--text-secondary);

  :deep(svg) {
    flex-shrink: 0;
    color: var(--accent);
  }
}
</style>
