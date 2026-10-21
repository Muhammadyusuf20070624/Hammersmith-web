// VAQTINCHALIK: rahbarga Hammersmith uchun rang va shrift variantlarini ko'rsatish.
// Variant tanlangach — qiymatlar _tokens.scss ga ko'chiriladi va ThemePanel o'chiriladi
// (content.js → THEME_PANEL = false).

// Har bir palitra — _tokens.scss dagi CSS o'zgaruvchilarining qiymatlari
export const PALETTES = [
  {
    // Asosiy: logotipdagi bordo — tugmalar, oltin — to'q fonlarda va kursiv urg'uda
    key: 'bordeaux', name: 'Bordo va oltin (asosiy)', swatch: ['#B8262A', '#E2BE76'],
    vars: {
      '--page-gradient': 'linear-gradient(180deg, #FBF7F2 0%, #F6EFE6 48%, #EDE1D3 100%)',
      '--bg': '#F8F3EC', '--bg-rgb': '248 243 236', '--tint': '#F3E9DD',
      '--surface-soft': '#F5EEE5', '--border': '#E9DFD2', '--border-strong': '#D9C8B4',
      '--accent': '#9E1B1F', '--accent-hover': '#821417',
      '--accent-gradient': 'linear-gradient(90deg, #B8262A 0%, #8E1519 100%)',
      '--accent-gradient-hover': 'linear-gradient(90deg, #A82024 0%, #7A1013 100%)',
      '--accent-contrast': '#ffffff',
      '--accent-italic': '#8F6420', '--accent-soft': '#F6E6E2', '--accent-on-dark': '#E2BE76',
      '--deep-1': '#2A1414', '--deep-2': '#120B0A', '--deep-rgb': '18 11 10', '--glow-rgb': '176 38 42', '--shade-rgb': '60 25 20',
    },
  },
  {
    // Oltin tugmalar (matn to'q), ko'mir-qora panellar — logotipning o'zi kabi
    key: 'gold', name: "Ko'mir va oltin", swatch: ['#E2BE76', '#1E1B18'],
    vars: {
      '--page-gradient': 'linear-gradient(180deg, #FAF8F4 0%, #F4F0E8 48%, #E8E1D4 100%)',
      '--bg': '#F7F4EE', '--bg-rgb': '247 244 238', '--tint': '#F0EADF',
      '--surface-soft': '#F3EFE8', '--border': '#E6DFD3', '--border-strong': '#D3C7B3',
      '--accent': '#8F6420', '--accent-hover': '#6E4C17',
      '--accent-gradient': 'linear-gradient(90deg, #E8C784 0%, #C9A04E 100%)',
      '--accent-gradient-hover': 'linear-gradient(90deg, #DDB86E 0%, #B88E3E 100%)',
      '--accent-contrast': '#1C1512',
      '--accent-italic': '#8F6420', '--accent-soft': '#F5ECDA', '--accent-on-dark': '#E2BE76',
      '--deep-1': '#1E1B18', '--deep-2': '#0E0D0C', '--deep-rgb': '14 13 12', '--glow-rgb': '201 160 78', '--shade-rgb': '50 40 25',
    },
  },
  {
    // Gril cho'g'i: g'isht-to'q sariq urg'u, iliq jigarrang panellar (suratlardagi yog'och va olov)
    key: 'ember', name: "Cho'g' va yog'och", swatch: ['#D2643A', '#3A2418'],
    vars: {
      '--page-gradient': 'linear-gradient(180deg, #FCF8F4 0%, #F7EFE7 48%, #EEDFD1 100%)',
      '--bg': '#F9F2EB', '--bg-rgb': '249 242 235', '--tint': '#F5E7DA',
      '--surface-soft': '#F7EEE6', '--border': '#EDDDD0', '--border-strong': '#DEC6B2',
      '--accent': '#A8401A', '--accent-hover': '#8A3313',
      '--accent-gradient': 'linear-gradient(90deg, #D2643A 0%, #A63C18 100%)',
      '--accent-gradient-hover': 'linear-gradient(90deg, #C45630 0%, #923312 100%)',
      '--accent-contrast': '#ffffff',
      '--accent-italic': '#A8401A', '--accent-soft': '#F8E6DC', '--accent-on-dark': '#F2B48C',
      '--deep-1': '#3A2418', '--deep-2': '#1A0F09', '--deep-rgb': '26 15 9', '--glow-rgb': '210 100 58', '--shade-rgb': '90 45 25',
    },
  },
]

// Sarlavha shriftlari (hammasida kirill bor). spec — Google Fonts so'rovi
export const DISPLAY_FONTS = [
  { key: 'playfair', name: 'Playfair Display', family: "'Playfair Display', Georgia, serif", spec: 'Playfair+Display:ital,wght@0,400..800;1,400..800' },
  { key: 'oswald', name: 'Oswald', family: "'Oswald', sans-serif", spec: 'Oswald:wght@400..700' },
  { key: 'lora', name: 'Lora', family: "'Lora', Georgia, serif", spec: 'Lora:ital,wght@0,400..700;1,400..700' },
  { key: 'cormorant', name: 'Cormorant Garamond', family: "'Cormorant Garamond', Georgia, serif", spec: 'Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600' },
  { key: 'ptserif', name: 'PT Serif', family: "'PT Serif', Georgia, serif", spec: 'PT+Serif:ital,wght@0,400;0,700;1,400;1,700' },
  { key: 'montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif", spec: 'Montserrat:ital,wght@0,300..800;1,300..800' },
  { key: 'onest', name: 'Onest', family: "'Onest', sans-serif", spec: 'Onest:wght@300..800' },
]

// Oddiy matn shriftlari
export const TEXT_FONTS = [
  { key: 'onest', name: 'Onest', family: "'Onest', system-ui, sans-serif", spec: 'Onest:wght@300..800' },
  { key: 'manrope', name: 'Manrope', family: "'Manrope', system-ui, sans-serif", spec: 'Manrope:wght@400..800' },
  { key: 'montserrat', name: 'Montserrat', family: "'Montserrat', system-ui, sans-serif", spec: 'Montserrat:wght@300..800' },
  { key: 'inter', name: 'Inter', family: "'Inter', system-ui, sans-serif", spec: 'Inter:wght@400..800' },
]
