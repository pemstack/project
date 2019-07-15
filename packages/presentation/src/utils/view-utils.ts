import { ActionParams } from '@pema/router'
import { Dictionary } from '@pema/utils'

export function pluckState<TProps extends {}>(keys: Array<keyof TProps>) {
  return function (params: ActionParams): TProps {
    const state = params.state
    const props: Dictionary = {}
    for (const key of keys) {
      props[key as string] = state[key as string]
    }

    return props as TProps
  }
}
