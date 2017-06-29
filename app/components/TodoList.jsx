// TodoList container component
var React = require('react');

// Load Redux-React connect functional
var {connect} = require('react-redux');

// Require Todo
// const Todo = require('Todo');
import Todo from 'Todo';

// Create functional component with state:
// Export the raw object for testing
export var TodoList = React.createClass({
  render: function () {
    // Get the list prop:
    var {todos} = this.props;
    // Function to render the list:
    var renderTodos = () => {
      // If list is empty, return a message instead:
      if (todos.length === 0) {
        return (
          <p className="container__message">Nothing left To Do</p>
        );
      }
      return todos.map((todo) => {
        // .map calls a function for every element in the array
        // And returns an array.
        // React needs unique key for each item so pull out the id value
        // Use the ... spread operator to pull out all the properties of an object.
        // Pass down the onToggle handler from parent to Todo components.
        return (
          // Don't need to pass onToggle handler with redux store
          //    <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/> */}
          <Todo key={todo.id} {...todo}/>
        );
      });
    };

    return (
      <div>
        {/* Call function to render the list */}
        {renderTodos()}
      </div>
    );
  },
});

// module.exports = TodoList;
// REDUX: now use connect() to connect require state objects to this components properties
// Export the default to be picked up by require().
export default connect (
  // Takes a function, passing in state and returns the reqired state variables
  // and makes them available as properties to this component
  (state) => {
    return {
      todos: state.todos
    }
  }
)(TodoList);
