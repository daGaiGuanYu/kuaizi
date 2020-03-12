const raw = {
  log: console.log,
  err: console.error
}

console.log = function(...args){
  raw.log(new Date(), ...args)
}

console.error = function(...args){
  raw.err(new Date(), ...args)
}

module.exports = {}