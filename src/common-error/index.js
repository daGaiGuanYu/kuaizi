const entity = require('./entity')

class CommonError extends Error {
  constructor(msg, code){
    super(msg)
    this.code = code
  }
  getEntity(){
    return {
      code: this.code,
      msg: this.message
    }
  }
}

Object.assign(CommonError, entity)

module.exports = CommonError
