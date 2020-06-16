const NBug = require('../exception/n-bug')

const data = {
  configed: false,
  baseUrl: '',
  gloveList: [],
  handle404: () => NBug.NotFound
}

function config(baseUrl, handle404, gloveList){
  if(data.configed)
    throw Error('Handler 只能配置一次') // 多次配置，就得把 router 初始化一遍，相当耗时
  data.configed = true

  if(baseUrl)
    data.baseUrl = baseUrl
  if(handle404)
    data.handle404 = handle404
  if(gloveList)
    data.gloveList = gloveList
}

module.exports = {
  data, config
}