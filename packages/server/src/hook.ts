import Module from 'module'

const original = (Module as any)._resolveFilename as (...args: any[]) => any
(Module as any)._resolveFilename = function (request: string, ...args: any[]) {
  if (/^routing-controllers($|\/)/.test(request)) {
    const parent = args[0]
    console.log(request, parent && parent.id)
    request = '@gritcode/' + request
  }

  return original.call(this, request, ...args)
}
