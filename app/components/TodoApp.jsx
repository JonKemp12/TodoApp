// TodoApp root container component
var React = require('react');

// Require children:
const TodoList = require('TodoList');
const AddTodo = require('AddTodo');

// Create functional component with state:
var TodoApp = React.createClass({
  // Create states:
  getInitialState: function () {
    return {
      // Create some static data for now:
      todos: [
        {
          id: 1,
          text: 'Walk Cookie'
        }, {
          id: 2,
          text: 'Clean bathrooms'
        }, {
          id: 3,
          text: 'Make beds'
        }, {
          id: 4,
          text: 'Cook supper'
        }
      ]
    };
  },

// handler function passed as prop to children to receive an input from form.
  handleAddTodo: function (text) {
    alert('handleAddTodo: ' + text);
  },

  render: function () {
    // Get the list of todos:
    var {todos} = this.state;

    return (
      <div>
        {/*Render the TodoList, passing in the list as a prop*/}
        <TodoList todos={todos}/>
        {/* Render the input form:*/}
        <AddTodo onSetAddTodo={this.handleAddTodo}/>
      </div>
    );
  },
});

module.exports = TodoApp;
