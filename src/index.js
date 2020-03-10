// @ts-check

const Router = require('./router/index')
const http = require('http')
const logger = require('./logger')

class Chopstick {
  constructor({ port=3000, controllerFolderName, handle404 }){
    if(global.app)
      throw Error('不可以重复实例化')
    else
      global.app = {
        production: process.argv[2] == 'pro'
      }
    this.port = port
    this.router = new Router(controllerFolderName, handle404)
    http.createServer(this.router.handle).listen(port)
    logger.log(`started on ${port}`)
  }
}

Chopstick.logger = logger
Chopstick.responseJson = require('./write-json-data/index')
Chopstick.ParseRequest = require('./parse-request/index')
Chopstick.CommonError = require('./common-error/index')
Chopstick.util = {
  sequelize: require('./util/sequelize')
}
Chopstick.glove = {
  commonRequest: require('./glove/common-request')
}

module.exports = Chopstick