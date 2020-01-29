const ParseRequest = require('../parse-request/index')
const writeJsonData = require('../write-json-data/index')

module.exports = async function(fn, ctx){
  ctx.data = await ParseRequest.json(ctx.request)
  ctx.query = ParseRequest.query(ctx.request)
  let result = await fn(ctx)
  if(result)
    writeJsonData(ctx.response, {
      code: 0,
      data: result
    })
}
