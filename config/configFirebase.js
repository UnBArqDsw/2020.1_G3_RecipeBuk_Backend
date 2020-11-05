require('dotenv').config();
var firebase = require("firebase/app");
var admin = require('firebase-admin');
var serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;

 function setup (){
  var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
  };
  firebase.initializeApp(firebaseConfig);
  admin.initializeApp({
    projectId: process.env.projectId,
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
  });
}

module.exports = setup; 