// @ts-check
const Chopstick = require('../src/index')

Chopstick.router.config('/api', ctx => {
  return 'not found'
}, [(fn, ctx) => {
  console.log('这是全局 glove')
  return fn(ctx)
}])
Chopstick.router.add('GET', '/haha', [(fn, ctx) => {
  console.log('这是 handler glove')
  return fn(ctx)
}], function(ctx){
  console.log('这里是 handler')
  return 1
})

Chopstick.server.start(1234)