const NBug = require('../exception/n-bug')

module.exports = {
  baseUrl: '',
  breadList: [],
  handle404(){ // 不会走任何 bread
    throw new NBug('没有此接口', 404)
  }
}