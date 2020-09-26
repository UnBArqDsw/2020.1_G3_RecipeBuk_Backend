const dbConnect = require("./config/dbConfig");

var express = require('express')
var app = express()

dbConnect();

app.get('/', function (req, res) {
  res.send('Recipe Buk')
})

app.listen(3000, function () {
  console.log('Recipe Buk Backend listening on port 3000!')
})