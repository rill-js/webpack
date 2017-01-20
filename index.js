'use strict'

var createDevMiddleware = require('webpack-dev-middleware')
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

  // Create dev middleware.
  options = options || {}
  var devMiddleware = createDevMiddleware(load(file), options)

  // Add custom 'onValid' option that gets get called on initial render.
  if (typeof options.onValid === 'function') {
    devMiddleware.waitUntilValid(options.onValid)
  }

  return function webpackDevMiddleware (ctx, next) {
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
}
