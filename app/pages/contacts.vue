<script setup>
// Kontaktlar: hero (raqam shisha kartochkada) → 3 ta tezkor plitka (qo'ng'iroq, Instagram, menyu) →
// ulkan lenta → 5 filial zigzag: xarita + manzil, ish vaqti, telefon (+ suratlar kelganda) → bron formasi
import { FOOTER, HOURS, INSTAGRAM, MENU_PAGE, PHONE, STUDIO_GALLERY } from '~/utils/content'

const { t } = useLang()
usePageSeo({
  title: () => t.value.pages.contacts.seo,
  description: () => t.value.pages.contacts.text,
  image: 'contacts',
})

const QUICK = [
  { icon: 'phone', href: PHONE.href, value: PHONE.label },
  { icon: 'instagram', href: INSTAGRAM.href, value: INSTAGRAM.handle, external: true },
  { icon: 'dish', href: MENU_PAGE, value: '' },
]

// Yandex xarita vidjeti (manzil bo'yicha qidiruv); xarita faqat ko'ringanda yuklanadi
const widget = (b) => `https://yandex.uz/map-widget/v1/?text=${encodeURIComponent(b.mapQuery)}&z=16`
</script>

<template>
  <div>
    <PageHero image="/images/hero-grill-2.jpg" position="center 50%" :alt="t.alt.heroGrill" ghost="Hello"
      :kicker="t.pages.contacts.eyebrow" :line1="t.pages.contacts.title" :line2="t.pages.contacts.accent"
      :text="t.pages.contacts.text" :cta="t.pages.contacts.cta" :cta-href="PHONE.href">
      <HeroGlass icon="phone" :title="t.pages.contacts.call">
        <a :href="PHONE.href" class="glass-call__phone">{{ PHONE.label }}</a>
        <div class="glass-call__socials">
          <component :is="s.href ? 'a' : 'span'" v-for="s in FOOTER.socials" :key="s.icon" :aria-label="s.label" :title="s.label"
            v-bind="s.href ? { href: s.href, target: '_blank', rel: 'noopener' } : {}">
            <Icon :name="s.icon" :size="18" />
          </component>
        </div>
      </HeroGlass>
    </PageHero>

    <!-- ===== Tezkor plitkalar ===== -->
    <section class="container quick-wrap">
      <ul class="quick">
        <li v-for="(q, i) in QUICK" :key="q.icon" v-reveal="i">
          <a v-spotlight :href="q.href" class="quick__tile" v-bind="q.external ? { target: '_blank', rel: 'noopener' } : {}">
            <span class="quick__icon"><Icon :name="q.icon" :size="24" /></span>
            <span class="quick__body">
              <strong>{{ t.pages.contacts.quick[i].title }}</strong>
              <span>{{ q.value || t.pages.contacts.quick[i].text }}</span>
              <small v-if="q.value">{{ t.pages.contacts.quick[i].text }}</small>
            </span>
            <span class="quick__arrow"><Icon name="arrow" :size="18" /></span>
          </a>
        </li>
      </ul>
    </section>

    <Marquee class="giant-marquee" variant="giant" :duration="50" :items="t.pages.contacts.marquee" />

    <!-- ===== Filiallar ===== -->
    <section class="section">
      <div class="container">
        <div v-reveal class="center-head">
          <p class="eyebrow">{{ t.pages.contacts.branchesEyebrow }}</p>
          <BigTitle :line1="t.pages.contacts.branchesTitle" :line2="t.pages.contacts.branchesAccent" />
        </div>

        <article v-for="(b, i) in STUDIO_GALLERY" :key="b.key" class="branch" :class="{ 'branch--flip': i % 2 }">
          <div v-reveal class="branch__map">
            <iframe :src="widget(b)" :title="`${t.pages.contacts.map}: ${t.studios.branches[b.key].name}`" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" />
          </div>
          <div v-reveal="1" class="branch__info">
            <span class="branch__index" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            <h2 class="branch__name">{{ t.studios.branches[b.key].name }}</h2>
            <p class="branch__addr"><Icon name="pin" :size="18" />{{ t.studios.branches[b.key].address }}</p>
            <p class="branch__addr"><Icon name="clock" :size="18" />{{ t.studios.hours }} {{ HOURS }}</p>
            <a :href="(b.phone || PHONE).href" class="branch__addr branch__phone"><Icon name="phone" :size="18" />{{ (b.phone || PHONE).label }}</a>
            <div v-if="b.photos.length" class="branch__photos">
              <img v-for="src in b.photos" :key="src" :src="src" :alt="t.studios.branches[b.key].name" loading="lazy" />
            </div>
            <a :href="b.map" target="_blank" rel="noopener" class="btn btn--primary branch__btn">
              {{ t.pages.contacts.route }} <Icon name="arrow" :size="16" />
            </a>
          </div>
        </article>
      </div>
    </section>

    <LeadForm />
  </div>
