// TodoList container component
var React = require('react');

// Require Todo
const Todo = require('Todo');

// Create functional component with state:
var TodoList = React.createClass({
  render: function () {
    // Get the list prop:
    var {todos} = this.props;
    // Function to render the list:
    var renderTodos = () => {
      return todos.map((todo) => {
        // .map calls a function for every element in the array
        // And returns an array.
        // React needs unique key for each item so pull out the id value
        // Use the ... spread operator to pull out all the properties of an object.
        return (
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

module.exports = TodoList;
