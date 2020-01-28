const fs = require('fs')
const Path = require('path')

module.exports = class Router {
  constructor(controllerFolder){
    console.log('初始化路由')
    // 确认路径
    let exist = fs.existsSync(controllerFolder)
    if(!exist)
      throw Error(controllerFolder + '文件夹不存在，请再次确认路径，最好使用绝对路径')
    console.log('controller 们的位置 --- ' + controllerFolder)
    // 组装 controller 文件路径
    let clist = fs.readdirSync(controllerFolder)
    console.log('controller 们的名字 --- ' + clist)
    clist = clist.map(item => Path.join(controllerFolder, item))
    // require 所有 controller
    clist = clist.map(item => require(item))

  }
  handle(request){

  }
}
