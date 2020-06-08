module.exports = {
  config: require('./configuration').config,
  ...require('./add'),
  Collector: require('./collector')
}