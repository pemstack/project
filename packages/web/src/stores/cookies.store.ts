export class CookiesStore {
  get(name: string) {
    const matches = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)')
    return matches ? matches.pop() : null
  }

  delete(name: string) {
    document.cookie = name + '= ; expires = Thu, 01 Jan 1970 00:00:00 GMT'
  }
}
