const { responseJson } = require('../../../src/index')

module.exports = function(handler, ctx){
  responseJson(ctx.response, handler(ctx))
}