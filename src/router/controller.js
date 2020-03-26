// 其实 Controller 只是统一收集 handler 的工具

// @ts-check
const router = require('./index')

class Controller {
  /**
   * @param {String} [path] 
   * @param {Array<RequestGlove>} [gloveList] 
   */
  constructor(path, gloveList){
    this.path = path || ''
    this.gloveList = gloveList || []
  }

  /**
   * 添加新的 handler，不添加 controller 的前置 path，不添加 controller 的 glove，只为了让此 route 显得和当前 controller 里的其他 handler 非常像
   * @param {String} method 
   * @param {String} path 
   * @param {Array<RequestGlove> | RequestHandler} gloveList 
   * @param {RequestHandler} [handler]
   */
  add(method, path, gloveList, handler){
    router.add(method, path, gloveList, handler)
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

module.exports = Controller
