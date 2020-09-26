const dbConnect = require("./config/dbConfig");

var express = require('express')
var app = express()
var retries = 5;
while (retries) {
  try {
    dbConnect();
  } catch (err) {
    retries--;
    console.log(err);
    console.log("Retries left:" + retries);
  }
}
app.get('/', function (req, res) {
  res.send('Recipe Buk')
})

app.listen(3000, function () {
  console.log('Recipe Buk Backend listening on port 3000!')
})