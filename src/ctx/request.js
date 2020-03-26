//@ts-check
const util = require('../util/request')
const type = require('../type-def/index')

class RequestContext{
  /**
   * @param {type.IncomingMessage} req 
   * @param {type.ServerResponse} res 
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
}

module.exports = RequestContext