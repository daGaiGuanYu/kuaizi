const wear = require('wear-glove')
const checkLogin = require('../glove/controller/check-login')

module.exports = [
  wear({
    path: '/haha',
    gloveList: [checkLogin],
    fn(ctx){
      ctx.response.end('hello')
    }
  })
]