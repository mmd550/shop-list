'use client'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material'
import { breakpoints } from '../breakpoints'
import { yekanFont } from '@/app/[locale]/fonts/fonts'

const fontFamily = yekanFont.style.fontFamily

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: breakpoints.mobile,
      tablet: breakpoints.tablet,
      desktop: breakpoints.desktop,
    },
  },
  typography: {
    fontFamily,
  },
})

export const MuiThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
