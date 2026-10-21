<script setup>
// Maxfiylik siyosati: matnli sarlavha (suratli bannersiz — hujjat sahifasi) → «qisqacha» (3 kafolat) → chapda yopishqoq mundarija
// (o'qilayotgan bo'lim belgilanadi, o'qish progressi) va o'ngda raqamli bo'limlar. Matn — utils/privacy.js
import { INSTAGRAM, LEGAL, PHONE, STUDIO_GALLERY } from '~/utils/content'
import { PRIVACY, PRIVACY_UPDATED } from '~/utils/privacy'

const { t, lang } = useLang()
const doc = computed(() => PRIVACY[lang.value])
usePageSeo({
  title: () => doc.value.seo,
  description: () => doc.value.lead,
})

const legalRows = computed(() => Object.entries(LEGAL).filter(([, v]) => v).map(([k, v]) => ({ label: doc.value.legalLabels[k], value: v })))

// ---- mundarija: ekrandagi bo'lim va o'qish progressi ----
const active = ref('general')
const progress = ref(0)
const article = ref(null)
const toc = ref(null)
let io = null
let ticking = false

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    ticking = false
    const el = article.value
    if (!el) return
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight
    progress.value = Math.min(1, Math.max(0, (vh * 0.3 - r.top) / Math.max(1, r.height - vh * 0.5)))
  })
}

onMounted(() => {
  // telefon/planshetda mundarija yopiq turadi — matn darhol ko'rinsin
  if (window.matchMedia('(max-width: 1023px)').matches) toc.value.open = false
  io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) active.value = e.target.id
  }, { rootMargin: '-25% 0px -65% 0px' })
  article.value.querySelectorAll('.pp__section').forEach((s) => io.observe(s))
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  io?.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div>
    <!-- ===== Sarlavha: yo'l, nom, qisqa matn va tahrir sanasi ===== -->
    <header class="container pp-head">
      <nav class="pp-head__crumbs" :aria-label="t.pages.home">
        <NuxtLink to="/">{{ t.pages.home }}</NuxtLink>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{{ doc.eyebrow }}</span>
      </nav>
      <div v-reveal class="pp-head__body">
        <BigTitle tag="h1" :line1="doc.title" :line2="doc.accent" />
        <p class="pp-head__lead">{{ doc.lead }}</p>
        <p class="pp-head__date"><Icon name="shield" :size="16" />{{ doc.updated }} {{ PRIVACY_UPDATED }}</p>
      </div>
    </header>

    <!-- ===== Qisqacha: 3 asosiy kafolat ===== -->
    <section class="container pp-summary" :aria-label="doc.summaryTitle">
      <ul class="pp-summary__list">
        <li v-for="(s, i) in doc.summary" :key="i" v-reveal="i" v-spotlight class="pp-summary__item">
          <span class="pp-summary__icon"><Icon :name="s.icon" :size="22" /></span>
          <p>{{ s.text }}</p>
        </li>
      </ul>
    </section>

    <section class="section">
      <div class="container pp">
        <!-- Mundarija: kompyuterda yopishqoq, telefonda ochiladigan ro'yxat -->
        <aside class="pp__aside">
          <details ref="toc" class="pp__toc" open>
            <summary>{{ doc.toc }} <Icon name="chevron" :size="16" /></summary>
            <ol>
              <li v-for="(s, i) in doc.sections" :key="s.id">
                <a :href="`#${s.id}`" :class="{ 'is-active': active === s.id }">
                  <span>{{ String(i + 1).padStart(2, '0') }}</span>{{ s.title }}
                </a>
              </li>
            </ol>
            <div class="pp__progress" aria-hidden="true"><i :style="{ transform: `scaleX(${progress})` }" /></div>
          </details>
        </aside>

        <article ref="article" class="pp__body">
          <section v-for="(s, i) in doc.sections" :id="s.id" :key="s.id" class="pp__section">
            <span class="pp__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <h2>{{ s.title }}</h2>
            <template v-for="(b, j) in s.body" :key="j">
              <p v-if="typeof b === 'string'">{{ b }}</p>
              <ul v-else>
                <li v-for="(li, k) in b.list" :key="k">{{ li }}</li>
              </ul>
            </template>

            <!-- Aloqa bo'limi: haqiqiy kontaktlar va (to'ldirilgan bo'lsa) yuridik rekvizitlar -->
            <div v-if="s.id === 'contacts'" class="pp__contacts">
              <a :href="PHONE.href" class="pp__contact">
                <Icon name="phone" :size="20" /><span><small>{{ doc.contactPhone }}</small>{{ PHONE.label }}</span>
              </a>
              <a :href="INSTAGRAM.href" target="_blank" rel="noopener" class="pp__contact">
                <Icon name="instagram" :size="20" /><span><small>{{ doc.contactInstagram }}</small>{{ INSTAGRAM.handle }}</span>
              </a>
              <div class="pp__contact">
                <Icon name="pin" :size="20" />
                <span>
                  <small>{{ doc.contactBranches }}</small>
                  <template v-for="b in STUDIO_GALLERY" :key="b.key">{{ t.studios.branches[b.key].name }} — {{ t.studios.branches[b.key].address }}<br /></template>
                </span>
              </div>
              <dl v-if="legalRows.length" class="pp__legal">
                <dt class="pp__legal-title">{{ doc.legalTitle }}</dt>
                <div v-for="r in legalRows" :key="r.label"><dt>{{ r.label }}</dt><dd>{{ r.value }}</dd></div>
              </dl>
            </div>
          </section>
        </article>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
