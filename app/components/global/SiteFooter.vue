<script setup>
// Yakuniy to'q karta (Aluna uslubida): tepada katta CTA, ostida footer — hammasi bitta
// yumaloq karta ichida, fonda surat. Karta chekkasi bosh blok kartasi bilan bir xil.
import { BRAND, FOOTER, IMAGES, LANDING, NAV, OFFER_HREF, PHONE, PRIVACY_PAGE, STUDIO_GALLERY } from '~/utils/content'

const { t } = useLang()
const { go, hrefOf } = useSectionNav()
// CTA: forma shu sahifada bo'lsa — unga, aks holda (masalan, «Tez orada» sahifasida) bosh sahifadagi formaga
const ctaGo = () => go(document.getElementById('form') ? { hash: 'form' } : { page: LANDING, hash: 'form' })
</script>

<template>
  <footer id="contacts" class="site-footer">
    <div class="site-footer__card">
      <img :src="IMAGES.cta" alt="" class="site-footer__bg" loading="lazy" aria-hidden="true" />

      <div class="site-footer__inner container container--wide">
        <!-- CTA -->
        <div v-reveal class="site-footer__cta">
          <span class="site-footer__icon"><Icon name="flame" :size="30" /></span>
          <h2 class="site-footer__heading">{{ t.cta.title }} <span class="accent-italic">{{ t.cta.titleAccent }}</span></h2>
          <p class="site-footer__lead">{{ t.cta.lead }}</p>
          <a href="/#form" class="btn btn--primary site-footer__btn" @click.prevent="ctaGo">
            {{ t.cta.button }}
            <span class="site-footer__btn-icon"><Icon name="arrow" :size="16" /></span>
          </a>
        </div>

        <!-- Footer -->
        <div class="site-footer__grid">
          <div class="site-footer__col site-footer__brand">
            <div class="site-footer__logo">
              <img :src="BRAND.logo" alt="" width="44" height="44" />
              <span>
                <strong>{{ BRAND.name }}</strong>
                <small>{{ BRAND.tagline }}</small>
              </span>
            </div>
            <p class="site-footer__about">{{ t.footer.about }}</p>
            <div class="site-footer__socials">
              <component :is="s.href ? 'a' : 'span'" v-for="s in FOOTER.socials" :key="s.icon" :aria-label="s.label" :title="s.label"
                v-bind="s.href ? { href: s.href, target: '_blank', rel: 'noopener' } : {}">
                <Icon :name="s.icon" :size="20" />
              </component>
            </div>
          </div>

          <nav class="site-footer__col" :aria-label="t.footer.siteTitle">
            <h2 class="site-footer__title">{{ t.footer.siteTitle }}</h2>
            <a v-for="item in NAV" :key="item.key" :href="hrefOf(item)" class="site-footer__link" @click.prevent="go(item)">
              {{ t.nav[item.key] }}
            </a>
          </nav>

          <div class="site-footer__col">
            <h2 class="site-footer__title">{{ t.footer.branchesTitle }}</h2>
            <a v-for="b in STUDIO_GALLERY" :key="b.key" :href="b.map" target="_blank" rel="noopener" class="site-footer__branch">
              <strong>{{ t.studios.branches[b.key].name }}</strong>
              <span>{{ t.studios.branches[b.key].address }}</span>
            </a>
          </div>

          <div class="site-footer__col site-footer__contacts">
            <h2 class="site-footer__title">{{ t.footer.contactsTitle }}</h2>
            <p class="site-footer__muted">{{ t.footer.salesLabel }}</p>
            <a :href="PHONE.href" class="site-footer__phone">{{ PHONE.label }}</a>
            <p class="site-footer__muted site-footer__hours">{{ t.footer.hours }}</p>
          </div>
        </div>

        <div class="site-footer__bottom">
          <span>{{ t.footer.copyright }}</span>
          <nav class="site-footer__links">
            <a v-if="OFFER_HREF" :href="OFFER_HREF" target="_blank" rel="noopener">{{ t.footer.offer }}</a>
            <NuxtLink :to="PRIVACY_PAGE" class="site-footer__doc">{{ t.footer.privacy }}</NuxtLink>
            <!-- Sayt ishlab chiquvchisi (BiletMax saytidagi kabi) -->
            <span class="site-footer__credit">
              {{ t.footer.madeBy }}
              <a href="https://osg.uz" target="_blank" rel="noopener noreferrer">Online Service Group</a>
            </span>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  --inset: 12px;

  margin-top: var(--space-16);
  padding: 0 var(--inset) var(--inset);

  // telefonda chetlarga yopishadi (to'liq kenglik), faqat tepa burchaklari yumaloq.
  // --inset nolga — ichki bo'shliq (wide-pad − inset) ham to'liq qoladi, matn chetga yopishmaydi
  @include down($bp-sm) {
    --inset: 0px;
  }
}

