const put = require('./map').put

module.exports = class {
  constructor(path, gloveList){
    this.path = path || ''
    this.gloveList = gloveList || []
  }
  
  get(){
    this.__put('GET', arguments)
  }
  post(){
    this.__put('POST', arguments)
  }
  put(){
    this.__put('PUT', arguments)
  }
  delete(){
    this.__put('DELETE', arguments)
  }

  __put(method, args){
    let [path, gloveList, handler] = formatParam(args)
    path = this.path + path
    gloveList = this.gloveList.concat(gloveList)
    put(method, path, gloveList, handler)
  }
}