// ---- Qisqacha ----
// ---- Sarlavha ----
.pp-head {
  padding-top: var(--space-8);

  @include down($bp-md) {
    padding-top: var(--space-5);
  }
}

.pp-head__crumbs {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--text-muted);

  a:hover {
    color: var(--accent);
  }

  @include down($bp-md) {
    justify-content: center;
    margin-bottom: var(--space-5);
  }
}

.pp-head__body {
  // telefonda sarlavha (BigTitle) markazda — matn va sana ham markazda
  @include down($bp-md) {
    text-align: center;
  }

  // telefonda uzun so'z («конфиденциальности») sig'masa — bo'g'in bo'yicha ko'chadi
  :deep(.big-title__line) {
    max-width: 100%;
    overflow-wrap: break-word;
    hyphens: auto;
  }
}

.pp-head__lead {
  max-width: 620px;
  margin-top: var(--space-5);
  font-size: var(--text-lg);
  color: var(--text-secondary);

  @include down($bp-md) {
    font-size: var(--text-base);
  }
}

.pp-head__date {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-5);
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--accent-soft);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--accent);
}

// ---- Qisqacha ----
.pp-summary {
  margin-top: var(--space-10);

  @include down($bp-md) {
    margin-top: var(--space-6);
  }
}

.pp-summary__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;

  @include down($bp-md) {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-3);
  }
}

.pp-summary__item {
  @include card;
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5);
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1.45;
}

.pp-summary__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: var(--accent-gradient);
  color: var(--accent-contrast);
}

// ---- Asosiy qism: mundarija + matn ----
.pp {
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  align-items: start;
  gap: var(--space-12);

  @include down($bp-lg) {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
  }
}

.pp__aside {
  position: sticky;
  top: 100px;

  @include down($bp-lg) {
    position: static;
  }
}

.pp__toc {
  padding: var(--space-5);
  border-radius: var(--radius-xl);
  background: var(--surface);
  border: 1px solid var(--border);

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-4);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    list-style: none;
    cursor: pointer;

    &::-webkit-details-marker {
      display: none;
    }

    :deep(svg) {
      transition: transform var(--t-hover);
    }

    // kompyuterda mundarija doim ochiq — strelka kerak emas
    @include up($bp-lg) {
      pointer-events: none;

      :deep(svg) {
        display: none;
      }
    }
  }

  &:not([open]) summary {
    margin-bottom: 0;

    :deep(svg) {
      transform: rotate(-90deg);
    }
  }

  ol {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    display: flex;
    gap: var(--space-3);
    padding: 8px 10px;
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    font-weight: 500;
    line-height: 1.35;
    color: var(--text-secondary);
    transition: background var(--t-fast), color var(--t-fast);

    span {
      flex-shrink: 0;
      font-family: var(--font-display);
      font-style: italic;
      color: var(--text-muted);
    }

    &:hover {
      color: var(--accent);
    }

    &.is-active {
      background: var(--accent-soft);
      color: var(--accent);
      font-weight: 600;

      span {
        color: var(--accent);
      }
    }
  }
}

.pp__progress {
  height: 3px;
  margin-top: var(--space-4);
  overflow: hidden;
  border-radius: 3px;
  background: var(--border);

  i {
    display: block;
    height: 100%;
    background: var(--accent-gradient);
    transform-origin: left;
    transition: transform 0.15s linear;
  }

  @include down($bp-lg) {
    display: none;
  }
}

// ---- Bo'limlar ----
.pp__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  max-width: 760px;

  @include down($bp-md) {
    gap: var(--space-10);
  }
}

.pp__section {
  position: relative;
  isolation: isolate;
  scroll-margin-top: 100px;
  color: var(--text-secondary);
  font-size: var(--text-base);
  line-height: 1.7;

  h2 {
    margin-bottom: var(--space-4);
    font-family: var(--font-display);
    font-size: clamp(26px, 2.6vw, 34px);
    font-weight: 600;
    line-height: 1.15;
    color: var(--text);
  }

  p + p,
  p + ul,
  ul + p {
    margin-top: var(--space-3);
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin: var(--space-3) 0 0;
    padding: 0;
    list-style: none;

    li {
      position: relative;
      padding-left: var(--space-6);

      &::before {
        content: '';
        position: absolute;
        top: 0.7em;
        left: 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--accent-gradient);
      }
    }
  }

  @include down($bp-md) {
    font-size: var(--text-sm);
  }
}

// katta kontur raqam — sarlavha ortida
.pp__num {
  position: absolute;
  top: -0.42em;
  right: 0;
  z-index: -1;
  font-family: var(--font-display);
  font-size: clamp(72px, 8vw, 110px);
  font-style: italic;
  font-weight: 500;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px var(--border-strong);
  pointer-events: none;
}

// ---- Aloqa ----
.pp__contacts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin-top: var(--space-5);

  @include down($bp-md) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.pp__contact {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1.5;
  color: var(--text);

  :deep(svg) {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--accent);
  }

  small {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  // filiallar — butun en bo'ylab
  &:nth-child(3) {
    grid-column: 1 / -1;
  }
}

a.pp__contact {
  transition: border-color var(--t-hover), transform var(--t-hover);

  &:hover {
    border-color: var(--accent-soft);
    transform: translateY(-2px);
  }
}

.pp__legal {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-lg);
  background: var(--surface-soft);
  font-size: var(--text-sm);

  div {
    display: flex;
    gap: var(--space-3);
  }

  dt {
    min-width: 140px;
    color: var(--text-muted);
  }

  dd {
    margin: 0;
    font-weight: 600;
    color: var(--text);
  }
}

.pp__legal-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
