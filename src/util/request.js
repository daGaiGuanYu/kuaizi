//@ts-check

const TypeDef = require('../type-def/index')
const Url = require('url')
const qs = require('querystring')
const app = require('../ctx/app')
const CommonError = require('../common-error/index')

/** @param {TypeDef.IncomingMessage} req */
function getQuery(req){
  let querystring = Url.parse(req.url).query
  return qs.parse(querystring)
}

/** @param {TypeDef.IncomingMessage} req */
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

/**
 * @param {TypeDef.ServerResponse} res
 * @param {any} data
 */
function writeJson(res, data){
  if(!(data instanceof CommonError))
    data = {
      code: 0,
      data
    }
  res.setHeader('Content-type', 'application/json')
  let result = JSON.stringify(data)
  if(!app.isProduction()){
    console.log('响应：')
    console.log(result)
  }
  res.end(result)
}

module.exports = {
  getQuery, getJson, writeJson
}