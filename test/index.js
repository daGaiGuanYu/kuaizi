const Chopstick = require('../src/index')
const Path = require('path')

new Chopstick({
  controllerFolderName: Path.join(__dirname, './controller'),
  port: 8080,
  handle404(request, response){
    Chopstick.responseJson(response, { code: 404 })
  }
})