.site-footer__card {
  position: relative;
  overflow: hidden;
  border-radius: clamp(20px, 2.4vw, 32px);

  @include down($bp-sm) {
    border-radius: 24px 24px 0 0;
  }
  background:
    radial-gradient(80% 60% at 100% 0%, rgb(var(--glow-rgb) / 0.3) 0%, transparent 60%),
    linear-gradient(160deg, var(--deep-1) 0%, var(--deep-2) 100%);
  color: #fff;
}

// Fon surati faqat CTA qismida ko'rinadi, pastga qarab so'nadi — footer matni toza fonda
.site-footer__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  opacity: 0.32;
  mask-image: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.6) 35%, transparent 62%);
  pointer-events: none;
}

.site-footer__inner {
  position: relative;
  z-index: 1;
  max-width: calc(#{$container-wide} - var(--inset) * 2);
  padding: clamp(64px, 9vw, 140px) calc(var(--wide-pad) - var(--inset)) var(--space-6);
}

// ---- CTA ----
.site-footer__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 820px;
  margin-inline: auto;
  text-align: center;
}

.site-footer__icon {
  color: var(--accent-on-dark);
}

.site-footer__heading {
  margin-top: var(--space-5);
  font-family: var(--font-display);
  font-size: clamp(34px, 4.6vw, 68px);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.025em;
  text-wrap: balance;

  .accent-italic {
    color: var(--accent-on-dark);
  }
}

.site-footer__lead {
  margin-top: var(--space-5);
  max-width: 560px;
  font-size: var(--text-base);
  color: rgba(255, 255, 255, 0.78);
}

.site-footer__btn {
  margin-top: var(--space-8);
  padding: 8px 8px 8px 26px;
  gap: var(--space-4);
  font-size: var(--text-base);
}

.site-footer__btn-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
}

// ---- Footer ----
.site-footer__grid {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 1.1fr 1fr;
  gap: var(--space-10) var(--space-8);
  margin-top: clamp(64px, 9vw, 120px);
  padding-top: var(--space-10);
  border-top: 1px solid rgba(255, 255, 255, 0.14);

  @include down($bp-lg) {
    grid-template-columns: 1fr 1fr;
  }

  // telefon (Aluna): brend — butun en, «Sayt» va «Filiallar» — ikki ustun, kontaktlar — butun en
  @include down($bp-sm) {
    gap: var(--space-8) var(--space-5);

    .site-footer__brand,
    .site-footer__contacts {
      grid-column: 1 / -1;
    }
  }
}

.site-footer__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.site-footer__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);

  img {
    width: 44px;
    height: 44px;
  }

  span {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
  }

  strong {
    font-family: var(--font-display);
    font-size: 20px;
    font-weight: 600;
  }

  small {
    margin-top: 4px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
  }
}

.site-footer__title {
  margin-bottom: var(--space-1);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.site-footer__muted {
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.65);
}

.site-footer__row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 40px;
  font-size: var(--text-sm);
  font-weight: 600;

  :deep(svg) {
    color: var(--accent-on-dark);
    flex-shrink: 0;
  }
}

a.site-footer__row:hover {
  color: var(--accent-on-dark);
}

.site-footer__socials {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-5);

  > * {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.18);
    color: #fff;
    transition: background var(--t-fast), border-color var(--t-fast);

    &:is(a):hover {
      background: rgba(255, 255, 255, 0.16);
      border-color: rgba(255, 255, 255, 0.35);
    }
  }
}

.site-footer__hours {
  margin-top: var(--space-3);
}


.site-footer__about {
  max-width: 320px;
  margin-top: var(--space-3);
  font-size: var(--text-sm);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.78);
}

.site-footer__link {
  display: flex;
  align-items: center;
  min-height: 36px;
  font-size: var(--text-base);
  font-weight: 600;
  color: #fff;

  &:hover {
    color: var(--accent-on-dark);
  }
}

.site-footer__branch {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-block: 6px;

  strong {
    font-size: var(--text-base);
    font-weight: 600;
    color: #fff;
  }

  span {
    font-size: var(--text-xs);
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.65);
  }

  &:hover strong {
    color: var(--accent-on-dark);
  }
}

.site-footer__phone {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  font-size: var(--text-xl);
  font-weight: 600;
  color: #fff;

  &:hover {
    color: var(--accent-on-dark);
  }
}

.site-footer__bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-10);
  padding-top: var(--space-5);
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  font-size: var(--text-xs);
  color: rgba(255, 255, 255, 0.6);

  // telefonda pastki suzuvchi tugmalar (yuqoriga / palitra) oxirgi qatorni yopmasin
  @include down($bp-sm) {
    flex-direction: column;
    padding-bottom: 64px;
  }
}

// BiletMax'dagidek: oddiy mualliflik izohi — chiziqsiz, qalin emas, yonidagidan bir pog'ona yirik
.site-footer__credit a {
  display: inline-block;
  padding-block: 10px;
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: color var(--t-fast);

  &:hover {
    color: #fff;
  }
}

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 var(--space-5);

  a:hover {
    color: #fff;
  }
}
</style>
