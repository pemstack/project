import { JObject } from '@pema/utils'

export interface ParsedProps {
  [key: string]: true | string | string[]
}

export function parseProps(str: string): [ParsedProps, string] {
  str = str.trim()
  const props: ParsedProps = {}
  if (str[0] === '<') {
    const index = str.indexOf('>')
    if (index > 0) {
      const parts = str.substring(1, index).split(';')
      for (let i = 0, len = parts.length; i < len; i++) {
        const part = parts[i].trim()
        if (part) {
          const statement = part.split(':')
          if (statement.length === 1) {
            props[statement[0]] = true
          } else {
            const key = statement[0].trim()
            const value = statement[1].split(',').map(x => x.trim())
            props[key] = value.length === 1 ? value[0] : value
          }
        }
      }

      str = str.substr(index + 1).trim()
    }
  }

  return [props, str]
}
