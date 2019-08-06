import { memoizeLazy } from '@pema/utils'

export function supportsResizeObserver() {
  const w = window as any
  if (typeof w === 'undefined') {
    return false
  }

  return (
    'ResizeObserver' in w &&
    'ResizeObserverEntry' in w &&
    'contentRect' in w.ResizeObserverEntry.prototype
  )
}

function loadPolyfills() {
  const polyfills = []

  if (!supportsResizeObserver()) {
    polyfills.push(import('resize-observer-polyfill'))
  }

  return Promise.all(polyfills)
}

export const polyfill = memoizeLazy(loadPolyfills)
