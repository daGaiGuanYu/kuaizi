// @ts-check
const isProduction = process.argv[2] == 'pro'

module.exports = {
  isProduction: () => isProduction
}