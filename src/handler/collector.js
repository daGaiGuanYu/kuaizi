const add = require('./add')

module.exports = class {
  // 对构造函数的参数进行格式检查时，不宜使用 __proto__ 的形式
  constructor(path, gloveList){
    this.path = path || ''
    this.gloveList = gloveList || []
  }

  get(path, gloveList, handler){
    add.get(...this.__format(path, gloveList, handler))
  }
  post(path, gloveList, handler){
    add.post(...this.__format(path, gloveList, handler))
  }
  put(path, gloveList, handler){
    add.put(...this.__format(path, gloveList, handler))
  }
  delete(path, gloveList, handler){
    add.delete(...this.__format(path, gloveList, handler))
  }

  __format(path, gloveList, handler){
    if(path.constructor == String){
      path = this.path + path
    } else { // path 未传入
      handler = gloveList // 参数前推
      gloveList = path
      path = this.path // 这几句顺序不能换！
    }
    
    if(gloveList instanceof Array){
      gloveList = [...this.gloveList, ...gloveList]
    } else { // gloveList 未传入
      handler = gloveList // 参数前推
      gloveList = this.gloveList // 这几句顺序不能换！
    }
    return [path, gloveList, handler]
  }
}