module.exports = {
  IsProduction: process.argv[2] == 'pro',
  Nothing: new Symbol('handler 返回这东西时，筷子就不会返回给前端任何东西了')
}