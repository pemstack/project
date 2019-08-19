import React, { FunctionComponent, useState, useEffect } from 'react'

interface DelayedProps {
  children?: React.ReactNode
  ms?: number
}

export const Delay: FunctionComponent<DelayedProps> = ({
  children,
  ms = 100
}) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true)
    }, ms)

    return () => clearTimeout(timeout)
  }, [ms])

  if (!ready) {
    return null
  }

  return <>{children}</>
}
