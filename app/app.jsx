// For webpack - import the React libs:
var React = require('react');
var ReactDOM = require('react-dom');
// The provider allows to store to be provded to the components children:
var {Provider} = require('react-redux');
// Add the router components:
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

// Declare the object from its source:
// var Greeter = require('boilerplate');

// Declare app components here:
import Login from 'Login';

// var TodoApp = require('TodoApp');
import TodoApp from 'TodoApp';
// Redux actions
var actions = require('actions');
// Redux store
var store = require('configureStore').configure();
// import the API code:
import TodoAPI from 'app/api/TodoAPI.jsx';

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

// initialise todos from firebase
store.dispatch(actions.startAddTodos());



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
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="todos" component={TodoApp}/>
        <IndexRoute component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
