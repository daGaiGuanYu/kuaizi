const CommonError = require('./index')

class ExpectedError extends CommonError {}

ExpectedError.WrongUsernameOrPassword = new CommonError('用户名或密码错误', 2)
ExpectedError.NotLogin = new CommonError('请先登录', 3)
ExpectedError.PermissionDenied = new CommonError('没有权限', 4)
ExpectedError.NotExist = new CommonError('数据不存在', 5)

ExpectedError.NotFound = new CommonError('未找到资源', 404)

module.exports = ExpectedError