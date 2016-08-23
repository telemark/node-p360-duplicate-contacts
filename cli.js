#! /usr/bin/env node
'use strict'

require.extensions['.sql'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

// External requirements
var fs = require('fs')
var opn = require('opn')

// Local requirements
var getListFromDb = require('./index')
var query = process.argv[2]
var filename = query + '.txt'

getListFromDb(query, function (error, data) {
  if (error) {
    console.error(error)
    process.exit(1)
  }

  var list = []

  data.forEach(function (item) {
    list.push(item.tittel)
  })

  fs.writeFileSync(filename, list.join('\n'))

  opn(filename)

  process.exit(0)
})
