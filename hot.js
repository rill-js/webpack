'use strict'

var createHotMiddleware = require('webpack-hot-middleware')
var load = require('./load')

/**
 * Creates a rill compatible middleware for webpack-dev-middleware.
 *
 * @param {String} file - the path to the webpack config file.
 * @param {Object} options - options for the dev middleware.
 */
module.exports = function (file, options) {
  // Make file optional.
  if (typeof file === 'object' || file === undefined) {
    options = file
    file = 'webpack.config.js'
  }

  options = options || {}
  options.path = options.path || '/__webpack_hmr'
  options.log = 'log' in options ? options.log : false
  var hotMiddleware = createHotMiddleware(load(file), options)
  return function webpackHotMiddleware (ctx, next) {
    if (ctx.req.pathname === options.path) {
      ctx.res.respond = false
      return hotMiddleware(ctx.req.original, ctx.res.original)
    }

    return next()
  }
}
