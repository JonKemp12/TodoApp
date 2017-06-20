// TodoApp root container component
var React = require('react');
const uuid = require('node-uuid');

// Require children:
const TodoList = require('TodoList');
const AddTodo = require('AddTodo');
const TodoSearch = require('TodoSearch');

// Create functional component with state:
var TodoApp = React.createClass({
  // Create states:
  getInitialState: function() {
    return {
      // State variables for search filters:
      showCompleted: false,
      searchText: '',
      // Create some static data for now:
      todos: [
        {
          id: uuid(),
          text: 'Walk Cookie'
        }, {
          id: uuid(),
          text: 'Clean bathrooms'
        }, {
          id: uuid(),
          text: 'Make beds'
        }, {
          id: uuid(),
          text: 'Cook supper'
        }
      ]
    };
  },

  // Handle the search input
  // Simply put the returned values in state variables:
  handleSearch: function(showCompleted, searchText) {
    this.setState({showCompleted: showCompleted, searchText: searchText.toLowerCase()});
  },

  // handler function passed as prop to children to receive an input from form.
  handleAddTodo: function(text) {
    //alert('handleAddTodo: ' + text);
    // Update the state, append a new todo.
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuid(),
          text: text
        }
      ]
    });
  },

  render: function() {
    // Get the list of todos:
    var {todos} = this.state;

    return (
      <div>
        {/* Render the search component passing in handler func */}
        <TodoSearch onSearch={this.handleSearch}/> {/*Render the TodoList, passing in the list as a prop*/}
        <TodoList todos={todos}/> {/* Render the input form:*/}
        <AddTodo onSetAddTodo={this.handleAddTodo}/>
      </div>
    );
  }
});

module.exports = TodoApp;
