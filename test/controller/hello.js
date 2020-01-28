const wear = require('wear-glove')
const checkLogin = require('../glove/controller/check-login')
const responseJsonData = require('../glove/controller/response-json-data')

module.exports = [
  wear({
    path: '/haha',
    gloveList: [checkLogin, responseJsonData],
    fn(ctx){
      return {
        name: 'weixianfa',
        code: 1
      }
    }
  })
]