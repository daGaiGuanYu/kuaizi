const { server, router } = require('../../../lib')

router.addHandler({
  method: 'get',
  path: '/hello',
  handler(ctx){
    let param = ctx.getParam()
    let name = param.name
    if(!name)
      name = 'ming'
    return `hi ${name}~`
  }
})

server.start(8888)