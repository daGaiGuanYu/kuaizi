// @ts-check
// 应该有一个规则来规定哪些错误需要打印调用栈

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
CommonError.WrongUsernameOrPassword = new CommonError('用户名或密码错误', 2)
CommonError.NotLogin = new CommonError('请先登录', 3)
CommonError.PermissionDenied = new CommonError('没有权限', 4)

CommonError.NotFound = new CommonError('未找到资源', 404)

module.exports = CommonError
