module.exports = {
  log(){
    console.log(new Date(), ' ', ...arguments)
  },
  error(){
    console.error(new Date(), ' ', ...arguments)
  }
}