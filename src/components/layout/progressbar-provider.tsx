'use client'

import { ProgressProvider } from '@bprogress/next/app'

export function ProgressbarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProgressProvider
      height="4px"
      color="var(--page-progress-color)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  )
}
