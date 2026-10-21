<script setup>
// Filiallar bloki: to'q panel, sarlavha va 5 ta filial kartochkasi
// (surat, nom, manzil — xaritaga, ish vaqti, telefon, «Qo'ng'iroq» / «Yo'nalish»).
// Kompyuterda: tepada 2 ta katta, pastda 3 ta kartochka (6 ustunli to'r).
// Planshetda: 2 ustun. Telefonda: gorizontal suriladigan lenta (scroll-snap) + nuqtalar.
// Bosh sahifa (#studios — menyudagi «Filiallar») va «Biz haqimizda» sahifasida.
import { HOURS, PHONE, STUDIO_GALLERY } from '~/utils/content'

const { t } = useLang()

// Telefondagi lenta: qaysi kartochka ko'rinib turgani (nuqtalar uchun)
const track = ref(null)
const current = ref(0)
let io = null
onMounted(() => {
  if (!('IntersectionObserver' in window)) return
  io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) current.value = Number(e.target.dataset.i)
  }, { root: track.value, threshold: 0.6 })
  track.value.querySelectorAll('.studio').forEach((el) => io.observe(el))
})
onBeforeUnmount(() => io?.disconnect())

function goTo(i) {
  const el = track.value?.querySelectorAll('.studio')[i]
  if (el) track.value.scrollTo({ left: el.offsetLeft - track.value.offsetLeft, behavior: 'smooth' })
}
</script>

<template>
  <section id="studios" class="section studios">
    <div class="container container--wide">
      <div class="studios__panel">
      <!-- logotip naqshi burchakda sekin aylanadi -->
      <img src="/images/logo-512.png" alt="" class="studios__ornament" aria-hidden="true" />
      <div class="studios__content">
      <div v-reveal class="studios__head">
        <div>
          <p class="eyebrow">{{ t.eyebrow.studios }}</p>
          <BigTitle light :line1="t.studios.title" :line2="t.studios.titleAccent" />
        </div>
        <p class="studios__text">{{ t.studios.text }}</p>
      </div>
      <div ref="track" class="studios__grid">
        <article v-for="(st, i) in STUDIO_GALLERY" :key="st.key" v-reveal="i" class="studio" :class="{ 'studio--big': i < 2 }" :data-i="i">
          <div class="studio__media">
            <PhotoPlaceholder v-if="st.photos.length" :src="st.photos[0]" ratio="16 / 10" label=""
              :alt="`Hammersmith ${t.studios.branches[st.key].name} — ${t.studios.photo}`" />
            <!-- surat hali yo'q: brend rangidagi joy ushlagich (logotip + filial nomi) -->
            <div v-else class="studio__ph" aria-hidden="true">
              <img src="/images/logo-128.png" alt="" width="56" height="56" loading="lazy" />
              <span>{{ t.studios.photoSoon }}</span>
            </div>
            <span class="studio__num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>
          <div class="studio__caption">
            <h3 class="studio__name">{{ t.studios.branches[st.key].name }}</h3>
            <a :href="st.map" target="_blank" rel="noopener" class="studio__row studio__address">
              <Icon name="pin" :size="16" />{{ t.studios.branches[st.key].address }}
            </a>
            <p class="studio__row"><Icon name="clock" :size="16" />{{ t.studios.hours }} {{ HOURS }}</p>
            <a :href="(st.phone || PHONE).href" class="studio__row studio__phone">
              <Icon name="phone" :size="16" />{{ (st.phone || PHONE).label }}
            </a>
            <div class="studio__actions">
              <a :href="(st.phone || PHONE).href" class="btn btn--primary studio__btn">{{ t.studios.call }}</a>
              <a :href="st.map" target="_blank" rel="noopener" class="studio__btn studio__btn--ghost">
                {{ t.studios.route }} <Icon name="arrow" :size="14" />
              </a>
            </div>
          </div>
        </article>
      </div>
      <div class="studios__dots" role="tablist" :aria-label="t.eyebrow.studios">
        <button v-for="(st, i) in STUDIO_GALLERY" :key="st.key" type="button" class="studios__dot" :class="{ 'is-active': i === current }"
          :aria-label="t.studios.branches[st.key].name" :aria-current="i === current" @click="goTo(i)" />
      </div>
      </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
// ---- Filiallar: to'q ko'mir-bordo panel ----
.studios__panel {
  position: relative;
  overflow: hidden;
  padding: var(--space-16) clamp(20px, 5vw, 80px);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(80% 70% at 100% 0%, rgb(var(--glow-rgb) / 0.32) 0%, transparent 60%),
    radial-gradient(60% 60% at 0% 100%, rgb(var(--glow-rgb) / 0.16) 0%, transparent 60%),
    linear-gradient(160deg, var(--deep-1) 0%, var(--deep-2) 100%);
  color: #fff;

  @include down($bp-sm) {
    padding: var(--space-10) 0;
    border-radius: var(--radius-lg);
  }

  .eyebrow {
    color: var(--accent-on-dark);
  }

  .section-title .accent-italic {
    color: var(--accent-on-dark);
  }
}

