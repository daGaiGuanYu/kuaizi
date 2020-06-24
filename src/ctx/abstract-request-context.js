const Url = require('url')

module.exports = {
  getQuery(){
    if(!this.__query)
      this.__query = getQuery(this.req)
    return this.__query
  },
  async getJson(){
    if(!this.__json)
      this.__json = await getJson(this.req)
    return this.__json
  }
}

function getQuery(req){
  return Url.parse(req.url, true).query
}

function getJson(req){
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