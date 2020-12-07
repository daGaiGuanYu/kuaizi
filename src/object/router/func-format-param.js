// 使省略的参数归位
module.exports = function([path, gloveList, handler]){
  if(!path && !gloveList & !handler)
    throw Error('至少得传个 handler 过来')

  // 只有一个参数（handler）
  if(!gloveList){ 
    handler = path
    path = ''
    gloveList = []
  }
  // 两个参数(第二个是 handler；第一个有可能是 path，也可能是 gloveList)
  if(!handler){
    handler = gloveList
    if(path instanceof Array){
      gloveList = path
      path = ''
    } else {
      gloveList = []
    }
  }
  return [path, gloveList, handler]
}