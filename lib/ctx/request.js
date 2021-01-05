const Url = require('url')
const { logger } = require('../logger')

module.exports = class {
  constructor(req, res){
    this.req = req
    this.res = res
    this.url = Url.parse(req.url, true) // path, method, query
  }
  
  getParam(){
    return this.url.query
  }

  // 懒的 getJson
  async getJson(){
    if(!this.__json)
      this.__json = await __getJson(this.req)
    return this.__json
  }
}

// 解析请求里的 json
async function __getJson(req){
  return new Promise( resolve => {
    let jsonStr = ''
    req.on('data', chunck =>
      jsonStr += chunck.toString()
    )
    req.on('end', () => {
      try{
        resolve(JSON.parse(jsonStr))
      }catch(e){
        logger.error('解析请求Body里的json数据 失败')
        resolve(null)
      }
    })
  })
}