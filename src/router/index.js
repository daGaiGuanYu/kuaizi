// @ts-check
const Controller = require('./controller')
const router = require('./router')

module.exports = {
  Controller,
  config: router.config,
  add: router.add
}