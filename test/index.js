const { HandleRequest, Server } = require('../src/index')

Server.start(1000)

HandleRequest.get('/', ctx => {
  return 'success'
})