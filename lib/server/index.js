// @ts-check
const Http = require('http')
const ReqContext = require('../ctx/request')
const NBug = require('../exception/n-bug')
const logger = require('../logger')
const getHanlder = require('../router').get
const config = require('./config')
const responseData = config.responseData

const { IsProduction, Nothing } = require('../../constant/index')

let started = false
function start(port = 8080){
  if(started)
    throw Error('服务器不可重复启动')
  started = true
  
  let server = Http.createServer(__handle)
  server.listen(port, () => {
    logger.log(`started on ${port}`)
  })
  return server
}

async function __handle(req, res){
  const ctx = new ReqContext(req, res)
  const method = req.method
  const pathname = ctx.url.pathname
  let result
  try {
    const handler = getHanlder(method, pathname)
    result = await handler(ctx)
  }catch(e){
    // 三种 error，nbug、bug、原生
    if(e instanceof NBug){
      result = responseData.nBug(e)
    } else { // nbug 不需要打印调用栈
      logger.error(`处理请求 [${method} ${pathname}] 时发生错误`)
      logger.error(e)
      result = responseData.error(e)
    }
  }
  if(result == Nothing) return
  
  result = responseData.common(result)
  __writeJson(res, result)
}

function __writeJson(response, data){
  response.setHeader('Content-type', 'application/json')
  let result = JSON.stringify(data)
  if(!IsProduction){
    logger.log('响应：')
    logger.log(result)
  }
  response.end(result)
}

module.exports = {
  start
}