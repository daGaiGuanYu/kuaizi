const fs = require('fs')

module.exports = class Router {
  constructor(controllerFolder){
    // 确认路径
    let exist = fs.existsSync(controllerFolder)
    if(!exist)
      throw Error(controllerFolder + '文件夹不存在，请再次确认路径，最好使用绝对路径')
    // 组装 controller 文件路径
    let clist = fs.readdirSync(controllerFolder)
    console.log(clist)

  }
  handle(request){

  }
}
