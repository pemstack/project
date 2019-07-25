const path = require('path')
const { override, fixBabelImports } = require('customize-cra')

module.exports = override(
  fixBabelImports('antd', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  fixBabelImports('yup', {
    libraryName: 'yup',
    libraryDirectory: 'lib',
    camel2DashComponentName: false
  }),
  function (config, env) {
    const alias = (config.resolve.alias || {})
    alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './src/icons.ts')
    config.resolve.alias = alias
    return config
  }
)
