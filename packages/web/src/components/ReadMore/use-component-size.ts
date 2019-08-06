import { useRef, useState, useLayoutEffect, RefObject } from 'react'
import { default as useSize } from '@rehooks/component-size'
import { polyfill, supportsResizeObserver } from './polyfill'

interface ComponentSize {
  width: number
  height: number
}

let loaded = supportsResizeObserver()

export function useComponentSize<T = any>(ref: RefObject<T>): ComponentSize {
  const [tick, setTick] = useState(0)
  const localRef = useRef<null | T>(loaded ? ref.current : null)
  const size = useSize(localRef)
  useLayoutEffect(() => {
    if (loaded) {
      localRef.current = ref.current
      setTick(t => 1 - t)
      return
    }

    let cancelled = false
    async function load() {
      await polyfill()
      loaded = true
      if (!cancelled) {
        localRef.current = ref.current
      }
    }

    load()
    return () => { cancelled = true }
  }, [ref.current])

  return size
}
