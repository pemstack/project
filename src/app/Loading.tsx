import { view } from '@pema/router'
import { mapLazy } from '@pema/utils'
import React, { FunctionComponent } from 'react'

const Loading: FunctionComponent = () => {
  return <div className='Loading'>Loading...</div>
}

export function lazyView<T>(resolver: () => Promise<{ default: T }>) {
  return view.lazy(mapLazy(resolver, v => v.default), Loading)
}

export default Loading
