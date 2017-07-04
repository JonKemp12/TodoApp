//Load in libs:
var expect = require('expect');
// Get mock store and thunk for testing
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Load the actions:
var actions = require('actions');

// Create a mock store for use in this test:
// Passing in array of middleware - thunk in this case.
var creatMockStore = configureMockStore([thunk]);

describe('Actions tests:', () => {
  // search text
  it('should create a searchText action', () => {
    var testAction = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Test text 123'
    };
    var res = actions.setSearchText('Test text 123');
    expect(res).toEqual(testAction);
  });

  it('should create a TOGGLE_SHOW_COMPLETED action', () => {
    var testAction = {
      type: 'TOGGLE_SHOW_COMPLETED',
    };
    var res = actions.toggleShowCompleted();
    expect(res).toEqual(testAction);
  });

  it('should create an ADD_TODO action', () => {
    var testAction = {
      type: 'ADD_TODO',
      todo: {
        id: 1,
        text: 'Item 1',
        createdAt: 99,
        completed: false,
      }
    };
    var res = actions.addTodo(testAction.todo);
    expect(res).toEqual(testAction);
  });

  it('should create an ADD_TODOS action', () => {
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
      completed: false,
      completedAt: undefined
    }];
    var testAction = {
      type: 'ADD_TODOS',
      todos: todos
    };
    var res = actions.addTodos(todos);
    expect(res).toEqual(testAction);
  });

  // done() is a mocha function called after asyn test completes
  // If it is called with any args it assume a failure with that arg
  it('should create todo and dispatch ADD_TODO', (done) => {
    // Creat an empty mock store
    const store = creatMockStore({});
    const todoText = 'Item 1';

    // dispatch it to our store, 'then' wait until it is complete:
    store.dispatch(actions.startAddTodo(todoText)).then(() => {
      // Success here:
      // Fetch all the actions dispatched to this store.
      const actions = store.getActions();
      // Assert that the first action contains a property type: ADD_TODO
      expect(actions[0]).toInclude({
        type: 'ADD_TODO'
      });
      // Also assert the the first action has a todo with our test text
      expect(actions[0].todo).toInclude({
        text: todoText
      });
      done();   // Mark the test as done without error.
    // On failure, catch the error and call done()
  }).catch(done());
  });

  it('should create a TOGGLE_COMPLETED action', () => {
    var testAction = {
      type: 'TOGGLE_COMPLETED',
      id: 'TestId'
    };
    var res = actions.toggleCompleted('TestId');
    expect(res).toEqual(testAction);
  });
});
