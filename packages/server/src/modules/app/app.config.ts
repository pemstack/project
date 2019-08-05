import { srcDirectory, projectDirectory } from 'globals'

export default {
  environment: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  srcDirectory,
  projectDirectory
}
