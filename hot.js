'use strict'

var createHotMiddleware = require('webpack-hot-middleware')
var util = require('./util')
var middlewareCache = {}

/**
 * Creates a rill compatible middleware for webpack-dev-middleware.
 *
 * @param {String} file - the path to the webpack config file.
 * @param {Object} options - options for the dev middleware.
 */
module.exports = function (file, options) {
  // Make file optional.
  if (util.isMissingFile(file)) {
    options = file
    file = 'webpack.config.js'
  }

  // Set default options.
  options = options || {}
  options.path = options.path || '/@rill/webpack/hot'
  options.log = 'log' in options ? options.log : false

  // Check for cached version of middleware.
  var cacheKey = JSON.stringify(arguments)
  var cached = middlewareCache[cacheKey]

  // Return cached if possible.
  if (cached) return cached

  // Create a rill compatible version of the hot middleware.
  var hotMiddleware = createHotMiddleware(util.load(file), options)
  cached = middlewareCache[cacheKey] = function webpackHotMiddleware (ctx, next) {
    if (ctx.req.pathname === options.path) {
      ctx.res.respond = false
      return hotMiddleware(ctx.req.original, ctx.res.original)
    }

    return next()
  }
  return cached
}
