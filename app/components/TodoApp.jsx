// TodoApp container component
import React from 'react';
import * as Redux from 'react-redux';

// Require children:
// const TodoList = require('TodoList');
// Use import instead
import TodoList from 'TodoList';
// const AddTodo = require('AddTodo');
import AddTodo from 'AddTodo';
// const TodoSearch = require('TodoSearch');
import TodoSearch from 'TodoSearch';
// const TodoAPI = require('TodoAPI');
// import TodoAPI from 'TodoAPI';
import * as actions from 'actions';


// Create functional component with state:
var TodoApp = React.createClass({
  /* Don't need handlers or state as functionality pushed down to componenets
  ** now they can access the Redux store.
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
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined,
        }
      ]
    });
  },

// NOTE: NOT needed as Redux allow Todo to dispatch this directly
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
        // Set completedAt time when completed, else undefined.
        todo.completedAt = todo.completed ? moment().unix() : undefined;
      }
      return(todo); // Map it back
    });
    this.setState({todos: updatedTodos});
  },
*/
  // Logout handler using ES5 shortform:
  onLogout(e) {
    // Redux provides the actions as props.
    var {dispatch} = this.props;
    // Prevent a regresh:
    e.preventDefault();
    // Kick off the login action
    dispatch(actions.startLogout());
  },

  render() {
    // Get the state variables:
    // var {todos, showCompleted, searchText} = this.state;
    // Filter the list:
    // var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

    return (
      <div>
        <div className="page-actions">
          <a href="#"onClick={this.onLogout}>Logout</a>
        </div>

        <h1 className="page-title">Jon's Todo App</h1>
        <div className="row">
          <div className="column small-centered small-11 medium-6 large-5">
            {/*custom class*/}
            <div className="container">
              {/* Render the search component passing in handler func
                <TodoSearch onSearch={this.handleSearch}/> */}
              <TodoSearch/>
              {/* Render the TodoList, passing in the list as a prop
                <TodoList todos={filteredTodos} onToggle={this.handleToggle}/> */}
              {/*With Redux this is simplified*/}
              <TodoList/>
              {/* Render the input form:
                <AddTodo onSetAddTodo={this.handleAddTodo}/>*/}
              <AddTodo/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Redux.connect()(TodoApp);
