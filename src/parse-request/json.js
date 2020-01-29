module.exports = function(req){
  return new Promise( resolve => {
    let jsonStr = ''
    req.on('data', chunck =>
      jsonStr += chunck.toString()
    )
    req.on('end', () => {
      try{
        resolve(JSON.parse(jsonStr))
      }catch(e){
        console.log('解析请求Body里的json数据 失败')
        resolve({})
      }
    })
  })
}
