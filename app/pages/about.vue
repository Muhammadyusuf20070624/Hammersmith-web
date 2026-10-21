<script setup>
// Biz haqimizda: hero → ishonch qatori → ulkan lenta → matn (suratlar to'plami) →
// menyuning uch ustuni (to'q panel, spotlight) → «yonuvchi matn» → filiallar → menyu bloki → bron formasi
import { ABOUT_STACK, MENU_PAGE } from '~/utils/content'

const { t } = useLang()
usePageSeo({
  title: () => t.value.pages.about.seo,
  description: () => t.value.pages.about.text,
  image: 'about',
})

const aboutPhotos = computed(() => ABOUT_STACK.map((src, i) => ({ src, alt: t.value.about.photos[i], caption: t.value.about.photos[i] })))
const PROOF_AVATARS = ['tomahawk', 'ribs', 'beerset', 'burger'].map((n) => `/images/dish-${n}.jpg`)
const VALUE_ICONS = ['flame', 'beer', 'users']
// Menyu bloki suratlari (emenu)
const MENU_SHOTS = ['ribeye', 'meathunt', 'craft', 'amber'].map((n) => `/images/dish-${n}.jpg`)
</script>

<template>
  <div>
    <PageHero image="/images/hero-grill-3.jpg" position="40% 50%" :alt="t.alt.heroFire" ghost="Steak"
      :kicker="t.pages.about.eyebrow" :line1="t.pages.about.title" :line2="t.pages.about.accent"
      :text="t.pages.about.text" :cta="t.pages.about.cta">
      <HeroGlass :avatars="PROOF_AVATARS" :title="t.hero.proofTitle" :text="t.hero.proofText" />
    </PageHero>

    <TrustStrip :items="t.trust" :label="t.pages.about.eyebrow" />

    <Marquee class="giant-marquee" variant="giant" reverse :duration="60" :items="['Hammersmith', 'Steaks', 'Beer', 'Atmosphere']" />

    <!-- ===== Biz haqimizda ===== -->
    <section class="section">
      <div class="container ab">
        <PhotoStack v-reveal v-scroll-fx class="ab__stack" :photos="aboutPhotos" />
        <div v-reveal="1" class="ab__text">
          <p class="eyebrow">{{ t.eyebrow.about }}</p>
          <BigTitle :line1="t.about.title" :line2="t.about.titleAccent" />
          <p v-for="(text, i) in t.about.paragraphs" :key="i">{{ text }}</p>
        </div>
      </div>
    </section>

    <!-- ===== Uch ustun: to'q panel, kartochkalarda sichqoncha ortidan yorug'lik ===== -->
    <section class="container container--wide">
      <div class="values">
        <div v-reveal class="values__head">
          <p class="eyebrow eyebrow--light">{{ t.pages.about.valuesEyebrow }}</p>
          <BigTitle light :line1="t.pages.about.valuesTitle" :line2="t.pages.about.valuesAccent" />
        </div>
        <ul class="values__list">
          <li v-for="(v, i) in t.pages.about.values" :key="i" v-reveal="i + 1" v-spotlight class="value">
            <span class="value__icon"><Icon :name="VALUE_ICONS[i]" :size="26" /></span>
            <h3>{{ v.title }}</h3>
            <p>{{ v.text }}</p>
            <span class="value__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ===== «Yonuvchi matn» ===== -->
    <section class="section statement">
      <div class="container">
        <span class="statement__icon"><Icon name="flame" :size="32" /></span>
        <ScrollText :text="t.statement" />
      </div>
    </section>

    <StudiosSection />

    <!-- ===== Menyu ===== -->
    <section class="section">
      <div class="container mblock">
        <div v-reveal class="mblock__text">
          <p class="eyebrow">{{ t.pages.about.menuEyebrow }}</p>
          <BigTitle :line1="t.pages.about.menuTitle" :line2="t.pages.about.menuAccent" />
          <p>{{ t.pages.about.menuText }}</p>
          <NuxtLink :to="MENU_PAGE" class="btn btn--primary mblock__btn">
            {{ t.pages.about.menuLink }} <Icon name="arrow" :size="16" />
          </NuxtLink>
        </div>
        <ul v-reveal="1" class="mblock__grid" aria-hidden="true">
          <li v-for="src in MENU_SHOTS" :key="src"><img :src="src" alt="" loading="lazy" width="500" height="500" /></li>
        </ul>
      </div>
    </section>

    <LeadForm />
  </div>
