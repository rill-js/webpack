'use strict'

var path = require('path')
var webpack = require('webpack')
var root = path.join(__dirname, '/../../../')
var compilers = {}

/**
 * Loads a webpack config, creates a compiler and caches it.
 *
 * @param {String} file - the webpack config file to load.
 */
module.exports = function loadConfig (file) {
  if (typeof file !== 'string') throw new TypeError('@rill/webpack: config path must be a string.')
  if (!path.isAbsolute(file)) file = path.join(root, file)
  compilers[file] = compilers[file] || webpack(require(file))
  return compilers[file]
}
