// For webpack - import the React libs:
import React from 'react';
// Add the router components:
import {Route, Router, IndexRoute, hashHistory} from 'react-router';
// Pull in Firebase:
import firebase from 'app/firebase/';

// Declare app components here:
import Login from 'Login';
// var TodoApp = require('TodoApp');
import TodoApp from 'TodoApp';

// Add middleware functions that are used by the routes to control
// which pages are available dependant on status - eg: logged in
// Added to 'onEnter prop.'
// Args are nextState, replace - a function to switch pages and next - what to do after asyn completes.
var requireLogin = (nextState, replace, next) => {
  // If not logged in
  if (!firebase.auth().currentUser) {
    // Replace is like push():
    replace('/'); // Go to login page.
  }
  next();
};

var loginDone = (nextState, replace, next) => {
  // If logged in
  if (firebase.auth().currentUser) {
    // Replace is like push():
    replace('/todos'); // Go straight to app
  }
  next();
};

// Export the router JSX code as default:
export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={loginDone}/>
    </Route>
  </Router>
);
