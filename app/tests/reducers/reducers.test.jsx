//Load in libs:
var expect = require('expect');
// Load deep freeze.
// This fails is the reducer pure function updates the objects passed in.
var df = require('deep-freeze-strict');

// Load the reducers:
var reducers = require('reducers');

describe('Reducers tests:', () => {
  describe('authReducer:', () => {
    it('should add UID on login', () => {
      var testAction = {
        type: 'LOGIN',
        uid: 'testUID'
      };
      // Freeze the arg objects using df
      var res = reducers.authReducer(df({}), df(testAction));
      expect(res.uid).toEqual(testAction.uid);
    });

    it('should clear UID on logout', () => {
      var testAction = {
        type: 'LOGOUT',
      };
      var testAuth = {
        uid: 'testUID'
      };
      // Freeze the arg objects using df
      var res = reducers.authReducer(df(testAuth), df(testAction));
      expect(res).toEqual({});
    });
  });

  describe('searchTextReducer:', () => {
    it('should set searchText', () => {
      var testAction = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'Test text 123'
      };
      // Freeze the arg objects using df
      var res = reducers.setSearchTextReducer(df(''), df(testAction));
      expect(res).toEqual(testAction.searchText);
    });
  });

  describe('toggleShowCompletedReducer:', () => {
    it('should toggle showCompleted', () => {
      var testAction = {
        type: 'TOGGLE_SHOW_COMPLETED',
      };
      var res = reducers.toggleShowCompletedReducer(df(false), df(testAction));
      expect(res).toEqual(true);
    });
  });

  describe('todosReducer:', () => {
    it('should add a new todo', () => {
      var testAction = {
        type: 'ADD_TODO',
        todo: {
          id: 1,
          text: 'Item 1',
          createdAt: 99,
          completed: false,
        }
      };
      // Freeze the arg objects using df
      var res = reducers.todosReducer(df([]), df(testAction));
      // Should return a single element array
      expect(res.length).toEqual(1);
      // with the test text
      // expect(res[0].todoText).toEqual(testAction.todoText);
      // Assert the todo is returned as first element of returned array:
      expect(res[0]).toEqual(testAction.todo);
    });

    it('should add a new todos array', () => {
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
      // Freeze the arg objects using df
      var res = reducers.todosReducer(df([]), df(testAction));
      // with the test text
      expect(res).toEqual(todos);
    });

    // Set up test array, run UPDATE_TODO and check return.
    it('should update Todo on UPDATE_TODO action', () => {
      var testTodos = [{
        id: '7',
        text: 'Test todo 123',
        completed: true,
        createdAt: 99,
        completedAt: 199,
      }];
      var updates = {
        completed: false,
        completedAt: null
      };
      var testAction = {
        type: 'UPDATE_TODO',
        id: testTodos[0].id,
        updates
      };

      // Call the reducer with test todos array and action
      var res = reducers.todosReducer(df(testTodos), df(testAction));
      // assert state has been updated:
      expect(res[0].completed).toBe(updates.completed);
      // assert that completedAt is correctly updated:
      expect(res[0].completedAt).toEqual(updates.completedAt);
      // Assert the text remains the same
      expect(res[0].text).toEqual(testTodos[0].text);
    });
/*
    // Set up test array, run TOGGLE_TODO and check return.
    it('should toggle completed value on TOGGLE_COMPLETED', () => {
      var testAction = {
        type: 'TOGGLE_COMPLETED',
        id: '7'
      };
      var testTodos = [{
        id: '7',
        text: 'Test todo 123',
        completed: false,
        createdAt: 99,
        completedAt: undefined,
      }];
      // Call the reducer with test todos array and action
      var res = reducers.todosReducer(df(testTodos), df(testAction));
      // assert state has toggled:
      expect(res[0].completed).toBe(true);
      // assert that completedAt is a number:
      expect(res[0].completedAt).toBeA('number');
    });
/*
    it('should toggle completed back on TOGGLE_COMPLETED', () => {
      var testAction = {
        type: 'TOGGLE_COMPLETED',
        id: '7'
      };
      var testTodos = [{
        id: '7',
        text: 'Test todo 123',
        completed: true,
        createdAt: 99,
        completedAt: 199,
      }];
      // Call the reducer with test todos array and action
      var res = reducers.todosReducer(df(testTodos), df(testAction));
      // assert state has toggled:
      expect(res[0].completed).toBe(false);
      // assert that completedAt is a number:
      expect(res[0].completedAt).toNotExist();
    });
*/
  });
});
