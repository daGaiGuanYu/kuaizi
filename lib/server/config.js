module.exports = {
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