const { server, router } = require('../../lib')

router.addHandler({
  method: 'get',
  path: '/hello',
  handler(){
    return 'hi yo~'
  }
})

server.start(8888)