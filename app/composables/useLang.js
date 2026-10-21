import ru from '~/locales/ru'
import uz from '~/locales/uz'
import en from '~/locales/en'

// Sayt tili: RU (asosiy) / UZ (lotin) / EN.
// Tanlov cookie'da saqlanadi — server ham sahifani shu tilda chizadi,
// shuning uchun yuklanganda matn «sakramaydi».
const DICTS = { ru, uz, en }
// short — tugmada, o'z alifbosida (РУ / UZ / EN), label — ro'yxatda o'z tilida (Русский / O'zbekcha / English)
export const LANGS = Object.keys(DICTS).map((code) => ({ code, short: DICTS[code].langShort, label: DICTS[code].langLabel }))

export function useLang() {
  const cookie = useCookie('lang', { maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
  const lang = useState('lang', () => (DICTS[cookie.value] ? cookie.value : 'ru'))

  function setLang(code) {
    if (!DICTS[code]) return
    lang.value = code
    cookie.value = code
  }

  const t = computed(() => DICTS[lang.value])
  return { lang, setLang, t }
}
