const Url = require('url')
const configuration = require('./configuration')
const isProduction = require('../ctx/app').isProduction()

const map = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {}
}

// 从 Http.IncomingMessage 里取出 path 和 method 返回 RequestHandler
function get(req){
  const method = req.method
  const path = Url.parse(req.url).pathname
  if(!isProduction)
    console.log(`收到请求 ${method} ${path}`)
  return map[method][path]||configuration.data.handle404
}

module.exports = {
  map, get
} 