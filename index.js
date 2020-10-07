const bodyParser = require('body-parser')
const configRoutes = require('./src/routes/Router');
const firebaseConfig = require('./config/configFirebase');
var express = require('express')
var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/routes/Router')(app);
configRoutes(app)
firebaseConfig()

app.listen(3000)
