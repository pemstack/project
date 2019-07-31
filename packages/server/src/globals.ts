import path from 'path'

function extendGlobal(values: {}) {
  for (const [key, value] of Object.entries(values)) {
    if (!(key in global)) {
      global[key] = value
    }
  }
}

extendGlobal({
  fetch: require('node-fetch'),
  FormData: require('form-data'),
  URLSearchParams: require('url').URLSearchParams
})

export const projectDirectory = path.resolve(__dirname, '..')
export const srcDirectory = __dirname

export function inProject(subpath?: string): string {
  if (subpath) {
    return path.resolve(projectDirectory, subpath)
  } else {
    return projectDirectory
  }
}

export function inSrc(subpath?: string): string {
  if (subpath) {
    return path.resolve(srcDirectory, subpath)
  } else {
    return srcDirectory
  }
}
