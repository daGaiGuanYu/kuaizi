const Ctx = require('./ctx')
const getHanlder = require('../router').get
const logger = require('../logger')
const responseData = require('./config').responseData
const NBug = require('../exception/n-bug')

// 处理 http 请求的入口
module.exports = async function(req, res){
  const ctx = new Ctx(req, res)
  try {
    const handle = getHanlder(req.method, ctx.url.pathname) // 从路由获取 handler
    var result = await handle(ctx) // 交给 handler 处理
    result = responseData.success(result) // 正常响应
  }catch(e){
    if(e instanceof NBug){ // nBug 响应
      result = responseData.nBug(e)
      // nbug 不需要打印调用栈
    } else { // 异常响应
      logger.error(`处理请求 [${req.method} ${ctx.url.pathname}] 时发生错误`)
      logger.error(e)
      result = responseData.error(e)
    }
  }

  if(ctx.end == false){ // 如果，还没被标记“结束”
    __writeJson(res, result) // 就写入数据
    ctx.end = true
  }
}

function __writeJson(response, data){
  response.setHeader('Content-type', 'application/json')
  let result = JSON.stringify(data)
  response.end(result)
}