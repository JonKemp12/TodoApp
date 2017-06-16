//Load in libs:
var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

// Load the components
var TodoList = require('TodoApp');
const Todo = require('Todo');

describe('TodoList', () => {
  // test to check testing is working:
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('shouldrender one Todo for each todo item', () => {
    // Make some test data
    var todos = [{
      id: 1,
      text: 'Item 1'
    }, {
      id: 2,
      text: 'Item 2'
    }];
    // Render into TodoList
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    // Find how many we have:
    // This call returns an array of components from the container that have the type.
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);
    expect(todosComponents.length).toBe(todos.length);
  });

  it('should render one Todo component for each todo item', () => {
    var todos = [{
      id: 1,
      text: 'Do something'
    }, {
      id: 2,
      text: 'Check mail'
    }];
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

    expect(todosComponents.length).toBe(todos.length);
  });
});
