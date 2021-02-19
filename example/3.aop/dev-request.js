const { server, router, aop: {
  devRequest
}} = require('../../lib')

router.config.breadList.push(devRequest)

router.addHandler({
  method: 'get',
  path: '/hello',
  handler(){
    return 'hi yo~'
  }
})

server.start(8888)