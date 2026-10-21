<script setup>
import { OFFER_HREF, PRIVACY_PAGE, STUDIOS } from '~/utils/content'

const { t } = useLang()

// Stol bron qilish formasi: ism, telefon, filial, sana, vaqt, mehmonlar soni, izoh.
//
// HOZIRCHA YUBORILMAYDI (zaglushka): maydonlar tekshiriladi va «Спасибо»
// xabari chiqadi. Ariza qayerga ketishi kelishilgach (API yoki Telegram bot)
// faqat `send()` ichi o'zgaradi — forma va tekshiruv o'z joyida qoladi.
const form = reactive({ name: '', phone: '', studio: '', date: '', time: '', guests: '2', comment: '', consent: true })

// Ish vaqti 15:00 – 01:00: bron vaqti — 15:00 dan 00:30 gacha, har 30 daqiqada
const TIMES = Array.from({ length: 20 }, (_, i) => {
  const m = 15 * 60 + i * 30
  return String(Math.floor(m / 60) % 24).padStart(2, '0') + (m % 60 ? ':30' : ':00')
})
const GUESTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+']
// sana: bugundan boshlab (mahalliy vaqt bo'yicha); serverda bo'sh — brauzerda to'ldiriladi
const today = ref('')
onMounted(() => {
  const d = new Date()
  today.value = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-')
})
const errors = reactive({})
const sending = ref(false)
const sent = ref(false)
const { lang } = useLang()
watch(lang, () => { if (Object.keys(errors).length) validate() })

// Telefon: +998 XX XXX-XX-XX — faqat raqamlar olinadi, ko'rinishi yozish paytida
const digits = computed(() => form.phone.replace(/\D/g, '').replace(/^998/, '').slice(0, 9))
function onPhoneInput(e) {
  const d = e.target.value.replace(/\D/g, '').replace(/^998/, '').slice(0, 9)
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)]
  let out = '+998'
  if (parts[0]) out += ` ${parts[0]}`
  if (parts[1]) out += ` ${parts[1]}`
  if (parts[2]) out += `-${parts[2]}`
  if (parts[3]) out += `-${parts[3]}`
  form.phone = d ? out : ''
}

function validate() {
  for (const k of Object.keys(errors)) delete errors[k]
  if (form.name.trim().length < 2) errors.name = t.value.form.errors.name
  if (digits.value.length !== 9) errors.phone = t.value.form.errors.phone
  if (!form.studio) errors.studio = t.value.form.errors.studio
  if (!form.date) errors.date = t.value.form.errors.date
  if (!form.time) errors.time = t.value.form.errors.time
  if (!form.consent) errors.consent = t.value.form.errors.consent
  return Object.keys(errors).length === 0
}

async function send() {
  // TODO: ariza manzili kelishilgach shu yerga ulanadi
  await new Promise((r) => setTimeout(r, 400))
}

