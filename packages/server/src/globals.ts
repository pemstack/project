import path from 'path'

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
