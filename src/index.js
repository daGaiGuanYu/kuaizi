// @ts-check
require('./logger')

module.exports = {
  app: require('./ctx/app'),
  router: require('./router/index'),
  CommonError: require('./common-error/index')
}
