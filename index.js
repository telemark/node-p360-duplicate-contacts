'use strict'

require.extensions['.sql'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}


// External requirements
var fs = require('fs')

// Local requirements
var config = require('./config')
var runQuery = require('./lib/runQuery')

var qryFindDuplicateContacts = require('./lib/sql/findDuplicateContacts.sql')
var qryGetStudentFolders = require('./lib/sql/getStudentFolders.sql')


function getListFromDb(callback) {
  runQuery(query, function (err, data) {
    if (err) {
      return callback(err)
    }
    return callback(null, data)
  })
}

switch (process.argv[2]) {
  case 'elevmappe':
    var query = qryGetStudentFolders
    break;
  case 'kontakt':
    var query = qryFindDuplicateContacts
    break;
  default:
    console.log('Bruk med parameter kontakt eller elevmappe')
    process.exit(1)
}

getListFromDb(function (err, data) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  var i = 0
  data.forEach(function (item) {
    console.log(item.id)
    i++
    if (data.length === i) {
      process.exit(0)
    }
  })
})
