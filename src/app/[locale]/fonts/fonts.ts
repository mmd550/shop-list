import Inter from 'next/font/local'

export const lahzeFont = Inter({
  src: './Lahzeh-FamilyVF.woff2',
  variable: '--font-lahze',
  fallback: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  preload: true,
})

export const yekanFont = Inter({
  src: './IRANYekanXVF.woff2',
  variable: '--font-yekan',
  fallback: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
  preload: true,
})

const fonts: { variable: string; className: string }[] = [yekanFont, lahzeFont]

export const fontsClassName =
  fonts.reduce((prev, current) => {
    return `${prev} ${current.variable}`
  }, '') + ` ${yekanFont.className}` // The main fonts className must be added, because its being used in body and when no font is being applied by the theme on a component, this font should be applied
