<script setup>
// VAQTINCHALIK panel: rang palitrasi va shriftlarni joyida almashtirib ko'rsatish.
// Tanlov shu brauzerda eslab qolinadi (localStorage). O'chirish: content.js → THEME_PANEL = false.
import { DISPLAY_FONTS, PALETTES, TEXT_FONTS } from '~/utils/themes'

const KEY = 'hs-theme'
const POS_KEY = 'hs-theme-pos'
const open = ref(false)
const state = reactive({ palette: 'bordeaux', display: 'playfair', text: 'onest' })

function loadFont(f) {
  const id = `wk-font-${f.spec.split(':')[0]}`
  if (document.getElementById(id)) return
  const l = document.createElement('link')
  l.id = id
  l.rel = 'stylesheet'
  l.href = `https://fonts.googleapis.com/css2?family=${f.spec}&display=swap`
  document.head.appendChild(l)
}

function apply() {
  const root = document.documentElement.style
  const p = PALETTES.find((x) => x.key === state.palette) || PALETTES[0]
  for (const [k, v] of Object.entries(p.vars)) root.setProperty(k, v)
  const d = DISPLAY_FONTS.find((x) => x.key === state.display) || DISPLAY_FONTS[0]
  const t = TEXT_FONTS.find((x) => x.key === state.text) || TEXT_FONTS[0]
  loadFont(d)
  loadFont(t)
  root.setProperty('--font-display', d.family)
  root.setProperty('--font-sans', t.family)
  try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {}
}

function reset() {
  Object.assign(state, { palette: 'bordeaux', display: 'playfair', text: 'onest' })
  apply()
}

// ---- sudrab ko'chirish (sarlavha yoki tugmadan ushlab) ----
const root = ref(null)
const pos = reactive({ x: null, y: null })
let drag = null
let moved = false

function clamp(x, y) {
  const el = root.value
  const w = el.offsetWidth
  const h = el.offsetHeight
  return [Math.min(Math.max(8, x), window.innerWidth - w - 8), Math.min(Math.max(8, y), window.innerHeight - h - 8)]
}

function onDown(e) {
  if (e.button !== 0) return
  const r = root.value.getBoundingClientRect()
  drag = { dx: e.clientX - r.left, dy: e.clientY - r.top, sx: e.clientX, sy: e.clientY }
  moved = false
  e.currentTarget.setPointerCapture(e.pointerId)
}

function onMove(e) {
  if (!drag) return
  if (!moved && Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 4) return
  moved = true
  ;[pos.x, pos.y] = clamp(e.clientX - drag.dx, e.clientY - drag.dy)
}

function onUp() {
  if (!drag) return
  drag = null
  if (moved) try { localStorage.setItem(POS_KEY, JSON.stringify(pos)) } catch {}
}

// sudralgandan keyin tugma bosilishi «ochish/yopish» bo'lib ketmasin
function onToggleClick() {
  if (moved) { moved = false; return }
  toggle()
}

const posStyle = computed(() => (pos.x == null ? {} : { left: pos.x + 'px', top: pos.y + 'px', right: 'auto', bottom: 'auto' }))

function toggle() {
  open.value = !open.value
  // ro'yxatdagi nomlar o'z shriftida ko'rinsin
  if (open.value) [...DISPLAY_FONTS, ...TEXT_FONTS].forEach(loadFont)
  // ochilganda/yopilganda o'lcham o'zgaradi — ekrandan chiqib ketmasin
  if (pos.x != null) nextTick(() => { [pos.x, pos.y] = clamp(pos.x, pos.y) })
}

watch(state, apply)

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (saved) Object.assign(state, saved)
  } catch {}
  apply()
  try {
    const p = JSON.parse(localStorage.getItem(POS_KEY) || 'null')
    if (p && p.x != null) nextTick(() => { [pos.x, pos.y] = clamp(p.x, p.y) })
  } catch {}
  window.addEventListener('resize', () => { if (pos.x != null) [pos.x, pos.y] = clamp(pos.x, pos.y) })
})
</script>

