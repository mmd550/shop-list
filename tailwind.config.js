import plugin from 'tailwindcss/plugin'
import { breakpoints } from './src/setup/theme/breakpoints'

const MAX_WIDTH = 1200
const PADDING = 20

const customPlugins = [
  plugin(function ({ addComponents, addUtilities, theme, matchUtilities }) {
    // Adding components and utilities this way causes the autocompletes and easier coding.

    // Generate default values: 0 to 100 in steps of 1
    const defaultValues = Object.fromEntries(
      Array.from({ length: 101 }, (_, i) => [i, i]),
    )

    // Merge with custom values from theme extension
    const vhValues = { ...defaultValues, ...theme('vhHeight') }

    matchUtilities(
      {
        'h-vh': value => ({
          height: `${value}vh`,
        }),
      },
      { values: vhValues },
    )

    matchUtilities(
      {
        'transition-duration': value => ({
          '--transition-duration': value,
        }),
      },
      {
        values: {
          ...theme('transitionDuration'),
          250: '250ms',
        },
      },
    )

    addComponents({
      '.constrain': {
        width: '100%',
        'max-width': `${MAX_WIDTH}px`,
        'padding-left': `${PADDING}px`,
        'padding-right': `${PADDING}px`,
        margin: '0 auto',
        [`@media (min-width: ${MAX_WIDTH + PADDING * 2}px)`]: {
          'padding-left': 0,
          'padding-right': 0,
        },
      },
    })

    addUtilities({
      '.no-select': {
        '-webkit-user-select': 'none' /* Safari */,
        '-ms-user-select': 'none' /* IE 10 and IE 11 */,
        'user-select': 'none' /* Standard syntax */,
        '-moz-user-select': 'none',
        '-webkit-touch-callout': 'none' /* iOS Safari */,
      },
      '.dir-ltr': {
        direction: 'ltr',
      },
      '.dir-rtl': {
        direction: 'rtl',
      },
      '.dark-gradient-background': {
        'border-image-source':
          'linear-gradient(360deg, rgba(0, 0, 0, 0.3) 0%, rgba(47, 47, 47, 0.3) 18.75%)',
      },
      '.clamped': {
        display: '-webkit-box',
        '-webkit-box-orient': 'vertical',
        'box-orient': 'vertical',
        'overflow-y': 'hidden',
        'text-overflow': 'ellipsis',
        whitespace: 'pre-wrap',
      },
      '.flex-center': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '.font-inherit': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: 'inherit',
      },
      '.pre': {
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
      },
    })
  }),
]

/** @type {import('tailwindcss').Config} */
const config = {
  content: {
    files: ['./src/**/*.{tsx,ts,jsx,js}'],
  },
  theme: {
    // fontSize,
    screens: {
      tablet: `${breakpoints.tablet / 16}rem`,
      desktop: `${breakpoints.desktop / 16}rem`,
    },
    extend: {
      borderRadius: {
        none: '0',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        full: '9999px',
      },
      borderWidth: {
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        5: '5px',
        6: '6px',
        7: '7px',
        8: '8px',
      },
      scale: {
        96: '0.96',
        97: '0.97',
        98: '0.98',
      },
      fontFamily: {
        lahze: 'var(--font-lahze)',
        yekan: 'var(--font-yekan)',
      },
    },
  },
  darkMode: 'class',
  plugins: [...customPlugins],
}

export default config
