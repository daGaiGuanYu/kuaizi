const Url = require('url')
const logger = require('../logger')

module.exports = class RequestCtx {
  end = false // 标记：向 res 写入数据前，检测 end 的值，如果为真，则不再响应

  constructor(req, res){
    this.req = req
    this.res = res
    this.url = Url.parse(req.url, true) // path, query
  }

  getParam(){ // 路径里的参数，如 name=pipi&year=2
    return this.url.query
  }

  #jsonData
  // 懒的 getJson
  async getJson(){
    if(!this.#jsonData)
      this.#jsonData = await this.#getJson()
    return this.#jsonData
  }
  // 解析请求里的 json
  async #getJson(){
    return new Promise( resolve => {
      let jsonStr = ''
      this.req.on('data', chunck =>
        jsonStr += chunck.toString()
      )
      this.req.on('end', () => {
        try{
          resolve(JSON.parse(jsonStr))
        }catch(e){
          logger.error('解析请求Body里的json数据 失败')
          resolve(null)
        }
      })
    })
  }
}