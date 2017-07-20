//Load in libs:
var expect = require('expect');
// Get mock store and thunk for testing
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import our firebase config
import firebase, {firebaseRef} from 'app/firebase/';

// Load the actions:
var actions = require('actions');

// Create a mock store for use in this test:
// Passing in array of middleware - thunk in this case.
var creatMockStore = configureMockStore([thunk]);

describe('Actions tests:', () => {
  // Login:
  it('should create LOGIN action', () => {
    var testAction = {
      type: 'LOGIN',
      uid: 'testUID'
    };
    var res = actions.login('testUID');
    expect(res).toEqual(testAction);
  });
  // Logout:
  it('should create LOGOUT action', () => {
    var testAction = {
      type: 'LOGOUT',
    };
    var res = actions.logout();
    expect(res).toEqual(testAction);
  });

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

  it('should create a UPDATE_TODO action', () => {
    var testAction = {
      type: 'UPDATE_TODO',
      id: 'TestID',
      updates: {completed: false}
    };
    var res = actions.updateTodo(testAction.id, testAction.updates);
    expect(res).toEqual(testAction);
  });

/*
  it('should create a TOGGLE_COMPLETED action', () => {
    var testAction = {
      type: 'TOGGLE_COMPLETED',
      id: 'TestId'
    };
    var res = actions.toggleCompleted('TestId');
    expect(res).toEqual(testAction);
  });
*/

  // Unit tests for firebase access:
  describe('Firebase tests:', () => {
    // Cretae a FB ref:
    var testTodoRef;
    var testTodo = {
        text: 'Test Todo 123',
        completed: false,
        createdAt: 99,
    };
    var uid;  // Anonymous test user ID
    var testTodosRef; // Ref to the test todos data.

    // Use mocha beforeEach to declare a function to run before each test:
    beforeEach((done) => {
      // Sign in anonymously:
      firebase.auth().signInAnonymously().then((user) => {
        uid = user.uid;
        testTodosRef = firebaseRef.child(`users/${uid}/todos`);
        // Clear the list, return chains the promise on:
        return testTodosRef.remove();
      }).then(() => {
        // Add a todo:
        testTodoRef = testTodosRef.push();
        // Set the test data and return:
        return testTodoRef.set(testTodo);
      })
      // After set, call done() to finish
      .then(() => done())
      // Catch error and pass them into done.
      .catch(done);
    });

    // Use afterEach to declare func to run after each test completes.
    afterEach((done) => {
      // remove the test item:
      testTodosRef.remove().then(() => done());  // Short form for simple success.
    });

    // Tests:
    it('should dispatch UPDATE_TODO action and toggle completed flag', (done) => {
      // Create a mock store with the auth object
      const store = creatMockStore({auth:{uid}});
      const action = actions.startAddTodo(testTodoRef.key, !testTodo.completed);

      store.dispatch(action).then(() => {
        // Retrieve actions on out store:
        const mockActions = store.getActions();
        // Assert first action is UPDATE_TODO on the key
        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key,
        });
        // Expect updates to have correct completedAt
        expect(mockActions[0].updates).toInclude({
          completed: !testTodo.completed
        });
        // Assert that completedAt is now set
        expect(mockActions[0].updates.completedAt).toExist();
        // Mark finished
        done();
      }, done());
    });

    it('should dispatch ADD_TODOS action, create single to with correct test data:', (done) => {
      // Create a mock store with the auth object
      const store = creatMockStore({auth:{uid}});
      // The action to call:
      const action = actions.startAddTodos();

      store.dispatch(action).then(() => {
        // Retrieve actions on our store:
        const mockActions = store.getActions();
        // Assert first action is UPDATE_TODO on the key
        expect(mockActions[0].type).toEqual('ADD_TODOS');
        // Expect action to have loaded 1 todo.
        expect(mockActions[0].todos.length).toEqual(1);
        // Assert that completedAt is now set
        expect(mockActions[0].todos[0].text).toEqual(testTodo.text);
        // Mark finished
        done();
      }, done());
    });

    // done() is a mocha function called after asyn test completes
    // If it is called with any args it assume a failure with that arg
    it('should create todo and dispatch ADD_TODO', (done) => {
      // Create a mock store with the auth object
      const store = creatMockStore({auth:{uid}});
      const todoText = 'Item 1';

      // dispatch it to our store, 'then' wait until it is complete:
      store.dispatch(actions.startAddTodo(todoText)).then((res) => {
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
      /*
      , (err) => {
        // On failure, catch the error and call done()
        // Apparently you can do this with a .then().catch(done())
        done(err);
      });
      */
    });

  });
});
