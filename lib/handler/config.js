// 处理各种响应的方法（暴露出去，用以配置不同的处理方法）

module.exports = {
  responseData: {
    success: data => ({ // 正常响应
      errCode: 0,
      data
    }),
    error: err => ({ // 异常响应
      errCode: err.code || 1,
      msg: '未知错误'
    }),
    nBug: err => err // nBug 响应
  }
}