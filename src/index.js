// @ts-check
require('./logger')
const router = require('./router/index')

module.exports = {
  app: require('./ctx/app'),
  router: {
    Controller: require('./router/controller'),
    config: router.config,
    add: router.add
  },
  server: require('./server/index'),
  CommonError: require('./error/index'),
  ExpectedError: require('./error/expected-error')
}
