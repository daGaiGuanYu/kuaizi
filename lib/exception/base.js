module.exports = class extends Error{
  equalTo(tar){
    return tar?.code == this.code
  }
}