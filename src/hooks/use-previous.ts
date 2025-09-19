import { useRef } from 'react'

// This is not render-dependent and will never allow previous to match current
export function usePrevious<T extends any>(current: T) {
  const prevRef = useRef<T>(undefined)
  const lastRef = useRef<T>(undefined)

  if (lastRef.current !== current) {
    prevRef.current = lastRef.current
  }

  lastRef.current = current

  return prevRef
}