async function submit() {
  if (!validate()) return
  sending.value = true
  try {
    await send()
    sent.value = true
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section id="form" class="lead section">
    <div class="container">
      <div v-reveal class="lead__card">
        <div class="lead__intro">
          <p class="eyebrow">{{ t.eyebrow.form }}</p>
          <h2 class="section-title">{{ t.form.title }} <span class="accent-italic">{{ t.form.titleAccent }}</span></h2>
          <p class="lead__text">{{ t.form.text }}</p>
        </div>

        <p v-if="sent" class="lead__success" role="status">
          <Icon name="check" :size="22" /> {{ t.form.success }}
        </p>

        <form v-else class="lead__form" novalidate @submit.prevent="submit">
          <label class="field" :class="{ 'field--error': errors.name }">
            <span class="visually-hidden">{{ t.form.name }}</span>
            <Icon name="user" :size="18" />
            <input v-model="form.name" type="text" autocomplete="name" :placeholder="`${t.form.name}*`" />
            <small v-if="errors.name">{{ errors.name }}</small>
          </label>

          <label class="field" :class="{ 'field--error': errors.phone }">
            <span class="visually-hidden">{{ t.form.phone }}</span>
            <Icon name="phone" :size="18" />
            <input :value="form.phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+998 __ ___-__-__*"
              @input="onPhoneInput" />
            <small v-if="errors.phone">{{ errors.phone }}</small>
          </label>

          <label class="field" :class="{ 'field--error': errors.studio }">
            <span class="visually-hidden">{{ t.form.studio }}</span>
            <Icon name="pin" :size="18" />
            <select v-model="form.studio" :class="{ 'is-empty': !form.studio }">
              <option value="" disabled>{{ t.form.studio }}*</option>
              <option v-for="s in STUDIOS" :key="s" :value="s">{{ t.studios.branches[s].name }} — {{ t.studios.branches[s].address }}</option>
            </select>
            <small v-if="errors.studio">{{ errors.studio }}</small>
          </label>

          <label class="field" :class="{ 'field--error': errors.date }">
            <span class="visually-hidden">{{ t.form.date }}</span>
            <Icon name="calendar" :size="18" />
            <input v-model="form.date" type="date" :min="today" :class="{ 'is-empty': !form.date }" :aria-label="t.form.date" />
            <small v-if="errors.date">{{ errors.date }}</small>
          </label>

          <div class="field-pair">
            <label class="field" :class="{ 'field--error': errors.time }">
              <span class="visually-hidden">{{ t.form.time }}</span>
              <Icon name="clock" :size="18" />
              <select v-model="form.time" :class="{ 'is-empty': !form.time }">
                <option value="" disabled>{{ t.form.time }}*</option>
                <option v-for="tm in TIMES" :key="tm" :value="tm">{{ tm }}</option>
              </select>
              <small v-if="errors.time">{{ errors.time }}</small>
            </label>

            <label class="field">
              <span class="visually-hidden">{{ t.form.guests }}</span>
              <Icon name="users" :size="18" />
              <select v-model="form.guests">
                <option v-for="g in GUESTS" :key="g" :value="g">{{ t.form.guests }}: {{ g }}</option>
              </select>
            </label>
          </div>

          <label class="field">
            <span class="visually-hidden">{{ t.form.comment }}</span>
            <input v-model="form.comment" type="text" :placeholder="t.form.comment" />
          </label>

          <label class="consent" :class="{ 'consent--error': errors.consent }">
            <input v-model="form.consent" type="checkbox" />
            <span>{{ t.form.consentBefore }} <a v-if="OFFER_HREF" :href="OFFER_HREF" target="_blank" rel="noopener">{{ t.form.consentLink }}</a><template v-else>{{ t.form.consentLink }}</template> {{ t.form.consentMid }}
              <NuxtLink :to="PRIVACY_PAGE" target="_blank">{{ t.form.consentPolicy }}</NuxtLink><template v-if="t.form.consentAfter"> {{ t.form.consentAfter }}</template></span>
          </label>

          <button type="submit" class="btn btn--primary lead__submit" :disabled="sending">
            {{ sending ? '…' : t.form.submit }} <Icon v-if="!sending" name="arrow" :size="18" />
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.lead__card {
  @include card;
  display: grid;
  grid-template-columns: 0.8fr 1.6fr;
  gap: var(--space-10);
  padding: var(--space-10);
  box-shadow: var(--shadow-md);

  @include down($bp-lg) {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  @include down($bp-sm) {
    padding: var(--space-6) var(--space-5);
  }
}

.lead__text {
  margin-top: var(--space-3);
  color: var(--text-secondary);
}

.lead__form {
  display: grid;
  // minmax(0, …) — sana maydonining ichki kengligi ustunni kengaytirib, kartochkadan chiqarmasin
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);

  @include down($bp-sm) {
    grid-template-columns: minmax(0, 1fr);
  }
}

.field {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-4);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--text-muted);
  transition: border-color var(--t-fast);

  &:focus-within {
    border-color: var(--accent);
  }

  input,
  select {
    flex: 1;
    min-width: 0;
    width: 100%;
    height: 52px;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--text);
    // iOS 16px dan kichik maydonda sahifani kattalashtiradi
    font-size: 16px;

    &::placeholder {
      color: var(--text-muted);
    }
  }

  small {
    position: absolute;
    left: var(--space-4);
    bottom: -20px;
    font-size: 12px;
    color: var(--danger);
  }

  select {
    appearance: none;
    cursor: pointer;

    &.is-empty {
      color: var(--text-muted);
    }
  }

  &--wide {
    grid-column: 1 / -1;
  }

  // sana maydoni bo'sh bo'lsa — «placeholder» rangida
  input.is-empty {
    color: var(--text-muted);
  }

  &--error {
    border-color: var(--danger);
    margin-bottom: var(--space-3);
  }
}

// vaqt + mehmonlar — bitta katakda yonma-yon
.field-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
}

.consent a {
  color: var(--accent);
  text-decoration: underline;
}

.consent {
  grid-column: 1 / -1;
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-secondary);
  cursor: pointer;

  input {
    margin-top: 2px;
    width: 18px;
    height: 18px;
    accent-color: var(--accent);
    flex-shrink: 0;
  }

  &--error {
    color: var(--danger);
  }
}

.lead__submit {
  grid-column: 1 / -1;
  justify-self: end;
  min-width: 200px;

  @include down($bp-sm) {
    justify-self: stretch;
  }
}

.lead__success {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-5);
  border-radius: var(--radius-md);
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}
</style>
