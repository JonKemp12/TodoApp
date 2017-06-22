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
    // Assert that createdAt is number:
    expect(todoApp.state.todos[0].createdAt).toBeA('number');
  });

  it('should toggle completed value when handleToggle is called', () => {
    // test data:
    var todoData = {
      id: 7,
      text: 'Test todo 123',
      completed: false,
      createdAt: 99,
      completedAt: undefined,
    };
    // Render into a var:
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    // Set initialise the state with test data
    todoApp.setState({todos: [todoData]});
    // assert that todo is not completed
    expect(todoApp.state.todos[0].completed).toBe(false);
    // Call handleToggle
    todoApp.handleToggle(todoData.id);
    // assert state has toggled:
    expect(todoApp.state.todos[0].completed).toBe(true);
    // assert that completedAt is a number:
    expect(todoApp.state.todos[0].completedAt).toBeA('number');
    // Toggle again:
    todoApp.handleToggle(todoData.id);
    // Assert that created in now cleared to undefined:
    expect(todoApp.state.todos[0].completedAt).toNotBeA('object');

  });
});
