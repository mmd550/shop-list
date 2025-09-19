'use client'

import { styled } from '@mui/material/styles'

import { UserAgentContext } from '@/hooks/use-user-agent'

export function LayoutClient({
  children,
  userAgent,
}: {
  children: React.ReactNode
  userAgent: string
}) {
  return (
    <UserAgentContext.Provider value={userAgent}>
      <LayoutContainer>{children}</LayoutContainer>
    </UserAgentContext.Provider>
  )
}

const LayoutContainer = styled('div')`
  width: 100%;
  position: relative;
  margin: 0 auto;

  min-height: 100%;
  /* DO not set overflow-x:hidden. it will break the sticky positions in the pages */
`
