'use strict'

require.extensions['.sql'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8')
}

// External requirements
var fs = require('fs')

// Local requirements
var runQuery = require('./lib/runQuery')

var qryFindDuplicateContacts = require('./lib/sql/findDuplicateContacts.sql')
var qryGetStudentFolders = require('./lib/sql/getStudentFolders.sql')
var validTypes = ['elevmappe', 'kontakt']
var query

function getListFromDb (type, callback) {
  if (!type) {
    return callback(new Error('Missing required input: type'), null)
  }
  if (validTypes.indexOf(type) === -1) {
    return callback(new Error('Invalid type. Valid types are ' + validTypes.join(', ')), null)
  }

  switch (type) {
    case 'elevmappe':
      query = qryGetStudentFolders
      break
    case 'kontakt':
      query = qryFindDuplicateContacts
      break
  }

  runQuery(query, function (error, data) {
    if (error) {
      return callback(error)
    }
    return callback(null, data)
  })
}

module.exports = getListFromDb
