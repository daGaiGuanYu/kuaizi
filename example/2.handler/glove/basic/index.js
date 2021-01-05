const { HandleRequest, Server } = require('kuaizi')

Server.start(8080)

// 这个函数就是一个普通、平凡的 aGlove
function aGlove(fn, ctx){
  console.log('处理请求前，先打印这一行')
  const result = fn(ctx) // 让 handler 处理请求，别忘记把 ctx 交给 fn
  console.log('处理请求后，打印这一行')
  return result // 别忘记 return 响应数据
}

HandleRequest.get('/api/a', [aGlove], ctx => {
  console.log('正在处理 GET /api/a')
  return 'hello'
})
HandleRequest.post('/api/a', [aGlove], ctx => {
  console.log('正在处理 POST /api/a')
  return 'hello'
})
HandleRequest.post('/api/b', ctx => {
  console.log('正在处理 POST /api/b')
  return 'hello'
})