const notNil = exports.notNil = function(target){
  return target != null && target != undefined
}

exports.isString = function(target){
  return notNil(target) && (typeof target == 'string' || target instanceof String)
}