<script setup>
import { BRAND, LANDING, NAV, PHONE } from '~/utils/content'

const { t } = useLang()

// Telefonda menyu yon panelda ochiladi; ochiq paytda sahifa aylanmaydi
const open = ref(false)
watch(open, (v) => {
  if (import.meta.client) document.documentElement.style.overflow = v ? 'hidden' : ''
})
const close = () => { open.value = false }
const { go, hrefOf } = useSectionNav()

// «Sinovga yozilish»: forma shu sahifada bo'lsa — unga, aks holda bosh sahifadagi formaga
function ctaGo() {
  close()
  if (document.getElementById('form')) go({ hash: 'form' })
  else go({ page: LANDING, hash: 'form' })
}
function navGo(item) {
  close()
  go(item)
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner container container--wide">
      <NuxtLink to="/" class="site-header__logo" :aria-label="BRAND.name">
        <img :src="BRAND.logo" alt="" width="44" height="44" />
        <span class="site-header__brand">
          <strong>{{ BRAND.name }}</strong>
          <small>{{ BRAND.tagline }}</small>
        </span>
      </NuxtLink>

      <nav class="site-header__nav" :aria-label="t.header.navLabel">
        <a v-for="item in NAV" :key="item.key" :href="hrefOf(item)" @click.prevent="navGo(item)">{{ t.nav[item.key] }}</a>
      </nav>

      <div class="site-header__actions">
        <a :href="PHONE.href" class="site-header__phone" :title="PHONE.label" :aria-label="PHONE.label">
          <Icon name="phone" :size="18" />
        </a>
        <LangSwitch class="site-header__lang" />
        <a href="/#form" class="btn btn--primary site-header__cta" @click.prevent="ctaGo">{{ t.header.cta }}</a>
        <button type="button" class="site-header__burger" :aria-label="t.header.openMenu" @click="open = true">
          <Icon name="menu" />
        </button>
      </div>
    </div>

    <!-- Header'da backdrop-filter bor — u ichidagi fixed elementni header chegarasida
         qamab qo'yadi. Shuning uchun mobil menyu body'ga chiqariladi -->
    <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open" class="drawer" @click.self="close">
        <div class="drawer__panel" role="dialog" aria-modal="true" :aria-label="t.header.menu">
          <button type="button" class="drawer__close" :aria-label="t.header.closeMenu" @click="close">
            <Icon name="close" />
          </button>
          <LangSwitch class="drawer__lang" align="left" />
          <a v-for="item in NAV" :key="item.key" :href="hrefOf(item)" class="drawer__link" @click.prevent="navGo(item)">{{ t.nav[item.key] }}</a>
          <a :href="PHONE.href" class="drawer__phone"><Icon name="phone" :size="18" />{{ PHONE.label }}</a>
          <a href="/#form" class="btn btn--primary btn--block" @click.prevent="ctaGo">{{ t.header.cta }}</a>
        </div>
      </div>
    </Transition>
    </Teleport>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: $z-header;
  background: rgb(var(--bg-rgb) / 0.86);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.site-header__inner {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  height: 72px;

  @include down($bp-md) {
    height: 60px;
    gap: var(--space-3);
  }
}

.site-header__logo {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--space-3);
  white-space: nowrap;

  img {
    width: 44px;
    height: 44px;
  }
}

.site-header__brand {
  display: flex;
  flex-direction: column;
  line-height: 1.1;

  strong {
    font-family: var(--font-display);
    font-size: 21px;
    font-weight: 600;
    color: var(--text);
  }

  // Shior — ilova splash ekranidagidek siyrak bosh harflar
  small {
    margin-top: 3px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  @include down($bp-sm) {
    small {
      display: none;
    }
  }
}

.site-header__nav {
  // logotip va o'ng tugmalar orasidagi bo'sh joyning o'rtasida
  flex: 1;
  justify-content: center;
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-secondary);
  // «О нас», «Biz haqimizda» kabi ikki so'zli bandlar ikki qatorga tushmasin
  white-space: nowrap;

  a:hover {
    color: var(--accent);
  }

  @include down($bp-header-nav) {
    display: none;
  }
}

// 1150–1279px: 6 bandli menyu ru/uz da sig'ishi uchun oraliqlar qisqaradi, logotip shiori yashiriladi
@media (min-width: $bp-header-nav) and (max-width: #{$bp-xl - 1px}) {
  .site-header__inner {
    gap: var(--space-4);
  }

  .site-header__nav {
    gap: var(--space-3);
  }

  .site-header__brand small {
    display: none;
  }

  .site-header__actions {
    gap: var(--space-2);
  }

  // keyinroq yozilgan .site-header__cta qoidasidan ustun turishi uchun — ota sinf bilan
  .site-header__actions .site-header__cta {
    padding-inline: 16px;
  }
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-left: auto;
}

// 1200px konteynerga logo, menyu, til tanlagich va tugma bilan to'liq raqam
// sig'maydi — headerda faqat ikonka (bosilsa qo'ng'iroq, ustiga borilsa raqam).
// To'liq raqam footer va mobil menyuda.
.site-header__phone {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  color: var(--accent);
  transition: border-color var(--t-fast);

  &:hover {
    border-color: var(--accent);
  }
}

// kabinet tugmasi — telefon tugmasi bilan bir xil dumaloq
.site-header__account {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  color: var(--accent);
  transition: border-color var(--t-fast), background var(--t-fast);

  &:hover,
  &.router-link-active {
    border-color: var(--accent);
    background: var(--accent-soft);
  }
}

.drawer__account {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--accent);
}

.site-header__lang {
  @include down($bp-header-nav) {
    display: none;
  }
}

.drawer__lang {
  align-self: flex-start;
  margin-bottom: var(--space-3);
}

.site-header__cta {
  padding: 11px 20px;

  @include down($bp-sm) {
    display: none;
  }
}

.site-header__burger {
  display: none;
  padding: var(--space-2);

  @include down($bp-header-nav) {
    display: flex;
  }
}

.drawer {
  position: fixed;
  inset: 0;
  z-index: $z-drawer;
  background: rgba(30, 26, 51, 0.32);
  // chiqib ketayotgan panel sahifaga gorizontal scroll qo'shmasin
  overflow: hidden;
}

.drawer__panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: min(320px, 86vw);
  padding: var(--space-16) var(--space-6) var(--space-6);
  background: var(--surface);
}

.drawer__close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  padding: var(--space-2);
}

.drawer__link {
  padding: var(--space-3) 0;
  font-weight: 600;
  font-size: var(--text-lg);
  border-bottom: 1px solid var(--border);
}

.drawer__phone {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin: var(--space-4) 0;
  font-weight: 600;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity var(--t-fast);

  .drawer__panel {
    transition: transform var(--t-fast);
  }
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;

  .drawer__panel {
    transform: translateX(100%);
  }
}

@include down($bp-sm) {
  .site-header__phone {
    display: none;
  }
}
</style>
