// @ts-check
const http = require('http')
const RequestContext = require('../ctx/request')
const router = require('../router')
const CommonError = require('../error/index')
const ExpectedError = require('../error/expected-error')
const { writeJson } = require('../util/request')

let started = false
function start(port = 6666){
  if(started)
    throw Error('服务器不可重复启动')
  started = true
  
  let server = http.createServer(handle)
  server.listen(port)
  console.log(`started on ${port}`)
  return server
}

async function handle(req, res){
  let result
  try {
    result = await router.get(req)(new RequestContext(req, res))  
  }catch(e){
    if(!(e instanceof ExpectedError))
      console.error(e)
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