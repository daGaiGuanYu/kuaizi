// @ts-check
const Http = require('http')
const AbstractRequestContext = require('../ctx/abstract-request-context')
const Router = require('../handler/router')
const Exception = require('../exception/base')
const Bug = require('../exception/bug')
const NBug = require('../exception/n-bug')

const { IsProduction, Nothing } = require('../ctx/constant')

let started = false
function start(port = 8080){
  if(started)
    throw Error('服务器不可重复启动')
  started = true
  
  let server = Http.createServer(handle)
  server.listen(port)
  console.log(`started on ${port}`)
  return server
}

async function handle(req, res){
  let result
  try {
    result = await Router.get(req)({
      __proto__: AbstractRequestContext,
      req, res
    })
  }catch(e){
    // 三种 error，nbug、bug、原生
    if(!(e instanceof NBug)) // nbug 不需要打印调用栈
      console.error(e)
    result = (e instanceof Exception)?e:Bug.Unknown // 原生 error，判定为“未知错误”
  }
  if(result != Nothing)
    writeJson(res, result)
}

function stop(){
  // TODO
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