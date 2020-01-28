const fs = require('fs')
const Path = require('path')

const HandlerMap = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {}
}

module.exports = class Router {
  constructor(controllerFolder, handle404){
    this.handle404 = handle404
    console.log('初始化路由')
    // 确认路径
    let exist = fs.existsSync(controllerFolder)
    if(!exist)
      throw Error(controllerFolder + '文件夹不存在，请再次确认路径，最好使用绝对路径')
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
          handler.method = 'GET'
        // 检查方法名写错没有
        if(!HandlerMap[handler.method])
          throw Error('你的 handler 的方法名写错了吧：' + handler.method)
        console.log(`路由 --- ${handler.method} ${handler.path}`)
        // 真·上车
        HandlerMap[handler.method][handler.path] = handler
      })
    })
    console.log('路由收集完毕')
  }
  handle(request, response){

  }
}
