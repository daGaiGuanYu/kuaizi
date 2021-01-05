const put = require('./index').put
const isString = require('../common/util').isString

module.exports = function({ path, gloveList }){
  this.path = path || ''
  this.gloveList = gloveList || []
  return __put.bind(this)
}

function __put({ method, path = '', gloveList = [], handler }){
  if(isString(path) == false)
    throw Error('path 必须是个 String，而你传入了 ' + path)
  if(!(gloveList instanceof Array))
    throw Error('gloveList 必须是个 Array，即使你只提供一个手套，也要用中括号包起来')
  
  path = this.path + path
  gloveList = this.gloveList.concat(gloveList)
  put({ method, path, gloveList, handler })
}