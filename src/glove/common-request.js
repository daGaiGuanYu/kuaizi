// @ts-check
const { parseJson, parseQuery, writeJson } = require('../request-util/index')
const CommonError = require('../common-error')

module.exports = async function(fn, ctx){
  ctx.data = await parseJson(ctx.request)
  ctx.query = parseQuery(ctx.request)
  let result = await fn(ctx)

  if(result){
    if(!(result instanceof CommonError))
      result = {
        code: 0,
        data: result
      }
    writeJson(ctx.response, result)
  }
}
