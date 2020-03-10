// @ts-check
const { log } = require('../logger')

module.exports = function(response, data){
  response.setHeader('Content-type', 'application/json')
  let result = JSON.stringify(data)
  if(!app.production){
    log(`响应：`)
    log(result)
  }
  response.end(result)
}
