import { useLayoutEffect } from 'react'

export function useBodyClass(className: string) {
  useLayoutEffect(() => {
    const body = document && document.body
    if (body) {
      body.classList.add(className)
      return () => body.classList.remove(className)
    }
  }, [className])
}
