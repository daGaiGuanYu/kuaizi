const { Server, HandleRequest, Exception } = require('kuaizi')

Server.start(8080)

HandleRequest.get('/', ctx => {
  someMethod()
  console.log('这是执行不到的代码')
  return '这里也不会返回，因为根本也执行不到这里'
})

function someMethod(){
  throw new Exception.Bug('这是返回给用户看的错误信息', 666, '这里记录bug信息')
}