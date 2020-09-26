const db = require("./db/dbConfig");

var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Recipe Buk')
})

app.listen(3000, function () {
  console.log('Recipe Buk Backend listening on port 3000!')
})
