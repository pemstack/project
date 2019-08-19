import { useRef, useState, useLayoutEffect, RefObject } from 'react'
import { default as useSize } from '@rehooks/component-size'
import { polyfill, supportsResizeObserver } from './polyfill'

interface ComponentSize {
  width: number
  height: number
}

let loaded = supportsResizeObserver()

export function useComponentSize<T = any>(ref: RefObject<T>): ComponentSize {
  const [, setTick] = useState(0)
  const localRef = useRef<null | T>(loaded ? ref.current : null)
  const size = useSize(localRef)
  const { current } = ref
  useLayoutEffect(() => {
    if (loaded) {
      localRef.current = current
      setTick(t => 1 - t)
      return
    }

    let cancelled = false
    async function load() {
      await polyfill()
      loaded = true
      if (!cancelled) {
        localRef.current = current
      }
    }

    load()
    return () => { cancelled = true }
  }, [current])

  return size
}
