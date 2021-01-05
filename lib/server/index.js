// @ts-check
const Http = require('http')
const logger = require('../logger')
const handleRequest = require('../handler/handle')

let started = false
exports.start = function(port = 8080){
  if(started)
    throw Error('服务器不可重复启动')
  started = true
  
  let server = Http.createServer(handleRequest)
  server.listen(port, () => {
    logger.log(`started on ${port}`)
  })
  return server
}