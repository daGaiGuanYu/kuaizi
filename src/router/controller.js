// 其实 Controller 只是统一收集 handler 的工具

// @ts-check
const router = require('./router.js')

class Controller {
  constructor(path, gloveList){
    this.path = path || ''
    this.gloveList = gloveList || []
  }

  /**
   * 添加新的 handler
   * @param {String} method 
   * @param {String} path 
   * @param {Array<Function> | Function} gloveList 
   * @param {Function} [handler]
   */
  add(method, path, gloveList, handler){ // 不添加 controller 的前置 path，不添加 controller 的 glove
    router.add(method, path, gloveList, handler)
  }

  __add(method, args){
    let path, gloveListAndHandler
    if(args[0].constructor == String){
      path = this.path + args[0]
      gloveListAndHandler = args.slice(1)
    } else {
      path = this.path
      gloveListAndHandler = args
    }
    router.add(method, path, ...this.gloveList, ...gloveListAndHandler)
  }

  get(...args){ // 一般而言，controller 里的 path 是经常被省略的
    this.__add('GET', args)
  }
  post(...args){
    this.__add('POST', args)
  }
  put(...args){
    this.__add('PUT', args)
  }
  delete(...args){
    this.__add('DELETE', args)
  }
}

module.exports = Controller
