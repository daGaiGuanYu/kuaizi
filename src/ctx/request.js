//@ts-check
const http = require('http')

module.exports = class RequestContext{
  /**
   * @param {http.IncomingMessage} req 
   * @param {http.ServerResponse} res 
   */
  constructor(req, res){
    this.req = req
    this.res = res
    this.sessionData = {}
  }

  getQueryData(){
    // TODO
  }

  getJsonBodyData(){
    // TODO
  }

  writeJsonData(){
    // TODO
  }
}