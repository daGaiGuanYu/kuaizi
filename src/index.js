// @ts-check
require('./logger')
const router = require('./router/index')

module.exports = {
  app: require('./ctx/app'),
  handler: {
    Collector: require('./handler/collector'),
    config: router.config,
    add: router.add
  },
  server: require('./server/index'),
  Error: {
    common: require('./error/index'),
    expected: require('./error/expected-error')
  }
}
