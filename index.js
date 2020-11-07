const bodyParser = require('body-parser')
const configRoutes = require('./src/controller/Router');
const firebaseConfig = require('./config/configFirebase');
const express = require('express');
const cors = require('cors');

var app = express()
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./src/controller/Router')(app);
configRoutes(app)
firebaseConfig()

app.listen(3000)
