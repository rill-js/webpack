'use strict'

var path = require('path')
var webpack = require('webpack')
var root = path.join(__dirname, '/../../../')
var compilers = {}
var COMPILER_NAMES = {
  'Compiler': true,
  'MultiCompiler': true
}

/**
 * Loads a webpack config, creates a compiler and caches it.
 *
 * @param {String} file - the webpack config file to load.
 */
exports.load = function load (file) {
  if (exports.isCompiler(file)) return file
  if (typeof file !== 'string') throw new TypeError('@rill/webpack: config path must be a string or webpack compiler.')
  if (!path.isAbsolute(file)) file = path.join(root, file)
  compilers[file] = compilers[file] || webpack(require(file))
  return compilers[file]
}

// Checks if an object is a webpack compiler.
exports.isCompiler = function isCompiler (compiler) {
  return Boolean(
    compiler &&
    compiler.constructor &&
    COMPILER_NAMES[compiler.constructor.name]
  )
}

// Checks if object is an options for middleware.
exports.isMissingFile = function missingFile (file) {
  return file === undefined || (typeof file === 'object' && !exports.isCompiler(file))
}
