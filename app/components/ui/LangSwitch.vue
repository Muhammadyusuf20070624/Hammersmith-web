<script setup>
// Til tanlash — dropdown: tugmada joriy til (RU / UZ / EN), ro'yxatda tillar o'z nomi bilan.
// Tashqariga bosilsa yoki Esc — yopiladi; ↑/↓ bilan tanlanadi, Enter — tasdiq.
import { LANGS } from '~/composables/useLang'

const props = defineProps({
  // ro'yxat qayerga ochiladi: header'da o'ng chetga, mobil menyuda chap chetga tekislanadi
  align: { type: String, default: 'right' },
})

const { t, lang, setLang } = useLang()
const open = ref(false)
const root = ref(null)
const items = ref([])
const current = computed(() => LANGS.find((l) => l.code === lang.value) || LANGS[0])

function toggle() {
  open.value = !open.value
  if (open.value) nextTick(() => items.value[LANGS.indexOf(current.value)]?.focus())
}

function choose(code) {
  setLang(code)
  open.value = false
  root.value?.querySelector('.lang__btn')?.focus()
}

function onKey(e) {
  if (!open.value) return
  const i = items.value.indexOf(document.activeElement)
  if (e.key === 'Escape') {
    open.value = false
    root.value?.querySelector('.lang__btn')?.focus()
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    const n = LANGS.length
    const next = e.key === 'ArrowDown' ? (i + 1) % n : (i - 1 + n) % n
    items.value[next]?.focus()
  }
}

function onOutside(e) {
  if (open.value && root.value && !root.value.contains(e.target)) open.value = false
}

onMounted(() => document.addEventListener('pointerdown', onOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onOutside))
</script>

<template>
  <div ref="root" class="lang" :class="[`lang--${props.align}`, { 'is-open': open }]" @keydown="onKey">
    <button type="button" class="lang__btn" aria-haspopup="listbox" :aria-expanded="open"
      :aria-label="`${t.header.langLabel}: ${current.label}`" @click="toggle">
      <Icon name="globe" :size="18" />
      <span>{{ current.short }}</span>
      <Icon name="chevron" :size="16" class="lang__chevron" />
    </button>

    <Transition name="lang-menu">
      <ul v-if="open" class="lang__menu" role="listbox" :aria-label="t.header.langLabel">
        <li v-for="(l, i) in LANGS" :key="l.code" role="none" :style="{ '--i': i }">
          <button ref="items" type="button" role="option" class="lang__item" :aria-selected="l.code === lang"
            :lang="l.code" @click="choose(l.code)">
            <span class="lang__code">{{ l.short }}</span>
            {{ l.label }}
            <Icon v-if="l.code === lang" name="check" :size="16" class="lang__check" />
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.lang {
  position: relative;
  display: inline-block;
}

.lang__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  background: var(--surface);
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  transition: border-color var(--t-fast);

  :deep(svg:first-child) {
    color: var(--accent);
  }

  &:hover {
    border-color: var(--accent);
  }
}

.lang__chevron {
  color: var(--text-muted);
  transition: transform var(--t-fast);

  .is-open & {
    transform: rotate(180deg);
  }
}

.lang__menu {
  position: absolute;
  top: calc(100% + 8px);
  z-index: 10;
  min-width: 180px;
  margin: 0;
  padding: 6px;
  list-style: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  box-shadow: var(--shadow-hover);

  .lang--right & {
    right: 0;
  }

  .lang--left & {
    left: 0;
  }
}

.lang__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: 600;
  text-align: left;
  color: var(--text);

  &:hover,
  &:focus-visible {
    background: var(--surface-soft);
    outline: none;
  }

  &[aria-selected='true'] {
    color: var(--accent);
  }
}

.lang__code {
  // «O'Z» — eng keng qisqa nom
  min-width: 26px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
}

.lang__check {
  margin-left: auto;
  color: var(--accent);
}

.lang__menu li {
  animation: lang-item 0.28s var(--ease-out) both;
  animation-delay: calc(var(--i) * 45ms + 40ms);
}

@keyframes lang-item {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
}

.lang-menu-enter-active,
.lang-menu-leave-active {
  transition: opacity var(--t-fast), transform var(--t-fast);
}

.lang-menu-enter-from,
.lang-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
