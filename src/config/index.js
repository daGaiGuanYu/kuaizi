exports.router = {
  baseUrl: '',
  gloveList: [],
  handle404: () => ({
    msg: '没有此接口'
  })
}

exports.responseData = {
  common: data => ({
    errCode: 0,
    data
  }),
  nBug: err => err,
  error: err => ({
    errCode: err.code || 1,
    msg: '未知错误'
  })
}

exports.logger = console