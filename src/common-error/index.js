// @ts-check

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

CommonError.Unknown = { code: 1, msg: '未知错误'}
CommonError.NotFound = { code: 404, msg: '未找到资源'}

module.exports = CommonError
