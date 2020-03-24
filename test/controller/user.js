// @ts-check

const Controller = require('../../src/index').router.Controller

let ctl = new Controller('/user')

ctl.get([(fn, ctx) => {
  console.log('controller 里的 aop')
  return fn(ctx)
}], (ctx) => {
  console.log(ctx.getQuery())
  return 'user'
})

