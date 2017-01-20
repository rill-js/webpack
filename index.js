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
  if (typeof file === 'object') {
    options = file
    file = 'webpack.config.js'
  }

  var devMiddleware = createDevMiddleware(load(file), options)
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
