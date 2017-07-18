import firebase from 'firebase';

// Use a try to Initialize the firebase once.
try {
  // Initialize Firebase using environment vars from files
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
  };
  // debugger;
  firebase.initializeApp(config);
} catch (e) {

};

// Export the authentication provider:
export var githubProvider = new firebase.auth.GithubAuthProvider();
// The Firebase database reference
export var firebaseRef = firebase.database().ref();
// this means any that import this file also get firebase too.
export default firebase;
