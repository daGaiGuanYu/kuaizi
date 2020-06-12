const { HandleRequest } = require('kuaizi')

const clct = new HandleRequest.Collector('/api/goods')

// 获取所有商品
clct.get( ctx => {
  const goodsList = 通过某种方法获取所有商品()
  return goodsList
})
function 通过某种方法获取所有商品(){
  return [] // 就返回一个空数组吧，我们现在也没数据
}

// 新建商品
clct.post( async ctx => {
  const data = await ctx.getJson()
  // 以某种方法把 data 存起来
  return data
})

// 编辑商品
clct.put( async ctx => {
  const data = await ctx.getJson()
  // 以某种方法更新数据
  return data
})

// 删除商品
clct.delete( async ctx => {
  const data = await ctx.getJson()
  // 以某种方式删除数据
  return data
})

// 另一个不知道干啥的请求，注意这里的 url 只需要写一个 '/hello'
clct.get('/hello', async ctx => {
  const data = await ctx.getJson()
  // 不知道要干些什么事
  return data
})