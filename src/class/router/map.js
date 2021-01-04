const config = require('../../config/index').router
const isProduction = require('../../constant/index')
const wearGlove = require('wear-glove')
const { logger } = require('../../config')

const map = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {}
}

module.exports = {
  get, put
}

// 从 Http.IncomingMessage 里取出 path 和 method 返回 RequestHandler
function get(method, path){
  if(!isProduction)
    logger.log(`收到请求 ${method} ${path}`)
  return map[method][path]||config.handle404
}

function put(method, path, gloveList, handler){
  // 检查参数格式
  if(path.constructor != String)
    throw Error('path 必须是个 String')
  if(!(gloveList instanceof Array))
    throw Error('gloveList 必须是个 Array，即使你只提供一个手套，也要用中括号包起来，看起来也舒服些')
  if(!(handler instanceof Function))
    throw Error('handler 必须是个函数')

  // 加上全局配置
  path = config.baseUrl + path
  gloveList = config.gloveList.concat(gloveList)

  // 检查 path
  if(!path)
    throw Error('path 不可为空')

  handler = wearGlove(gloveList, handler)
  
  if(map[method][path])
    throw Error('接口重名了')
    
  map[method][path] = handler
  logger.log(`收集到路由：${method} ${path}`)
}