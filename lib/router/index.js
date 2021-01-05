const logger = require('../logger')
const config = require('./config')
const wearGlove = require('wear-glove')
const { isString } = require('../common/util')

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
  return map[method][path]||config.handle404
}

function put({ method = 'GET', path, gloveList = [], handler }){
  // 检查参数格式
  if(isString(method) == false)
    throw Error('method 必须是个 String，而你传入了 ' + method)
  method = method.toUpperCase()
  if(['GET', 'POST', 'PUT', 'DELETE'].indexOf(target) == -1)
    throw Error(method + ' 不是一个有效的 http 方法')
  
  if(isString(path) == false)
    throw Error('path 必须是个 String，而你传入了 ' + path)
  if(!(gloveList instanceof Array))
    throw Error('gloveList 必须是个 Array，即使你只提供一个手套，也要用中括号包起来')
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
    throw Error(`接口 ${method} ${path} 重复了`)
  
  map[method][path] = handler
  logger.log(`收集到路由：${method} ${path}`)
}
