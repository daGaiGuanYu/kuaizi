module.exports = function(response, data){
  response.setHeader('Content-type', 'application/json')
  let result = JSON.stringify(data)
  if(!app.production){
    console.log(`响应：`)
    console.log(result)
  }
  response.end(result)
}
