const firebase = require('firebase');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgWMFkGF7VXLwXkDb-_5G_cDSnUteFKC4",
    authDomain: "todo-1fb39.firebaseapp.com",
    projectId: "todo-1fb39",
    storageBucket: "todo-1fb39.appspot.com",
    messagingSenderId: "292527274681",
    appId: "1:292527274681:web:1458957bdb8b81e2c17968",
    measurementId: "G-58EC559Z15"
  };
const db = firebase.initializeApp(firebaseConfig);

module.exports = db;
