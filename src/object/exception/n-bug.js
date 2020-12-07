module.exports = class extends Error {
  /**
   * 用户的异常操作
   * @param {string} msg 返回给用户的消息
   * @param {number} code 错误码
   * @param {string} log 系统记录的日志（一般不需要）
   */
  constructor(msg, code = 9999, log = ''){
    super(log)
    this.msg = msg
    this.code = code
  }

  equalTo(tar){
    return tar && (tar.code == this.code) || false
  }
  toJSON(){ // 改变 JSON.stringify(new Exception()) 的行为
    return {
      code: this.code,
      msg: this.msg
    }
  }
}