// @ts-check
const Url = require('url')
const Controller = require('./controller')
const router = require('./router')

const isPro = require('../ctx/app').isProduction()
/** @param {import('http').IncomingMessage} req */
function getHandler(req){
  let method = req.method
  let path = Url.parse(req.url).pathname
  if(!isPro)
    console.log(`收到请求 ${method} ${path}`)
  return router.get(method, path)
}

module.exports = {
  Controller,
  router,
  getHandler
}