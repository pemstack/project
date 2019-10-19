const { register } = require('tsconfig-paths')

register({
  baseUrl: './build',
  paths: {
    '@my-app/*': [ '../../*' ]
  }
})

if (process.env.NODE_ENV !== 'production') {
  console.warn('NODE_ENV is not set to production.')
}

const { bootstrap } = require('./build/index.js')
bootstrap(80).catch(console.error)
