import { UAParser } from 'ua-parser-js'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mui/material'
import { useUserAgent } from './use-user-agent'

// Function to detect desktop from user agent
function isDesktopUserAgent(userAgent: string): boolean {
  const { device } = UAParser(userAgent)

  // If it's not mobile and not a tablet, assume it's desktop
  return !device.is('mobile') && !device.is('tablet')
}

function isTabletOrAboveUserAgent(userAgent: string): boolean {
  const { device } = UAParser(userAgent)

  return !device.is('mobile')
}

export function useIsDesktopSize() {
  const userAgent = useUserAgent()
  const [isServer, setIsServer] = useState(true)
  const mediaQueryResult = useMediaQuery(theme =>
    theme.breakpoints.up('desktop'),
  )

  useEffect(() => {
    setIsServer(false)
  }, [])

  // On server, use user agent detection
  if (isServer) {
    return isDesktopUserAgent(userAgent)
  }

  // Client-side: use media query
  return mediaQueryResult
}

export function useIsTabletOrAboveSize() {
  const userAgent = useUserAgent()
  const [isServer, setIsServer] = useState(true)
  const mediaQueryResult = useMediaQuery(theme =>
    theme.breakpoints.up('tablet'),
  )

  useEffect(() => {
    setIsServer(false)
  }, [])

  // On server, use user agent detection
  if (isServer) {
    return isTabletOrAboveUserAgent(userAgent)
  }

  // Client-side: use media query
  return mediaQueryResult
}
