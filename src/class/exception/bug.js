const Base = require('./base')

module.exports = class extends Base {
  /**
   * 筷子定义的系统错误
   * @param {string} log 系统记录的日志
   * @param {number} code 错误码
   */
  constructor(msg, code = 9999){
    super(msg)
    this.code = code
  }
}