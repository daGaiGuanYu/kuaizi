const { HandleRequest, Server, Exception } = require('../../../src/index')

function GlobalGlove(fn, ctx){
  console.log('全局glove')
  return fn(ctx)
}

HandleRequest.config('/api', [GlobalGlove], ctx => {
  throw new Exception.NBug('没有处理此请求的handler', 404, `前端发起了一个未知的请求：${ctx.req.method} ${ctx.req.url}`)
})

HandleRequest.get('/test', ctx => {
  return 1
})

Server.start()