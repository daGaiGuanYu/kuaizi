// @ts-check
require('./logger')
const router = require('./router/index')

module.exports = {
  App: require('./ctx/app'),
  Handler: {
    Collector: require('./router/collector'),
    config: router.config,
    add: router.add
  },
  Server: require('./server/index'),
  CommonError: require('./error/index'),
  ExpectedError: require('./error/expected-error')
}