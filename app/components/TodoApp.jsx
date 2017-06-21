// TodoApp root container component
var React = require('react');
const uuid = require('node-uuid');

// Require children:
const TodoList = require('TodoList');
const AddTodo = require('AddTodo');
const TodoSearch = require('TodoSearch');
const TodoAPI = require('TodoAPI');

// Create functional component with state:
var TodoApp = React.createClass({
  // Create states:
  getInitialState: function() {
    return {
      // State variables for search filters:
      showCompleted: false,
      searchText: '',
      // Load data from persistent store:
      todos: TodoAPI.getTodos(),
      // // Create some static data for now:
      // todos: [
      //   {
      //     id: uuid(),
      //     text: 'Walk Cookie',
      //     completed: false
      //   }, {
      //     id: uuid(),
      //     text: 'Clean bathrooms',
      //     completed: true
      //   }, {
      //     id: uuid(),
      //     text: 'Make beds',
      //     completed: true
      //   }, {
      //     id: uuid(),
      //     text: 'Cook supper',
      //     completed: false
      //   }
      // ]
    };
  },

  // Handle the search input
  // Simply put the returned values in state variables:
  handleSearch: function(showCompleted, searchText) {
    this.setState({showCompleted: showCompleted, searchText: searchText.toLowerCase()});
  },

  // handler called whenever state or props are changed.
  // Use this to save updated todos
  componentDidUpdate: function () {
    TodoAPI.setTodos(this.state.todos);
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
          text: text,
          completed: false
        }
      ]
    });
  },

  // handler to toggle completed state of a todo
  // take uuid of the todo
  handleToggle: function(id) {
    // alert('handleToggle: '+id);
    // Use map to return the array of todos
    // toggle the completed flag if the id matches.
    // (This seems heavy way to achieve this - might code something
    //  that looks more sensible.)
    var updatedTodos = this.state.todos.map( (todo) => {
      if (todo.id === id) {   // If the ids match
        todo.completed = !todo.completed; // toggle the flag
      }
      return(todo); // Map it back
    });
    this.setState({todos: updatedTodos});
  },


  render: function() {
    // Get the state variables:
    var {todos, showCompleted, searchText} = this.state;
    // Filter the list:
    var filterTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return (
      <div>
        {/* Render the search component passing in handler func */}
        <TodoSearch onSearch={this.handleSearch}/>
        {/*Render the TodoList, passing in the list as a prop*/}
        <TodoList todos={filterTodos} onToggle={this.handleToggle}/>
        {/* Render the input form:*/}
        <AddTodo onSetAddTodo={this.handleAddTodo}/>
      </div>
    );
  }
});

module.exports = TodoApp;
