// @ts-check
const app = require('../ctx/app')
const fs = require('fs')
const Path = require('path')
const Url = require('url')
const { writeJson } = require('../util/request')
const CommonError = require('../common-error/index')
const { http: { method } } = require('../constants')
const RequestContext = require('../ctx/request')

const HandlerMap = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {}
}

let __handle404 = (request, response) => {
  writeJson(response, CommonError.NotFound)
}

module.exports = class Router {
  constructor(controllerFolder, baseUrl, handle404){
    if(handle404)
      __handle404 = handle404
    console.log('初始化路由')
    // 确认路径
    let exist = fs.existsSync(controllerFolder)
    if(!exist)
      throw Error(controllerFolder + '文件夹不存在，请再次确认路径，最好使用绝对路径') // 这种错误的目的在于阻止服务器运行
    console.log('controller 们的位置 --- ' + controllerFolder)
    // 组装 controller 文件路径
    let clist = fs.readdirSync(controllerFolder)
    console.log('controller 们的名字 --- ' + clist)

    // 上车！
    clist.forEach( controllerFileName => {
      // 组织绝对路径
      let controllerFileABName = Path.join(controllerFolder, controllerFileName)
      let controller = require(controllerFileABName)
      // 遍历 controller 里的 hanlder
      controller.forEach( handler => {
        // 把 handler 装车
        // 默认的 handler 方法是 get
        if(!handler.method)
          handler.method = method.GET
        // 检查方法名写错没有
        if(!HandlerMap[handler.method])
          throw Error('你的 handler 的方法名写错了吧：' + handler.method)
        if(!handler.path)
          handler.path = '/' + controllerFileName.split('.')[0] + (handler.appendPath||'')
        handler.path = baseUrl + handler.path
        
        console.log(`路由 --- ${handler.method} ${handler.path}`)
        // 真·上车
        HandlerMap[handler.method][handler.path] = handler.handler
      })
    })
    console.log('路由收集完毕')
  }
  async handle(request, response){
    let method = request.method
    let pathname = Url.parse(request.url).pathname
    if(!app.isProduction())
      console.log(`收到请求 ${method} ${pathname}`)
    let handler = HandlerMap[request.method][pathname]
    if(!handler)
      __handle404(request, response)
    else{
      let result
      try {
        result = await handler(new RequestContext(request, response))
      }catch(e){
        console.error(e) // 应该区分哪些异常需要打印调用栈，哪些不需要
        result = e.code?e:CommonError.Unknown
      }
      if(result)
        writeJson(response, result)
    }
  }
}
