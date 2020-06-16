const Exception = require('./base')

class Bug extends Exception {}

Bug.Unknown = new Bug('未知错误', 1)

module.exports = Bug