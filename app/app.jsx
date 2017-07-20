// For webpack - import the React libs:
import  React from 'react';
import  ReactDOM from 'react-dom';
// The provider allows to store to be provded to the components children:
import {Provider} from 'react-redux';
// Add the router components:
import  {hashHistory}from 'react-router';
// Pull in Firebase:
import firebase from 'app/firebase/';
// Pull in our router code:
import router from 'app/router/';

// Declare the object from its source:
// var Greeter = require('boilerplate');

// Declare app components here:
// Redux actions
var actions = require('actions');
// Redux store
var store = require('configureStore').configure();


// Run firebase test code:
// import './../playground/firebase/index';

/*** Move init to firebase
// Try some test actions:
// Assign a subscriber to state changes (returns the unsubscribe callback):
var unsubscribe = store.subscribe(() => {
  // get the new state
  var state = store.getState();
  console.log('New state: ', state);
  // Update the localStorage with current list from the state:
  TodoAPI.setTodos(state.todos);
});

// Need to initialise the state todos from localStorage on start up.
// Dispatch an action to bulk load them:
var initialTodos = TodoAPI.getTodos();
store.dispatch(actions.addTodos(initialTodos));
****/

// Add callback for firebase login, logout:
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // If the user is set:
    // mark logged in:
    store.dispatch(actions.login(user.uid));
    // initialise todos from firebase
    store.dispatch(actions.startAddTodos());
    // and move to TodoApp page:
    hashHistory.push('/todos');
  } else {
    // If not set, logged out so clear login info
    store.dispatch(actions.logout());
    // move to login page
    hashHistory.push('/');
  };
});



// store.dispatch(actions.addTodo('Test one todo'));
// store.dispatch(actions.setSearchText('one'));
// store.dispatch(actions.toggleShowCompleted());

// Load foundation by using
// style to inject the css from the foundation.min.css
// Removed as now using scss foundation-sites
// require('style!css!foundation-sites/dist/foundation.min.css');
// And do it by calling the function:
$(document).foundation();

// Load application (sass) CSS (alias to app/styles/app.scss?):
require('style!css!sass!applicationStyles');



// render a DOM component, passing the DOM and rhe element
// which is this app.

ReactDOM.render(
  // Render the provider component - now all children will be able to access the store.
  // IndexRoute brings up the Login by default #/todos will switch to TodoApp
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
