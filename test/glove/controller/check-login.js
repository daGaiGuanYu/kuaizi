module.exports = function(handler, ctx){
  console.log('检测是否登录了')
  console.log('假装这里检测通过了')
  handler(ctx)
}