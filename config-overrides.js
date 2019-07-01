const { override, fixBabelImports } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  function (config, env) {
    const alias = (config.resolve.alias || {})
    alias['@ant-design/icons'] = 'purched-antd-icons'
    config.resolve.alias = alias
    return config
  }
)
