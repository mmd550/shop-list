import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['fa'],

  // Used when no locale matches
  defaultLocale: 'fa',
  localePrefix: 'as-needed',
  localeDetection: false,
})