<template>
  <div ref="root" class="tp" :class="{ 'is-placed': pos.x != null }" :style="posStyle">
    <Transition name="tp-pop">
      <div v-if="open" class="tp-card" role="dialog" aria-label="Dizayn variantlari">
        <div class="tp-head" title="Sudrab ko'chiring" @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @pointercancel="onUp">
          <Icon name="menu" :size="16" class="tp-grip" />
          <strong>Dizayn variantlari</strong>
          <span class="tp-note">vaqtinchalik</span>
        </div>

        <p class="tp-label">Ranglar</p>
        <div class="tp-swatches">
          <button v-for="p in PALETTES" :key="p.key" type="button" class="tp-swatch" :class="{ 'is-on': state.palette === p.key }"
            :aria-pressed="state.palette === p.key" @click="state.palette = p.key">
            <span :style="{ background: `linear-gradient(135deg, ${p.swatch[0]}, ${p.swatch[1]})` }" />
            {{ p.name }}
          </button>
        </div>

        <p class="tp-label">Sarlavha shrifti</p>
        <div class="tp-fonts">
          <button v-for="f in DISPLAY_FONTS" :key="f.key" type="button" class="tp-font" :class="{ 'is-on': state.display === f.key }"
            :style="{ fontFamily: f.family }" :aria-pressed="state.display === f.key" @click="state.display = f.key">
            {{ f.name }}
          </button>
        </div>

        <p class="tp-label">Matn shrifti</p>
        <div class="tp-fonts">
          <button v-for="f in TEXT_FONTS" :key="f.key" type="button" class="tp-font" :class="{ 'is-on': state.text === f.key }"
            :style="{ fontFamily: f.family }" :aria-pressed="state.text === f.key" @click="state.text = f.key">
            {{ f.name }}
          </button>
        </div>

        <button type="button" class="tp-reset" @click="reset">Asl holiga qaytarish</button>
      </div>
    </Transition>

    <button type="button" class="tp-toggle" :aria-expanded="open" aria-label="Dizayn variantlari"
      @pointerdown="onDown" @pointermove="onMove" @pointerup="onUp" @pointercancel="onUp" @click="onToggleClick">
      <Icon :name="open ? 'close' : 'palette'" :size="22" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
// Panel o'z rangida (palitraga bog'liq emas) — qaysi variant tanlansa ham bir xil ko'rinadi
.tp {
  position: fixed;
  left: clamp(16px, 3vw, 32px);
  bottom: clamp(16px, 3vw, 32px);
  z-index: 990;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: #1E1A33;
}

.tp-grip {
  color: #B9B4CC;
}

.tp-toggle {
  @include down($bp-sm) {
    width: 44px !important;
    height: 44px !important;
  }

  touch-action: none;
  cursor: grab;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #1E1A33;
  color: #fff;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.06);
  }
}

.tp {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  gap: 12px;
}

.tp-card {
  position: relative;
  width: min(340px, calc(100vw - 32px));
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  padding: 16px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22);
}

.tp-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: -16px -16px 0;
  padding: 14px 16px 10px;
  cursor: grab;
  touch-action: none;
  user-select: none;

  &:active {
    cursor: grabbing;
  }

  .tp-note {
    margin-left: auto;
  }

  strong {
    font-size: 15px;
  }
}

.tp-note {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #9A95B0;
}

.tp-label {
  margin: 14px 0 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #9A95B0;
}

.tp-swatches {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.tp-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 6px 2px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  border: 1.5px solid transparent;

  span {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  &.is-on {
    border-color: #1E1A33;
  }
}

.tp-fonts {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tp-font {
  padding: 7px 12px;
  border-radius: 999px;
  border: 1.5px solid #E6E3EF;
  font-size: 15px;
  transition: border-color 0.15s, background 0.15s;

  &:hover {
    border-color: #B9B4CC;
  }

  &.is-on {
    border-color: #1E1A33;
    background: #1E1A33;
    color: #fff;
  }
}

.tp-reset {
  width: 100%;
  margin-top: 16px;
  padding: 10px;
  border-radius: 10px;
  background: #F3F1F8;
  font-size: 13px;
  font-weight: 600;

  &:hover {
    background: #E9E6F2;
  }
}

.tp-pop-enter-active,
.tp-pop-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.tp-pop-enter-from,
.tp-pop-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
