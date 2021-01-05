const { server, router } = require('../../../lib')

const reap = new router.HandlerReaper({
  path: '/user'
})

reap({
  method: 'get',
  handler(ctx){
    const param = ctx.getParam()
    console.log(param)
    return {
      name: 'ming',
      year: 2
    }
  }
})

reap({
  method: 'post',
  async handler(ctx){
    const data = await ctx.getJson()
    console.log(data)
    return 'post user'
  }
})

server.start(8888)