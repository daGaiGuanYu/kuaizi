const Url = require('url')
const { logger } = require('../../config/index')

module.exports = class {
  constructor(req, res){
    this.req = req
    this.res = res
    this.url = Url.parse(req.url, true)
  }
  
  // 懒的 __getParam
  getParam(){
    return this.url.query
  }

  // 解析请求里的 json
  async __getJson(){
    return new Promise( resolve => {
      let jsonStr = ''
      this.req.on('data', chunck =>
        jsonStr += chunck.toString()
      )
      this.req.on('end', () => {
        try{
          resolve(JSON.parse(jsonStr))
        }catch(e){
          logger.log('解析请求Body里的json数据 失败')
          resolve(null)
        }
      })
    })
  }
  // 懒的 getJson
  async getJson(){
    if(!this.__json)
      this.__json = await this.__getJson()
    return this.__json
  }
}