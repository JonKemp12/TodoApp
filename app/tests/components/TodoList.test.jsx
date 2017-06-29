//Load in libs:
var React = require('react');
var ReactDOM = require('react-dom');
// Load the provider
var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

// Load the components
import {configure} from 'configureStore';
// var TodoList = require('TodoList');
// Using ES6 import to load both versions: connected and raw.
import ConnectedTodoList, {TodoList} from 'TodoList';
// const Todo = require('Todo');
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
  // test to check testing is working:
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('shouldrender one Todo for each todo item', () => {
    // Make some test data
    var todos = [{
      id: 1,
      text: 'Item 1',
      createdAt: 99,
      completed: false,
      completedAt: undefined
    }, {
      id: 2,
      text: 'Item 2',
      createdAt: 99,
      completed: true,
      completedAt: 199
    }];
    // Create a store with initial state:
    var store = configure({todos});
    // Render the provider with store and our connected component:
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList/>
      </Provider>
    );

    // Render into TodoList
    // var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    // Find the first ConnectedTodoList in the provider
    var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
    // Find how many we have:
    // This call returns an array of components from the container that have the type.
    var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

    // todos.forEach(function(item){
    //   console.log('todos:', item.id, item.text);
    // });
    // todosComponents.forEach(function(item){
    //   console.log('todosComponents:', item.props.id, item.props.text);
    // });
    expect(todosComponents.length).toBe(todos.length);
  });

  it('should render empty message if no todos', () => {
    // Make some empty test data
    var todos = [];
    // Render into TodoList
    var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
    // find the DOM node
    var $el = $(ReactDOM.findDOMNode(todoList));
    // Check there is 1 message there:
    expect($el.find('.container__message').length).toBe(1);
  });
});
