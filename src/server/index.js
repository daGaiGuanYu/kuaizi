// @ts-check
const http = require('http')
const RequestContext = require('../ctx/request')
const router = require('../router/index')
const CommonError = require('../common-error/index')
const { writeJson } = require('../util/request')

let started = false
function start(port = 6666){
  if(started)
    throw Error('服务器不可重复启动')
  started = true
  
  http.createServer(handle).listen(port)
  console.log(`started on ${port}`)
}

async function handle(req, res){
  let result
  try {
    result = await router.getHandler(req)(new RequestContext(req, res))  
  }catch(e){
    console.error(e) // 应该区分哪些异常需要打印调用栈，哪些不需要
    result = e.code?e:CommonError.Unknown
  }
  if(result)
    writeJson(res, result)
}

function stop(){
  // TODO
}

module.exports = {
  start
}