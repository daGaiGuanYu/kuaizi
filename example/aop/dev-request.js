const { server, router, aop: {
  devRequest
}} = require('../../lib')

router.config.gloveList.push(devRequest)

router.addHandler({
  method: 'get',
  path: '/hello',
  handler(){
    return 'hi yo~'
  }
})

server.start(8888)