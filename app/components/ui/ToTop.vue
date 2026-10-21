<script setup>
// «Yuqoriga» tugmasi: bir ekrandan ko'proq pastga tushilganda o'ng pastda paydo bo'ladi
const { t } = useLang()
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > window.innerHeight
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <Transition name="to-top">
    <button v-if="visible" type="button" class="to-top" :aria-label="t.header.toTop" @click="toTop">
      <Icon name="arrow" :size="20" />
    </button>
  </Transition>
</template>

<style lang="scss" scoped>
.to-top {
  position: fixed;
  right: clamp(16px, 3vw, 32px);
  bottom: clamp(16px, 3vw, 32px);
  z-index: $z-header - 1;
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;

  @include down($bp-sm) {
    width: 44px;
    height: 44px;
  }
  border-radius: 50%;
  background: var(--accent-gradient);
  color: var(--accent-contrast);
  box-shadow: 0 10px 24px rgb(var(--glow-rgb) / 0.35);
  transition: transform var(--t-hover), box-shadow var(--t-hover);

  :deep(svg) {
    transform: rotate(-90deg);
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 28px rgb(var(--glow-rgb) / 0.42);
  }
}

.to-top-enter-active,
.to-top-leave-active {
  transition: opacity 0.25s ease, transform 0.25s var(--ease-out);
}

.to-top-enter-from,
.to-top-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.9);
}
</style>
