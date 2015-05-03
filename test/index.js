/**
 * Dependencies
 */

var test    = require('tape')
var content = require('contentstream')
var concat  = require('concat-stream')

var toUppercase  = require('upper-case')
var htmlMinifier = require('html-minifier').minify

var anyStream = require('../')

/**
 * Tests
 */

test('anyStream(fn)', function(assert) {
  var input  = content('This is a test')
  var stream = input.pipe(anyStream(toUppercase))

  stream.pipe(concat(function(data) {
    assert.equal(data.toString(), 'THIS IS A TEST')
    assert.end()
  }))
})

test('anyStream(fn, args)', function(assert) {
  var input  = content('<h1>\nThis is a test\n</h1>\n<!-- This is a test -->')
  var stream = input.pipe(anyStream(htmlMinifier, {
    collapseWhitespace: true,
    removeComments: true
  }))

  stream.pipe(concat(function(data) {
    assert.equal(data.toString(), '<h1>This is a test</h1>')
    assert.end()
  }))
})
