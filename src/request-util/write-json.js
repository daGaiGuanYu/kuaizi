// @ts-check
const app = require('../ctx/app')

module.exports = function(response, data){
  response.setHeader('Content-type', 'application/json')
  let result = JSON.stringify(data)
  if(!app.isProduction()){
    console.log('响应：')
    console.log(result)
  }
  response.end(result)
}
