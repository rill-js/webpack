'use strict'

var createDevMiddleware = require('webpack-dev-middleware')
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

  // Create dev middleware.
  options = options || {}

  // Check for cached version of middleware.
  var cacheKey = JSON.stringify(arguments)
  var cached = middlewareCache[cacheKey]
  var devMiddleware = cached || createDevMiddleware(util.load(file), options)

  // Add custom 'onValid' option that gets get called on initial render.
  if (typeof options.onValid === 'function') {
    devMiddleware.waitUntilValid(options.onValid)
  }

  // Return cached if possible.
  if (cached) return cached

  // Create a rill compatible version of the dev middleware.
  cached = middlewareCache[cacheKey] = function webpackDevMiddleware (ctx, next) {
    return new Promise(function (resolve, reject) {
      devMiddleware(ctx.req.original, {
        end: function (body) {
          ctx.res.body = body
          resolve()
        },
        setHeader: function (name, value) {
          ctx.res.set(name, value)
        }
      }, function (err) {
        if (err) reject(err)
        else resolve(next())
      })
    })
  }

  return cached
}
