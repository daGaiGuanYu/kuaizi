const { HandleRequest, Server } = require('kuaizi')

Server.start(8080)

function aGlove(fn, ctx){
  console.log('aGlove 的前置操作')
  const result = fn(ctx)
  console.log('aGlove 的后置操作')
  return result
}
function bGlove(fn, ctx){
  console.log('bGlove 的前置操作')
  const result = fn(ctx)
  console.log('bGlove 的后置操作')
  return result
}
function cGlove(fn, ctx){
  console.log('cGlove 的前置操作')
  return fn(ctx) // cGlove 没有后置操作，直接返回 fn(ctx) 就可以了
}

HandleRequest.get('/api/a', [aGlove, bGlove, cGlove], ctx => {
  console.log('正在处理 GET /api/a')
  return 'hello'
})