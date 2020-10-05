require('dotenv').config();
var firebase = require("firebase/app");
//import "firebase/auth";

 function setup (){
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

module.exports = setup; 