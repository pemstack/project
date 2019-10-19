const path = require('path')
const { register } = require('tsconfig-paths')

const inProject = subpath => path.resolve(__dirname, subpath)

register({
  baseUrl: inProject('build'),
  paths: {
    '@my-app/*': ['../../*']
  }
})

if (process.env.NODE_ENV !== 'production') {
  console.warn('NODE_ENV is not set to production.')
}

const { bootstrap } = require(inProject('build/index.js'))
bootstrap(80).catch(console.error)
