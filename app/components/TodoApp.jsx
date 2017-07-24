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


// Refaactor as ES6 Class:
export class TodoApp extends React.Component {
  // Override the constructor:
  constructor (props) {
    // Call parent constructor:
    super(props);
    // Bind the async functions:
    this.onLogout = this.onLogout.bind(this);
  };

  // Logout handler using ES5 shortform:
  onLogout(e) {
    // Redux provides the actions as props.
    var {dispatch} = this.props;
    // Prevent a regresh:
    e.preventDefault();
    // Kick off the login action
    dispatch(actions.startLogout());
  };


  render() {
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
};

export default Redux.connect()(TodoApp);
