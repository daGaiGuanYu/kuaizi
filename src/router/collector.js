// @ts-check
/**
 * @typedef {import('../ctx/request')} RequestContext
 * @typedef {(ctx: RequestContext) => any} RequestHandler
 * @typedef {(fn: RequestHandler, ctx: RequestContext) => RequestHandler} RequestGlove
 * @typedef {import('http').IncomingMessage} IncomingMessage
 * @typedef {import('http').ServerResponse} ServerResponse
 */
const router = require('./index')

class Collector {
  /**
   * @param {String} [path] 
   * @param {Array<RequestGlove>} [gloveList] 
   */
  constructor(path, gloveList){
    this.path = path || ''
    this.gloveList = gloveList || []
  }

  /**
   * 添加新的 handler，（原始方法，不建议外部使用）
   * @param {String} method 
   * @param {String | Array<RequestGlove> | RequestHandler} path 
   * @param {Array<RequestGlove> | RequestHandler} [gloveList] 
   * @param {RequestHandler} [handler] 
   */
  __add(method, path, gloveList, handler){
    // router.add 只需要明确的 method 和 path 即可
    if(path.constructor == String){
      path = this.path + path
    } else {
      // path 不是字符串意味着 path 和 gloveList 实际上就是 gloveList 和 handler
      handler = /** @type{RequestHandler} */(gloveList)
      gloveList = /** @type{Array<RequestGlove>} */(path)
      path = this.path
    }
    
    if(gloveList instanceof Array)
      gloveList = [...this.gloveList, ...gloveList]
    else{
      handler = gloveList
      gloveList = this.gloveList
    }
    router.add(method, path, gloveList, handler)
  }

  /**
   * 添加新的 get handler
   * @param {String | Array<RequestGlove> | RequestHandler} path 
   * @param {Array<RequestGlove> | RequestHandler} [gloveList] 
   * @param {RequestHandler} [handler] 
   */
  get(path, gloveList, handler){
    this.__add('GET', path, gloveList, handler)
  }
  /**
   * 添加新的 post handler
   * @param {String | Array<RequestGlove> | RequestHandler} path 
   * @param {Array<RequestGlove> | RequestHandler} [gloveList] 
   * @param {RequestHandler} [handler] 
   */
  post(path, gloveList, handler){
    this.__add('POST', path, gloveList, handler)
  }
  /**
   * 添加新的 put handler
   * @param {String | Array<RequestGlove> | RequestHandler} path 
   * @param {Array<RequestGlove> | RequestHandler} [gloveList] 
   * @param {RequestHandler} [handler] 
   */
  put(path, gloveList, handler){
    this.__add('PUT', path, gloveList, handler)
  }
  /**
   * 添加新的 delete handler
   * @param {String | Array<RequestGlove> | RequestHandler} path 
   * @param {Array<RequestGlove> | RequestHandler} [gloveList] 
   * @param {RequestHandler} [handler] 
   */
  delete(path, gloveList, handler){
    this.__add('DELETE', path, gloveList, handler)
  }
}

module.exports = Collector
