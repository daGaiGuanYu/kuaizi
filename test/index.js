// @ts-check
const Chopstick = require('../src/index')

Chopstick.router.config('/api', ctx => { // 调整 config 的位置，以达到“部分接口不用全局配置”的效果
  return 'not found'
}, [(fn, ctx) => {
  console.log('这是全局 glove')
  return fn(ctx)
}])

Chopstick.router.add.get('/haha', function(ctx){
  console.log('这里是 handler')
  return 1
})

require('./controller/user')

Chopstick.server.start(1234)