<script setup>
// Oddiy modal: fon/Esc/✕ bilan yopiladi, ochiqligida sahifa aylanmaydi, fokus ichkariga o'tadi
const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: '' },
})
const emit = defineEmits(['close'])
const { t } = useLang()
const panel = ref(null)

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}

watch(() => props.open, async (v) => {
  if (!import.meta.client) return
  document.documentElement.style.overflow = v ? 'hidden' : ''
  if (v) {
    window.addEventListener('keydown', onKey)
    await nextTick()
    panel.value?.querySelector('input, button:not(.amodal__close), select')?.focus()
  } else {
    window.removeEventListener('keydown', onKey)
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (props.open) document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="amodal">
      <div v-if="open" class="amodal" @click.self="emit('close')">
        <div ref="panel" class="amodal__panel" role="dialog" aria-modal="true" :aria-label="title">
          <div class="amodal__head">
            <h2 class="amodal__title">{{ title }}</h2>
            <button type="button" class="amodal__close" :aria-label="t.gallery.close" @click="emit('close')">
              <Icon name="close" :size="20" />
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.amodal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: var(--space-4);
  background: rgb(var(--deep-rgb) / 0.55);
  backdrop-filter: blur(6px);
}

.amodal__panel {
  width: min(440px, 100%);
  max-height: calc(100svh - 32px);
  overflow-y: auto;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background: var(--surface);
  box-shadow: 0 30px 70px rgb(0 0 0 / 0.25);
}

.amodal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.amodal__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
}

.amodal__close {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--text-secondary);

  &:hover {
    color: var(--text);
  }
}

.amodal-enter-active,
.amodal-leave-active {
  transition: opacity 0.25s ease;

  .amodal__panel {
    transition: transform 0.25s var(--ease-out);
  }
}

.amodal-enter-from,
.amodal-leave-to {
  opacity: 0;

  .amodal__panel {
    transform: translateY(12px) scale(0.98);
  }
}
</style>
