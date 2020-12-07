module.exports = class extends Error {
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