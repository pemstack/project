export interface ParsedProps {
  [key: string]: true | string | string[]
}

function parseObj(str: string): ParsedProps {
  const props: ParsedProps = {}
  const parts = str.split(';')
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

  return props
}

export function parseProps(str: string): [ParsedProps, string] {
  str = (str || '').trim()
  if (str[0] === '<') {
    const index = str.indexOf('>')
    if (index > 0) {
      return [
        parseObj(str.substring(1, index)),
        str.substr(index + 1).trim()
      ]
    }
  } else if (str[str.length - 1] === '>') {
    const index = str.indexOf('<')
    if (index >= 0) {
      return [
        parseObj(str.substring(index + 1, str.length - 1)),
        str.substr(0, index).trim()
      ]
    }
  }

  return [{}, str]
}
