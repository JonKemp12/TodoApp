//Load in libs:
var expect = require('expect');

// Load the component
var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
  // test to check testing is working:
  it('should exist', () => {
    expect(TodoAPI).toExist();
  });

  describe('TodoAPI', () => {

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

  describe('TodoAPI', () => {    
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
});
