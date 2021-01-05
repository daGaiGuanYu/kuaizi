const Url = require('url')
const logger = require('../logger')

module.exports = class RequestCtx {
  constructor(req, res){
    this.req = req
    this.res = res
    this.url = Url.parse(req.url, true) // path, query
    this.__end = false // 标记：向 res 写入数据前，检测 end 的值，如果为真，则不再响应
  }

  getParam(){ // 路径里的参数，如 name=pipi&year=2
    return this.url.query
  }

  // 懒的 getJson
  async getJson(){
    if(!this.__json)
      this.__json = await __getJson(this.req)
    return this.__json
  }
  
  end(){
    this.__end = true
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