</template>

<style lang="scss" scoped>
.giant-marquee {
  margin-top: var(--space-12);

  @include down($bp-md) {
    margin-top: var(--space-8);
  }
}

// ---- Biz haqimizda ----
.ab {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  align-items: center;
  gap: var(--space-12);

  @include down($bp-lg) {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}

.ab__stack {
  aspect-ratio: 5 / 4;
}

.ab__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  color: var(--text-secondary);

  .eyebrow {
    margin-bottom: 0;
  }

  .big-title {
    margin-bottom: var(--space-3);
  }
}

// ---- Qadriyatlar ----
.values {
  position: relative;
  overflow: hidden;
  padding: clamp(40px, 6vw, 88px) clamp(20px, 5vw, 72px);
  border-radius: clamp(20px, 2.4vw, 32px);
  background:
    radial-gradient(60% 70% at 100% 0%, rgb(var(--glow-rgb) / 0.35) 0%, transparent 60%),
    radial-gradient(50% 60% at 0% 100%, rgb(var(--glow-rgb) / 0.2) 0%, transparent 60%),
    linear-gradient(160deg, var(--deep-1) 0%, var(--deep-2) 100%);
  color: #fff;
}

.eyebrow--light {
  color: var(--accent-on-dark);
}

.values__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin: var(--space-10) 0 0;
  padding: 0;
  list-style: none;

  @include down($bp-lg) {
    grid-template-columns: minmax(0, 1fr);
    margin-top: var(--space-6);
  }
}

.value {
  --spot: rgb(255 255 255 / 0.14);

  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  min-height: 240px;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background: rgb(255 255 255 / 0.06);
  border: 1px solid rgb(255 255 255 / 0.12);
  transition: transform var(--t-hover), border-color var(--t-hover);

  &:hover {
    transform: translateY(-6px);
    border-color: rgb(255 255 255 / 0.28);
  }

  h3 {
    margin-top: auto;
    font-family: var(--font-display);
    font-size: clamp(22px, 2vw, 28px);
    font-weight: 600;
    overflow-wrap: anywhere;
    hyphens: auto;
  }

  p {
    font-size: var(--text-sm);
    color: rgb(255 255 255 / 0.75);
  }

  @include down($bp-lg) {
    min-height: 0;
  }
}

.value__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.1);
  color: var(--accent-on-dark);
  transition: transform 0.5s var(--ease-out);

  .value:hover & {
    transform: rotate(-12deg) scale(1.1);
  }

  @include down($bp-lg) {
    margin-bottom: var(--space-3);
  }
}

.value__num {
  position: absolute;
  top: var(--space-5);
  right: var(--space-6);
  font-family: var(--font-display);
  font-size: 64px;
  font-style: italic;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgb(255 255 255 / 0.2);
}

// ---- «Yonuvchi matn» ----
.statement {
  text-align: center;
}

.statement__icon {
  display: inline-grid;
  margin-bottom: var(--space-6);
  color: var(--accent);
}

// ---- Menyu: chapda matn, o'ngda 2×2 taom suratlari ----
.mblock {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  align-items: center;
  gap: var(--space-12);

  @include down($bp-lg) {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}

.mblock__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
  color: var(--text-secondary);

  .eyebrow {
    margin-bottom: 0;
  }
}

.mblock__btn {
  margin-top: var(--space-3);
}

.mblock__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;

  // ikkinchi ustun biroz pastda — «zinapoya»
  li:nth-child(even) {
    transform: translateY(var(--space-8));
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
  }

  @include down($bp-sm) {
    gap: var(--space-3);

    li:nth-child(even) {
      transform: translateY(var(--space-5));
    }
  }
}

@include down($bp-md) {
  .statement__icon {
    margin-bottom: var(--space-4);
  }
}
</style>
