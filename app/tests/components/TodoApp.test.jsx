//Load in libs:
var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

// Load the component
var TodoApp = require('TodoApp');

describe('TodoApp', () => {
  // test to check testing is working:
  it('should exist', () => {
    expect(TodoApp).toExist();
  });

  it('should add todo to todos state on handleAddTodo', () => {
    var todoText = 'test text 123';
    // Render an instance:
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    // Reset the state:
    todoApp.setState({todos: []});
    // Add a test one:
    todoApp.handleAddTodo(todoText);
    // Asser that it is the first:
    expect(todoApp.state.todos.length).toBe(1);
    expect(todoApp.state.todos[0].text).toBe(todoText);
  });
});
