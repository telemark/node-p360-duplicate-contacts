'use strict'

var sql = require('mssql')
var config = require('../config')

function runQuery (query, callback) {
  if (!query) {
    return callback(new Error('Missing required input: query'), null)
  }
  var connection = new sql.Connection(config.p360, function (err) {
    if (err) {
      console.log(query)
      console.log(err)
      return callback(err)
    }
    var request = new sql.Request(connection)
    request.query(query, function (err, recordset) {
      if (err) {
        console.log(query)
        console.log(err)
        return callback(err, null)
      } else {
        return callback(null, recordset)
      }
    })
  })
}

module.exports = runQuery
