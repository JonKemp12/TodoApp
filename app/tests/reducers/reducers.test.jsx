//Load in libs:
var expect = require('expect');
// Load deep freeze.
// This fails is the reducer pure function updates the objects passed in.
var df = require('deep-freeze-strict');

// Load the reducers:
var reducers = require('reducers');

describe('Reducers tests:', () => {
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

});
