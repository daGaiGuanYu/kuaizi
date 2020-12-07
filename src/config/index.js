const NBug = require('../object/exception/n-bug')

const err404 = {
  msg: '没有此接口'
}
exports.router = {
  baseUrl: '',
  gloveList: [],
  handle404: () => err404
}

exports.responseData = function(data){
  if(data instanceof NBug)
    return data
  else if(data instanceof Error)
    return {
      errCode: 1,
      msg: '未知错误'
    }
  return {
    data,
    errCode: 0
  }
}