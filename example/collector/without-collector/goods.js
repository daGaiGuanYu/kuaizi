const { HandleRequest } = require('kuaizi')

// 获取所有商品
HandleRequest.get('/api/goods', ctx => {
  const goodsList = 通过某种方法获取所有商品()
  return goodsList
})
function 通过某种方法获取所有商品(){
  return [] // 就返回一个空数组吧，我们现在也没数据
}

// 新建商品
HandleRequest.post('/api/goods', async ctx => {
  const data = await ctx.getJson()
  // 以某种方法把 data 存起来
  return data
})

// 编辑商品
HandleRequest.put('/api/goods', async ctx => {
  const data = await ctx.getJson()
  // 以某种方法更新数据
  return data
})

// 删除商品
HandleRequest.delete('/api/goods', async ctx => {
  const data = await ctx.getJson()
  // 以某种方式删除数据
  return data
})

// 另一个不知道干啥的请求，注意这里的 url 比之前的 handler 多了一个 hello
HandleRequest.get('/api/goods/hello', async ctx => {
  const data = await ctx.getJson()
  // 不知道要干些什么事
  return data
})