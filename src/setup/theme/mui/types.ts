import { Theme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false
    sm: false
    md: false
    lg: false
    xl: false
    mobile: true
    tablet: true
    desktop: true
  }

  interface ThemeOptions {
    direction?: 'ltr' | 'rtl'
  }
}

// Export enhanced theme type
export type AppTheme = Theme
