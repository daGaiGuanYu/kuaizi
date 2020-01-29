const ParseRequest = require('../parse-request/index')

module.exports = async function(fn, ctx){
  ctx.data = await ParseRequest.json(ctx.request)
  ctx.query = ParseRequest.query(ctx.request)
  fn(ctx)
}
