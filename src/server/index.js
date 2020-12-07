// @ts-check
const Http = require('http')
const ReqContext = require('../object/ctx/request')
const getHanlder = require('../object/router/map').get
const Bug = require('../object/exception/bug')
const NBug = require('../object/exception/n-bug')
const ResponseData = require('../object/entity/response-data')

const { IsProduction, Nothing } = require('../constant/index')

let started = false
function start(port = 8080){
  if(started)
    throw Error('服务器不可重复启动')
  started = true
  
  let server = Http.createServer(handle)
  server.listen(port, () => {
    console.log(`started on ${port}`)
  })
  return server
}

async function handle(req, res){
  let result
  const ctx = new ReqContext(req, res)
  const method = req.method
  const pathname = ctx.url.pathname
  try {
    const handler = getHanlder(method, pathname)
    result = await handler(ctx)
  }catch(e){
    // 三种 error，nbug、bug、原生
    if(e instanceof NBug){
      result = e
    } else { // nbug 不需要打印调用栈
      console.error(method, pathname)
      console.error(e)
      result = ResponseData(1, '未知错误')
    }
  }
  if(result != Nothing)
    writeJson(res, result)
}

function writeJson(response, data){
  if(!(data instanceof Exception))
    data = {
      code: 0,
      data
    }
  response.setHeader('Content-type', 'application/json')
  let result = JSON.stringify(data)
  if(!IsProduction){
    console.log('响应：')
    console.log(result)
  }
  response.end(result)
}

module.exports = {
  start
}