'use strict'

var path = require('path')
var webpack = require('webpack')
var Compiler = webpack.Compiler
var MultiCompiler = webpack.MultiCompiler
var root = path.join(__dirname, '/../../../')
var compilers = {}

/**
 * Loads a webpack config, creates a compiler and caches it.
 *
 * @param {String} file - the webpack config file to load.
 */
module.exports = function loadConfig (file) {
  if (file instanceof Compiler || file instanceof MultiCompiler) return file
  if (typeof file !== 'string') throw new TypeError('@rill/webpack: config path must be a string or webpack compiler.')
  if (!path.isAbsolute(file)) file = path.join(root, file)
  compilers[file] = compilers[file] || webpack(require(file))
  return compilers[file]
}