</template>

<style lang="scss" scoped>
// ---- Hero shisha kartochkasi ----
.glass-call__phone {
  display: block;
  font-size: 26px;
  font-weight: 600;
  white-space: nowrap;
  color: #fff;

  &:hover {
    color: var(--accent-on-dark);
  }
}

.glass-call__socials {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-4);

  > * {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgb(255 255 255 / 0.1);
    border: 1px solid rgb(255 255 255 / 0.2);
    color: #fff;
    transition: background var(--t-fast), transform var(--t-fast);
  }

  > a:hover {
    background: rgb(255 255 255 / 0.22);
    transform: translateY(-2px);
  }
}

// ---- Tezkor plitkalar: hero ostiga biroz chiqib turadi ----
.quick-wrap {
  position: relative;
  z-index: 3;
  margin-top: var(--space-6);

  @include down($bp-md) {
    margin-top: var(--space-4);
  }
}

.quick {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;

  @include down($bp-lg) {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
}

.quick__tile {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  height: 100%;
  padding: var(--space-5);
  border-radius: var(--radius-xl);
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  transition: transform var(--t-hover), box-shadow var(--t-hover);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
}

.quick__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: var(--accent-gradient);
  color: var(--accent-contrast);
  transition: transform 0.5s var(--ease-out);

  .quick__tile:hover & {
    transform: rotate(-10deg) scale(1.06);
  }
}

.quick__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 2px;

  strong {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  > span {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--text);
  }

  small {
    font-size: var(--text-xs);
    color: var(--text-secondary);
  }
}

.quick__arrow {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  color: var(--accent);
  transition: transform var(--t-hover), background var(--t-hover);

  .quick__tile:hover & {
    background: var(--accent-soft);
    transform: rotate(-45deg);
  }
}

.giant-marquee {
  margin-top: var(--space-12);

  @include down($bp-md) {
    margin-top: var(--space-8);
  }
}

.center-head {
  margin-bottom: var(--space-10);
  text-align: center;

  :deep(.big-title__line--accent) {
    margin-left: 0;
  }

  @include down($bp-md) {
    margin-bottom: var(--space-6);
  }
}

// ---- Filiallar: xarita va ma'lumot zigzag ----
.branch {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: var(--space-10);

  & + & {
    margin-top: var(--space-12);
  }

  &--flip .branch__map {
    order: 2;
  }

  @include down($bp-lg) {
    grid-template-columns: 1fr;
    gap: var(--space-5);

    & + & {
      margin-top: var(--space-10);
    }

    &--flip .branch__map {
      order: 0;
    }
  }
}

.branch__map {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-xl);
  background: var(--surface-soft);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
}

.branch__info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
}

.branch__index {
  position: absolute;
  top: -0.35em;
  right: 0;
  font-family: var(--font-display);
  font-size: clamp(80px, 9vw, 140px);
  font-style: italic;
  font-weight: 600;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px var(--border-strong);
  pointer-events: none;
}

.branch__name {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 600;
  line-height: 1.05;
}

.branch__addr {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-lg);
  font-weight: 600;

  :deep(svg) {
    color: var(--accent);
    flex-shrink: 0;
  }
}

// ish vaqti va telefon — manzildan kichikroq
.branch__addr + .branch__addr {
  font-size: var(--text-base);
  font-weight: 500;
  color: var(--text-secondary);
}

a.branch__phone:hover {
  color: var(--accent);
}

.branch__photos {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-2);

  img {
    width: 120px;
    height: 90px;
    object-fit: cover;
    border-radius: var(--radius-lg);
    transition: transform var(--t-hover);

    &:nth-child(2) {
      transform: rotate(3deg) translateY(6px);
    }

    &:hover {
      transform: scale(1.06) rotate(-2deg);
    }
  }
}

.branch__btn {
  margin-top: var(--space-3);
}
</style>
