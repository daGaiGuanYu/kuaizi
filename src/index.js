// @ts-check
require('./logger')
const Router = require('./router/index')
const http = require('http')

class Chopstick {
  constructor({ port=3000, controllerFolderName, handle404, baseUrl='' }){
    this.port = port
    this.router = new Router(controllerFolderName, baseUrl, handle404)
    http.createServer(this.router.handle).listen(port)
    console.log(`started on ${port}`)
  }
}

Chopstick.app = require('./ctx/app')
Chopstick.Constants = require('./constants')
Chopstick.CommonError = require('./common-error/index')
Chopstick.RequestContext = require('./ctx/request')

Chopstick.util = {
  sequelize: require('./util/sequelize')
}
Chopstick.glove = {
  
}

module.exports = Chopstick