//Load in libs:
var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

// Load the component
// var TodoSearch = require('TodoSearch');
// Load the unconnected component
import {TodoSearch} from 'TodoSearch';

describe('TodoSearch', () => {
  // test to check testing is working:
  it('should exist', () => {
    expect(TodoSearch).toExist();
  });

// Use spy to check onSearch is called.
  it('should dispatch SET_SEARCH_TEXT on search input', () => {
    // Test data:
    var searchText = 'Test search 123';
    var testAction = {
      type: 'SET_SEARCH_TEXT',
      searchText
    };

    // create a spy function:
    var spy = expect.createSpy();
    // Now render the form object in a var and inject the spy into it so we can tell if it is called:
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);
    // Simulate the change to the input field by ref:
    todoSearch.refs.searchText.value = searchText;
    TestUtils.Simulate.change(todoSearch.refs.searchText);
    // Check the spy was called with the expects args: default check is false.
    expect(spy).toHaveBeenCalledWith(testAction);
  });

  it('should dispatch TOGGLE_SHOW_COMPLETED on check change', () => {
    // Test data:
    var testAction = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    // create a spy function:
    var spy = expect.createSpy();
    // Now render the form object in a var and inject the spy into it so we can tell if it is called:
    var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy}/>);
    // Simulate the change to the checkbox DOM by ref:
    todoSearch.refs.showCompleted.checked = true;
    TestUtils.Simulate.change(todoSearch.refs.showCompleted);
    // Check the spy was called with the expected args: default text is ''.
    expect(spy).toHaveBeenCalledWith(testAction);
  });
});
