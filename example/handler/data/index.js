const { HandleRequest, Server } = require('kuaizi')

Server.start(8080)

HandleRequest.post('/api/user', async ctx => {
  const query = ctx.getQuery()
  const data = await ctx.getJson()

  console.log(query)
  console.log(data)

  return {
    query, data
  }
})