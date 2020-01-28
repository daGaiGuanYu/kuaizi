const Router = require('./router/index')
const http = require('http')

module.exports = class ChopStick {
  constructor({ port=3000, controllerFolderName, handle404 }){
    this.port = port
    this.router = new Router(controllerFolderName, handle404)
    http.createServer(this.router.handle).listen(port)
  }
}