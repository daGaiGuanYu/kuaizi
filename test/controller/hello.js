const wear = require('wear-glove')

module.exports = [
  wear({
    path: '/haha',
    fn(request, response){
      response.end('hello')
    }
  })
]