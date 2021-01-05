const Ctx = require('./ctx')
const getHanlder = require('../router').get
const logger = require('../logger')
const responseData = require('./config').responseData

// 处理 http 请求的入口
module.exports = function(req, res){
  const ctx = new Ctx(req, res)
  const handle = getHanlder(req.method, ctx.url.pathname) // 从路由获取 handler
  try {
    var result = await handle(ctx) // 交给 handler 处理
    result = responseData.common(result) // 正常响应
  }catch(e){
    if(e instanceof NBug){ // nBug 响应
      result = responseData.nBug(e)
      // nbug 不需要打印调用栈
    } else { // 异常响应
      logger.error(`处理请求 [${method} ${pathname}] 时发生错误`)
      logger.error(e)
      result = responseData.error(e)
    }
  }

  if(ctx.__end == false) // 如果，还没被标记“结束”
    __writeJson(res, result) // 就写入数据
}

function __writeJson(response, data){
  response.setHeader('Content-type', 'application/json')
  let result = JSON.stringify(data)
  response.end(result)
}