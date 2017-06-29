// Load up Redux
const redux = require('redux');
// Grab the reducers using ES6 destructuring:
var {setSearchTextReducer, toggleShowCompletedReducer, todosReducer} = require('reducers');

//export a function for setting up the store and returning it to caller:
export var configure = () => {
  // Tell redux which reducer to use for name handling:
  // Takes the state variable(s) and function(s) as an object.
  var reducer = redux.combineReducers({
    searchText: setSearchTextReducer,
    showCompleted: toggleShowCompletedReducer,
    todos: todosReducer,
  });

  // In Redux, to create a store, need to pass in a reducer, pure function.
  var store = redux.createStore(reducer, redux.compose(
    // Add the redux devloper tools to the app (if it has been installed, otherwise pass through)
    window.devToolsExtension ? window.devToolsExtension() : (f) => {return f;}
  ));

  return store;
};
