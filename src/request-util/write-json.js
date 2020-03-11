// @ts-check
const { log } = require('../logger')
const app = require('../ctx/app')

module.exports = function(response, data){
  response.setHeader('Content-type', 'application/json')
  let result = JSON.stringify(data)
  if(!app.isProduction()){
    log(`响应：`)
    log(result)
  }
  response.end(result)
}
