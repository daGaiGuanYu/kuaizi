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
    return this.getEntity()
  }
}

CommonError.Unknown = new CommonError('未知错误', 1)

module.exports = CommonError