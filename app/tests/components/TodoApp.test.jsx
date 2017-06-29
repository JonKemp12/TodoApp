//Load in libs:
var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

// Load configureStore and TodoList components with the TodoApp
var configureStore = require('configureStore');
var TodoApp = require('TodoApp');
// var TodoList = require('TodoList');
// Use import instead
import TodoList from 'TodoList'

describe('TodoApp', () => {
  // test to check testing is working:
  it('should exist', () => {
    expect(TodoApp).toExist();
  });

  it('should render TodoList', () => {
    // Create a store, and render the Provider with the app:
    var store = configureStore.configure();
    var provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
          <TodoApp/>
        </Provider>
    );
    // Now find the first TodoApp created in the provider:
    var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
    // Now find the TodoList(s) in the TodoApp - should be only one!
    var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);
    // Assert there is exactly one:
    expect(todoList.length).toEqual(1);
  });
/* No longer since using Redux actions - these are tested elsewhere.
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
  });


  it('should toggle completed value back to false when handleToggle is called', () => {
    // test data:
    var todoData = {
      id: 7,
      text: 'Test todo 123',
      completed: true,
      createdAt: 99,
      completedAt: 199,
    };
    // Render into a var:
    var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
    // Set initialise the state with test data
    todoApp.setState({todos: [todoData]});
    // assert that todo is not completed
    expect(todoApp.state.todos[0].completed).toBe(true);
    // Call handleToggle
    todoApp.handleToggle(todoData.id);
    // assert state has toggled:
    expect(todoApp.state.todos[0].completed).toBe(false);
    // assert that completedAt is a number:
    expect(todoApp.state.todos[0].completedAt).toNotExist();
  });
*/

});
