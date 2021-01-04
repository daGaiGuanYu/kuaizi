module.exports = class extends Error{
  equalTo(tar){
    return tar && (tar.code == this.code) || false
  }
}