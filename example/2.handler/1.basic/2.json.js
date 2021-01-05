const { server, router } = require('../../../lib')

router.addHandler({
  method: 'post',
  path: '/hello',
  async handler(ctx){
    let data = await ctx.getJson()
    let name = data.name
    if(!name)
      name = 'ming'
    return `hi ${name}~`
  }
})

server.start(8888)