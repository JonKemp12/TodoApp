import firebase from 'firebase';

// Use a try to Initialize the firebase once.
try {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBgrzRv-iF9B2J74oH5EyhJ77VMTrIekFY",
    authDomain: "jons-todo-app.firebaseapp.com",
    databaseURL: "https://jons-todo-app.firebaseio.com",
    projectId: "jons-todo-app",
    storageBucket: "jons-todo-app.appspot.com",
    messagingSenderId: "697045583773"
  };
  firebase.initializeApp(config);
} catch (e) {

};

export var firebaseRef = firebase.database().ref();
// this means any that import this file also get firebase too.
export default firebase;
