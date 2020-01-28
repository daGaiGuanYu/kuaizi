const ChopStick = require('../src/index')
const Path = require('path')

new ChopStick({
  controllerFolderName: Path.join(__dirname, './controller'),
  
})