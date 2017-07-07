//Load in libs:
var expect = require('expect');

// Load the component
var TodoAPI = require('TodoAPI');

describe('TodoAPI:', () => {
  // test to check testing is working:
  it('should exist', () => {
    expect(TodoAPI).toExist();
  });
/***** localStorage replaced by Firebase
  describe('TodoAPI setTodos:', () => {

    // Itialise local store before running each describe test:
    beforeEach(() => {
      localStorage.removeItem('todos');
    });

    it('should save a valid todos array', () => {
      var todos = [{
        id: 7,
        text: 'Test todo 123',
        completed: false
      }];
      // Store it:
      TodoAPI.setTodos(todos);
      // Fetch back and...
      var actualTodos = JSON.parse(localStorage.getItem('todos'));
      // assert they are the same
      expect(actualTodos).toEqual(todos);
    });

    it('should NOT save a non-valid todos array', () => {
      var badTodos = {a: 'b'};
      // Store it:
      TodoAPI.setTodos(badTodos);
      // Fetch back and...
      var actualTodos = localStorage.getItem('todos');
      // assert they are null (=== not set)
      expect(actualTodos).toBe(null);
    });
  });

  describe('TodoAPI, getTodos:', () => {
        it('should return empty todos array on bad data', () => {
          // fetch current value
          var actualTodos = TodoAPI.getTodos();
          // assert it returns an empty array:
          expect(actualTodos).toEqual([]);
        });

    it('should fetch a valid todos array', () => {
      var todos = [{
        id: 7,
        text: 'Test todo 123',
        completed: false
      }];
      // Store it directly:
      localStorage.setItem('todos', JSON.stringify(todos));
      // Get it back and...
      var actualTodos = TodoAPI.getTodos();
      // assert they are equal:
      expect(actualTodos).toEqual(todos);
    });
  });
*****/

  describe('filterTodos', () => {
    // Test data:
    var todos = [{
        id: 1,
        text: 'Test todo 123 KeepMe true',
        completed: true
      }, {
        id: 2,
        text: 'Test todo 123 false',
        completed: false
      }, {
        id: 3,
        text: 'Test todo 123 keepme true',
        completed: true
      },
    ];
    var numAllTodos = todos.length;
    // Count of completed false
    var numNotCompleted = 1;
    // Count of text contains keepme (case insensitive)
    var numKeepMe = 2;

    it('should return all todos when showCompleted is true', () => {
      var filterTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filterTodos.length).toBe(numAllTodos);
    });

    it('should return numNotCompleted todos when showCompleted is false', () => {
      var filterTodos = TodoAPI.filterTodos(todos, false, '');
      expect(filterTodos.length).toBe(numNotCompleted);
    });

    it('should sort by completed status', () => {
      // Make sure 1st element in test data is true and changes!
      todos[0].completed = true;
      var filterTodos = TodoAPI.filterTodos(todos, true, '');
      // First item in sorted array should be false
      expect(filterTodos[0].completed).toBe(false);
    });

    it('should return numKeepMe todos when searchText is KeepMe', () => {
      var filterTodos = TodoAPI.filterTodos(todos, true, 'KeepMe');
      expect(filterTodos.length).toBe(numKeepMe);
    });

    it('should return all todos when searchText is empty', () => {
      var filterTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filterTodos.length).toBe(numAllTodos);
    });

  });
});
