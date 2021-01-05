const { router, server } = require('../../../lib')

server.start(8888)

router.addHandler({
  path: '/hello',
  handler(ctx){
    ctx.res.end('hello')
    ctx.end()
  }
})