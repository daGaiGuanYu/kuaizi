const put = require('./map').put
const formatParam = require('./func-format-param')

module.exports = {
  get(){
    __put('GET', arguments)
  },
  post(){
    __put('POST', arguments)
  },
  put(){
    __put('PUT', arguments)
  },
  delete(){
    __put('DELETE', arguments)
  }
}

function __put(method, args){
  args = formatParam(args)
  put(method, ...args)
}