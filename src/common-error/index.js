// @ts-check

class CommonError extends Error {
  constructor(msg, code = 9999){ // 9999 为临时错误（基本不会被复用的异常）
    super(msg)
    this.code = code
  }
  getEntity(){
    return {
      code: this.code,
      msg: this.message
    }
  }
  toJSON(){ // 改变 JSON.stringify(new CommonError()) 的行为
    return JSON.stringify(this.getEntity())
  }
}

CommonError.Unknown = new CommonError('未知错误', 1)
CommonError.WrongUsernameOrPassword = new CommonError('用户名或密码错误', 2)
CommonError.NotFound = new CommonError('未找到资源', 404)

module.exports = CommonError
