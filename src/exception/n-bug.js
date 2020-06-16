const Exception = require('./base')

class NBug extends Exception {}

NBug.NotFound = new NBug('未找到资源', 1001)
NBug.WrongUsernameOrPassword = new NBug('用户名或密码错误', 1002)
NBug.NotLogin = new NBug('请先登录', 1003)
NBug.PermissionDenied = new NBug('没有权限', 1004)
NBug.NotExist = new NBug('数据不存在', 1005)

module.exports = NBug