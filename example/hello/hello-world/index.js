const { HandleRequest, Server } = require('kuaizi')

Server.start(8080)

HandleRequest.get('/', ctx => {
  return 'hello, world'
})