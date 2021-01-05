const logger = require('../logger')

module.exports = async function(handler, ctx){
  logger.log('收到请求 ' + ctx.req.method + ctx.url.pathname)
  const data = await handler(ctx)
  logger.log('响应：', data)
  return data
}