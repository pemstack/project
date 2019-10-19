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

require('./build/index.js')
