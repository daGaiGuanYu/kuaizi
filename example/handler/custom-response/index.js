const { HandleRequest, Server } = require('kuaizi')

Server.start(8080)

HandleRequest.get('/', ctx => {
  const serverResponse = ctx.res // 从请求上下文中，拿出响应对象
  serverResponse.write('hell') // 写入 hell
  serverResponse.write('o') // 写入 o
  serverResponse.end() // 标记响应完成～
})