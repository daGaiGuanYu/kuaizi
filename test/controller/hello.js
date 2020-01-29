const wear = require('wear-glove')
const checkLogin = require('../glove/controller/check-login')
const responseJsonData = require('../glove/controller/response-json-data')
const { glove } = require('../../src/index')

module.exports = [
  wear({
    path: '/haha',
    gloveList: [checkLogin, glove.commonRequest, responseJsonData],
    fn(ctx){
      console.log(ctx.data)
      console.log(ctx.query)
      return {
        name: 'weixianfa',
        code: 1
      }
    }
  })
]