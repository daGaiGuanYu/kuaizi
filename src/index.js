// @ts-check
const Router = require('./router/index')
const http = require('http')
const logger = require('./logger')

class Chopstick {
  constructor({ port=3000, controllerFolderName, handle404, baseUrl='' }){
    this.port = port
    this.router = new Router(controllerFolderName, baseUrl, handle404)
    http.createServer(this.router.handle).listen(port)
    logger.log(`started on ${port}`)
  }
}

Chopstick.app = require('./ctx/app')
Chopstick.Constants = require('./constants')
Chopstick.logger = logger
Chopstick.RequestUtil = require('./request-util/index')
Chopstick.CommonError = require('./common-error/index')
Chopstick.util = {
  sequelize: require('./util/sequelize')
}
Chopstick.glove = {
  commonRequest: require('./glove/common-request')
}

module.exports = Chopstick