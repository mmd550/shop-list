'use client'

import { useEffect, useRef } from 'react'
import {
  ProgressProvider as BProgressProvider,
  useProgress,
} from '@bprogress/react'
import { usePathname, useRouter } from 'next/navigation'
import { useIsClient } from '@/hooks/use-is-client'

export function ProgressbarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const isClient = useIsClient()

  return (
    <>
      {isClient ? (
        <BProgressProvider
          height="4px"
          color="var(--page-progress-color)"
          options={{ showSpinner: false }}
          shallowRouting
        >
          <RouterLoadingManager />
          {children}
        </BProgressProvider>
      ) : (
        children
      )}
    </>
  )
}

function RouterLoadingManager() {
  const { start, stop } = useProgress()
  const pathname = usePathname()
  const router = useRouter()
  const prevPath = useRef(pathname)

  useEffect(() => {
    // Monkey-patch router.push/replace to detect navigation start
    const origPush = router.push
    const origReplace = router.replace

    router.push = (...args) => {
      if (args[0] !== pathname) start()
      return origPush.apply(router, args)
    }
    router.replace = (...args) => {
      if (args[0] !== pathname) start()
      return origReplace.apply(router, args)
    }

    // When pathname changes, navigation is complete
    if (prevPath.current !== pathname) {
      stop()
      prevPath.current = pathname
    }

    return () => {
      router.push = origPush
      router.replace = origReplace
    }
  }, [pathname, router, start, stop])

  return null
}