.studios__content {
  position: relative;
  max-width: 1240px;
  margin-inline: auto;
}

.studios__ornament {
  position: absolute;
  top: -140px;
  right: -140px;
  width: 460px;
  opacity: 0.08;
  border-radius: 50%;
  pointer-events: none;
  animation: ornament-spin 90s linear infinite;
}

@keyframes ornament-spin {
  to {
    transform: rotate(360deg);
  }
}

.studios__head {
  display: grid;
  gap: var(--space-6);

  @include down($bp-sm) {
    padding-inline: var(--space-4);
  }

  .studios__text {
    justify-self: end;

    @include down($bp-lg) {
      justify-self: start;
    }
  }
}

.studios__text {
  max-width: 460px;
  color: rgba(255, 255, 255, 0.75);
  font-size: var(--text-sm);
}

// 6 ustun: birinchi ikkitasi 3 tadan (katta), qolgan uchtasi 2 tadan
.studios__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-5);
  margin-top: var(--space-8);

  @include down($bp-lg) {
    grid-template-columns: 1fr 1fr;
  }

  // telefon: gorizontal lenta, kartochka ekranning ~85% i, keyingisi chetdan ko'rinib turadi
  @include down($bp-sm) {
    display: flex;
    gap: var(--space-3);
    margin-top: var(--space-6);
    padding: 0 var(--space-4) var(--space-2);
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--space-4);
    scrollbar-width: none;
    overscroll-behavior-x: contain;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.studio {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: background var(--t-hover), border-color var(--t-hover);

  &--big {
    grid-column: span 3;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.22);
  }

  @include down($bp-lg) {
    grid-column: auto;

    // 5-chi kartochka planshetda butun qatorni egallaydi
    &:last-child {
      grid-column: 1 / -1;
    }
  }

  @include down($bp-sm) {
    flex: 0 0 86%;
    scroll-snap-align: start;
  }
}

.studio__media {
  position: relative;

  :deep(.photo) {
    border-radius: var(--radius-md);
    border-color: rgba(255, 255, 255, 0.1);
  }

  :deep(.photo img) {
    transition: transform 0.6s var(--ease-out);
  }
}

@media (hover: hover) {
  .studio:hover :deep(.photo img) {
    transform: scale(1.03);
  }
}

.studio__ph {
  display: grid;
  place-content: center;
  justify-items: center;
  gap: var(--space-3);
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-md);
  background:
    radial-gradient(70% 80% at 50% 40%, rgb(var(--glow-rgb) / 0.35) 0%, transparent 70%),
    linear-gradient(160deg, rgb(255 255 255 / 0.06) 0%, rgb(0 0 0 / 0.25) 100%);
  border: 1px dashed rgba(255, 255, 255, 0.16);

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    opacity: 0.9;
  }

  span {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }
}

.studio__num {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  padding: 2px 10px;
  border-radius: 999px;
  background: rgb(var(--deep-rgb) / 0.6);
  backdrop-filter: blur(6px);
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-style: italic;
  color: var(--accent-on-dark);
}

.studio__caption {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  padding: var(--space-4) var(--space-2) var(--space-2);
}

.studio__name {
  margin-bottom: var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;

  .studio--big & {
    font-size: 26px;
  }
}

.studio__row {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  min-height: 32px;
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.8);

  :deep(svg) {
    flex-shrink: 0;
    color: var(--accent-on-dark);
  }
}

a.studio__row:hover {
  color: #fff;
  text-decoration: underline;
}

.studio__phone {
  font-weight: 600;
  color: #fff;
}

.studio__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-4);
}

.studio__btn {
  flex: 1;
  justify-content: center;
  min-height: 44px;
  padding-inline: var(--space-4);
  font-size: var(--text-sm);

  &--ghost {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    font-weight: 600;
    color: #fff;
    transition: background var(--t-fast), border-color var(--t-fast);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }
  }
}

// nuqtalar — faqat telefondagi lentada
.studios__dots {
  display: none;
  justify-content: center;
  gap: 8px;
  margin-top: var(--space-4);

  @include down($bp-sm) {
    display: flex;
  }
}

.studios__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.3);
  transition: width var(--t-fast), background var(--t-fast);

  &.is-active {
    width: 22px;
    background: var(--accent-on-dark);
  }
}

@include down($bp-md) {
  // sarlavha o'rtada bo'lgani uchun matnli bloklar ham o'rtada
  .studios__head,
  .studios__text {
    text-align: center;
    justify-self: center !important;
  }
}
</style>
