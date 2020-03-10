// @ts-check
const { parseJson, parseQuery, writeJson } = require('../request-util/index')

module.exports = async function(fn, ctx){
  ctx.data = await parseJson(ctx.request)
  ctx.query = parseQuery(ctx.request)
  let result = await fn(ctx)
  if(result)
    writeJson(ctx.response, {
      code: 0,
      data: result
    })
}
