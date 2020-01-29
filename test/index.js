const Chopstick = require('../src/index')
const Path = require('path')

new Chopstick({
  controllerFolderName: Path.join(__dirname, './controller'),
  port: 4000
})