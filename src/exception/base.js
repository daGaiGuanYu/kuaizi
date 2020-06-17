class Exception extends Error {
  constructor(msg, code = 9999, log){ // NBug 需不需要 log？万一需要统计用户常犯的错误呢
    super(msg)
    this.code = code
    this.log = log
  }

  toJSON(){ // 改变 JSON.stringify(new Exception()) 的行为
    return {
      code: this.code,
      msg: this.message
    }
  }
}

module.exports = Exception