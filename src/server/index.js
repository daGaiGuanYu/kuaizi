// @ts-check
const Http = require('http')
const AbstractRequestContext = require('../ctx/abstract-request-context')
const Router = require('../handler/router')
const CommonError = require('../error/index')
const ExpectedError = require('../error/expected-error')

const isProduction = require('../ctx/app').isProduction()

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

function writeJson(res, data){
  if(!(data instanceof CommonError))
    data = {
      code: 0,
      data
    }
  res.setHeader('Content-type', 'application/json')
  let result = JSON.stringify(data)
  if(!isProduction){
    console.log('响应：')
    console.log(result)
  }
  res.end(result)
}