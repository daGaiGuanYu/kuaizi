// @ts-check
const Url = require('url')
const wear = require('wear-glove')
const CommonError = require('../common-error/index')

const map = {
  'GET': {},
  'POST': {},
  'PUT': {},
  'DELETE': {}
}

// 配置
const configuration = {
  configed: false,
  baseUrl: '',
  gloveList: [],
  handle404: ctx => CommonError.NotFound
}
/**
 * router 的全局配置
 * @param {String} [baseUrl] 
 * @param {RequestHandler} [handle404] 
 * @param {Array<RequestGlove>} [gloveList] 
 */
function config(baseUrl, handle404, gloveList){
  if(configuration.configed)
    throw Error('路由只能配置一次，（可以不配）') // 多次配置，就得把 router 初始化一遍，相当耗时
  configuration.configed = true
  if(baseUrl)
    configuration.baseUrl = baseUrl
  if(handle404)
    configuration.handle404 = handle404
  if(gloveList)
    configuration.gloveList = gloveList
}

/**
 * 添加新的 handler
 * @param {String} method 
 * @param {String} path 
 * @param {Array<RequestGlove> | RequestHandler} gloveList 
 * @param {RequestHandler} [handler]
 */
function add(method, path, gloveList, handler){ // 这里不模仿 axios 把默认当作 get，这点“适应成本”是应该被付出的
  if(['GET', 'POST', 'PUT', 'DELETE'].indexOf(method) == -1)
    throw Error('method 参数必须是 GET 或 POST 或 PUT 或 DELETE （区分大小写）')
  if(!path)
    throw Error('path 参数不能为空')
  path = configuration.baseUrl + path
  if(map[method][path])
    throw Error(`${method}: ${path} 已经注册过了（有两个 handler 对应相同的 method 和 path）`)
  
  if(!handler){
    handler = /** @type {RequestHandler} */(gloveList)
    gloveList = []
  }
  if(!handler)
    throw Error('handler 不可为空')
  if(!(handler instanceof Function))
    throw Error('handler 必须是函数')
  if(!(gloveList instanceof Array))
    throw Error('gloveList 参数必须是个数组，即使你只想提供一个手套，也要用中括号包起来')
  
  map[method][path] = wear([...configuration.gloveList, ...gloveList], handler)
  console.log(`收集到路由：${method} ${path}`)
}

/**
 * 添加新的 get handler
 * @param {String} path 
 * @param {Array<RequestGlove> | RequestHandler} gloveList 
 * @param {RequestHandler} [handler]
 */
add.get = (path, gloveList, handler) => add('GET', path, gloveList, handler) // path 不应该被省略，所以和 controller 不同的是，这里的 path 参数被单独列出来

/**
 * 添加新的 post handler
 * @param {String} path
 * @param {Array<RequestGlove> | RequestHandler} gloveList 
 * @param {RequestHandler} [handler]
 */
add.post = (path, gloveList, handler) => add('POST', path, gloveList, handler)

/**
 * 添加新的 put handler
 * @param {String} path
 * @param {Array<RequestGlove> | RequestHandler} gloveList 
 * @param {RequestHandler} [handler]
 */
add.put = (path, gloveList, handler) => add('PUT', path, gloveList, handler)

/**
 * 添加新的 delete handler
 * @param {String} path
 * @param {Array<RequestGlove> | RequestHandler} gloveList 
 * @param {RequestHandler} [handler]
 */
add.delete = (path, gloveList, handler) => add('DELETE', path, gloveList, handler)
// 不要增加其他的 http 方法，除非你已经知道那些有什么用，并且认为是必要的


const isPro = require('../ctx/app').isProduction()
/** @param {IncomingMessage} req */
function get(req){
  let method = req.method
  let path = Url.parse(req.url).pathname
  if(!isPro)
    console.log(`收到请求 ${method} ${path}`)

  return map[method][path]||configuration.handle404
}

module.exports = {
  config,
  add,
  get
}