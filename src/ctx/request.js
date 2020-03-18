//@ts-check
const http = require('http')
const util = require('../util/request')

class RequestContext{
  /**
   * @param {http.IncomingMessage} req 
   * @param {http.ServerResponse} res 
   */
  constructor(req, res){
    this.req = req
    this.res = res
    this.sessionData = {}
  }

  getQuery(){
    if(!this.__query)
      this.__query = util.getQuery(this.req)
    return this.__query
  }

  async getJson(){
    if(!this.__json)
      this.__json = await util.getJson(this.req)
    return this.__json
  }

  writeJson(data){
    return util.writeJson(this.res, data)
  }
}

module.exports = RequestContext