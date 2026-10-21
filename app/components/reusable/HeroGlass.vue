<script setup>
// Hero ichidagi shisha kartochka mazmuni — bosh sahifadagi «hero__proof» bilan bir xil tuzilish:
// yuqori qator: avatarlar (yoki ikonka) + qalin sarlavha, ostida matn; kerak bo'lsa pastida qo'shimcha (slot).
// Shisha fon va o'lcham — PageHero.vue (.phero__glass).
defineProps({
  title: { type: String, required: true },
  text: { type: String, default: '' },
  avatars: { type: Array, default: () => [] },
  icon: { type: String, default: '' },
})
</script>

<template>
  <div class="hglass">
    <div class="hglass__head">
      <span v-if="avatars.length" class="hglass__avatars" aria-hidden="true">
        <img v-for="src in avatars" :key="src" :src="src" alt="" width="34" height="34" loading="lazy" />
      </span>
      <span v-else-if="icon" class="hglass__icon"><Icon :name="icon" :size="18" /></span>
      <strong>{{ title }}</strong>
    </div>
    <p v-if="text">{{ text }}</p>
    <div v-if="$slots.default" class="hglass__extra"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
.hglass__head {
  display: flex;
  align-items: center;
  gap: var(--space-3);

  strong {
    font-size: var(--text-sm);
    font-weight: 600;
  }
}

.hglass__avatars {
  display: flex;
  flex-shrink: 0;

  img {
    width: 34px;
    height: 34px;
    object-fit: cover;
    object-position: center 20%;
    border-radius: 50%;
    border: 2px solid rgb(255 255 255 / 0.9);

    & + img {
      margin-left: -10px;
    }
  }
}

// avatar o'rnida — shu o'lchamdagi shisha doira ichida ikonka
.hglass__icon {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.18);
  border: 2px solid rgb(255 255 255 / 0.9);
}

p {
  margin-top: var(--space-3);
  font-size: var(--text-sm);
  line-height: 1.45;
  color: rgb(255 255 255 / 0.9);

  @include down($bp-md) {
    font-size: var(--text-xs);
  }
}

.hglass__extra {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid rgb(255 255 255 / 0.18);
}
</style>
