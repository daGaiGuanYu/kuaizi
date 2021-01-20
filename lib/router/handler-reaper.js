const put = require('./index').put
const isString = require('../common/util').isString

module.exports = function({ path, breadList }){
  this.path = path || ''
  this.breadList = breadList || []
  return __put.bind(this)
}

function __put({ method, path = '', breadList = [], handler }){
  if(isString(path) == false)
    throw Error('path 必须是个 String，而你传入了 ' + path)
  if(!(breadList instanceof Array))
    throw Error('breadList 必须是个 Array，即使你只提供一个面包，也要用中括号包起来')
  
  path = this.path + path
  breadList = this.breadList.concat(breadList)
  put({ method, path, breadList, handler })
}