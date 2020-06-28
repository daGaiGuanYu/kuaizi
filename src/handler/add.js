const wear = require('wear-glove')
const router = require('./router')
const configuration = require('./configuration').data

module.exports = {
  get(path, gloveList, handler){
    __add('GET', path, gloveList, handler)
  },
  post(path, gloveList, handler){
    __add('POST', path, gloveList, handler)
  },
  put(path, gloveList, handler){
    __add('PUT', path, gloveList, handler)
  },
  delete(path, gloveList, handler){
    __add('DELETE', path, gloveList, handler)
  }
}

function __add(method, path, gloveList, handler){
  // 参数归位
  if(!path && !gloveList & !handler) // 没有参数（不算 method，以下亦然）
    throw Error('至少得传个 handler 过来')
  if(!gloveList && !handler){ // 只有一个参数（handler）
    handler = path
    path = ''
    gloveList = []
  }
  if(!handler){ // 两个参数(第二个是 handler；第一个有可能是 path，也可能是 gloveList)
    handler = gloveList
    if(path instanceof Array){
      gloveList = path
      path = ''
    } else {
      gloveList = []
    }
  }

  // 检查参数格式
  if(path.constructor != String)
    throw Error('path 必须是个 String')
  if(!(gloveList instanceof Array))
    throw Error('gloveList 必须是个 Array，即使你只提供一个手套，也要用中括号包起来，看起来也舒服些')
  if(!(handler instanceof Function))
    throw Error('handler 必须是个函数')

  // 加上全局配置
  path = configuration.baseUrl + path
  gloveList = [...configuration.gloveList, ...gloveList]

  // 检查 path
  if(!path)
    throw Error('path 不可为空，根路径请传入斜杠')

  // 查重
  if(router.map[method][path])
    throw Error(`${method}: ${path} 已经注册过了（有两个 handler 对应相同的 method 和 path）`)

  // go
  router.map[method][path] = wear(gloveList, handler)
  console.log(`收集到路由：${method} ${path}`)
}
