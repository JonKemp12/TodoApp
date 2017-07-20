// Load up Redux
// const redux = require('redux');
// As redux does not have a default import, can use * to import all the properties:
import * as redux from 'redux';

// Load thunk. Middle-ware to allow action generators to reurn functions.
// These are needed where they call async functions.
import thunk from 'redux-thunk';

// Grab the reducers using ES6 destructuring:
import {authReducer, setSearchTextReducer, toggleShowCompletedReducer, todosReducer} from 'reducers';

//export a function for setting up the store and returning it to caller:
// Takes arg to create initialState (if given)
export var configure = (initialState = {}) => {
  // Tell redux which reducer to use for name handling:
  // Takes the state variable(s) and function(s) as an object.
  var reducer = redux.combineReducers({
    auth: authReducer,
    searchText: setSearchTextReducer,
    showCompleted: toggleShowCompletedReducer,
    todos: todosReducer,
  });

  // In Redux, to create a store, need to pass in a reducer, pure function, initialState and devTools.
  var store = redux.createStore(reducer, initialState, redux.compose(
    // This allows Redux to work with actions as functions instead of objects
    // (apparently)
    // This is needed so that the actions can use the Firebase async functions (which reducers can't)
    redux.applyMiddleware(thunk),
    // Add the redux devloper tools to the app (if it has been installed, otherwise pass through)
    window.devToolsExtension ? window.devToolsExtension() : (f) => {return f;}
  ));

  return store;
};
