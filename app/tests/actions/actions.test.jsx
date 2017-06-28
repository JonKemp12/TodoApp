//Load in libs:
var expect = require('expect');
// Load the actions:
var actions = require('actions');

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

  it('should create a ADD_TODO action', () => {
    var testAction = {
      type: 'ADD_TODO',
      todoText: 'Test text 123'
    };
    var res = actions.addTodo('Test text 123');
    expect(res).toEqual(testAction);
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
