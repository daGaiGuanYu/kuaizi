const NBug = require('../exception/n-bug')

module.exports = {
  baseUrl: '',
  gloveList: [],
  handle404(){ // 不会走任何 gloveList
    throw new NBug('没有此接口', 404)
  }
}