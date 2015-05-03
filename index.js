/**
 * Dependencies
 */

var slice   = require('sliced')
var through = require('through2')

/**
 * Make `fn` streamable by leveraging `through2`
 * to pass the contents of a stream first and then
 * any consecutive arguments to it.
 *
 * @param  {function} fn
 * @param  {mixed}    [...args]
 * @return {object}
 *
 * @api public
 */

function anyStream(fn) {
  var args   = slice(arguments, 1)
  var stream = through(transform, flush)
  var buffer = []

  function transform(chunk, encoding, done) {
    buffer.push(chunk)
    done()
  }

  function flush(done) {
    args.unshift(buffer.join('\n'))
    this.push(fn.apply(this, args))
    done()
  }

  return stream
}

/**
 * Exports
 */

module.exports = anyStream
