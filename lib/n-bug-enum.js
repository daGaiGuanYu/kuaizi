const NBug = require('../src/object/exception/n-bug')

module.exports = {
  NotFound: new NBug('未找到资源', 1001),
  WrongUsernameOrPassword: new NBug('用户名或密码错误', 1002),
  NotLogin: new NBug('请先登录', 1003),
  PermissionDenied: new NBug('没有权限', 1004),
  NotExist: new NBug('数据不存在', 1005)
}