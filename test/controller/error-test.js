const wear = require('wear-glove')
const Chopstick = require('../../src/index')

module.exports = [
  wear({
    path: '/error',
    gloveList: [],
    fn(ctx){
      throw new Chopstick.CommonError('这是一个测试错误', 110)
      return '你应该看不到这个响应'
    }
  }),
  wear({
    path: '/unknown-error',
    gloveList: [],
    fn(ctx){
      throw Error('haha')
      return '你应该看不到这个响应'
    }
  })
]