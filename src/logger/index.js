// @ts-check

/** @param {any} tar */
const log = function(tar){
  if(tar.constructor == String)
    console.log(new Date() + ' ' + tar)
  else{
    console.log(new Date())
    console.log(tar)
  }
}

/** @param {any} tar */
const logerr = function(tar){
  if(tar.constructor == String)
    console.error(new Date() + ' ' + tar)
  else{
    console.error(new Date())
    console.error(tar)
  }
}

module.exports = {
  log, logerr
}
