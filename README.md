# any-stream

[![NPM version][npm-img]][npm-url]
[![License][license-img]][license-url]
[![Build status][travis-img]][travis-url]

Make any function that takes string input (as the first argument) streamable.

## Installation

```
npm install any-stream
```

## Usage

### API

#### anyStream(fn, [...args])

Make `fn` streamable by leveraging [through2][through2] to pass the contents of
a stream first and then any consecutive arguments to it.

#### Example

``` javascript
var fs           = require('fs')
var anyStream    = require('any-stream')
var htmlMinifier = require('html-minifier').minify

var input  = fs.createReadStream('src/index.html')
var output = fs.createWriteStream('dist/index.html')

input
  .pipe(anyStream(htmlMinifier, {
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(output)
```

[npm-img]: https://img.shields.io/npm/v/any-stream.svg?style=flat-square
[npm-url]: https://npmjs.org/package/any-stream
[license-img]: http://img.shields.io/npm/l/any-stream.svg?style=flat-square
[license-url]: LICENSE
[travis-img]: https://img.shields.io/travis/gummesson/any-stream.svg?style=flat-square
[travis-url]: https://travis-ci.org/gummesson/any-stream
[through2]: https://github.com/rvagg/through2
