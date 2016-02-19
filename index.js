#! /usr/bin/env node
'use strict'

require.extensions['.sql'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

// External requirements
var fs = require('fs')
var opn = require('opn')

// Local requirements
var runQuery = require('./lib/runQuery')

var qryFindDuplicateContacts = require('./lib/sql/findDuplicateContacts.sql')
var qryGetStudentFolders = require('./lib/sql/getStudentFolders.sql')

var filename = process.argv[2] + '.txt'

var query

function getListFromDb (callback) {
  runQuery(query, function (err, data) {
    if (err) {
      return callback(err)
    }
    return callback(null, data)
  })
}

switch (process.argv[2]) {
  case 'elevmappe':
    query = qryGetStudentFolders
    break
  case 'kontakt':
    query = qryFindDuplicateContacts
    break
  default:
    console.log('Bruk med parameter kontakt eller elevmappe')
    process.exit(1)
}

getListFromDb(function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  var list = []

  data.forEach(function (item) {
    list.push(item.id)
  })
  fs.writeFileSync(filename, list.join('\n'))
  opn(filename)
  process.exit(0)
})
