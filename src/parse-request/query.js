const Url = require('url')
const qs = require('querystring')

module.exports = function(req){
  let querystring = Url.parse(req.url).query
  return qs.parse(querystring)
}
