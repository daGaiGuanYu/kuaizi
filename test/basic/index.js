const { HandleRequest, Server } = require('kuaizi')

Server.start(8080)

HandleRequest.post('/api/user', ctx => {
  return '你好想在试图增加一个用户，我现在假装你添加成功了。'
})