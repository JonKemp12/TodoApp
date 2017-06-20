//Load in libs:
var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

// Load the component
var Todo = require('Todo');

describe('Todo', () => {
  // test to check testing is working:
  it('should exist', () => {
    expect(Todo).toExist();
  });

  it('should call onToggle prop with id on click', () => {
    // test data:
    var todoData = {
      id: 7,
      text: 'Test todo 123',
      completed: false
    };
    // create a spy function:
    var spy = expect.createSpy();
    // Render into a var passing spy:
    var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy}/>);
    // fetch the DOM node for the form in a jQuery selector::
    var $el = $(ReactDOM.findDOMNode(todo));
    // Now simulate a click:
    // use jQuery to search for nested children with the 'form' tag,
    // find the first element ([0])
    TestUtils.Simulate.click($el[0]);
    // Now see if the spy was called with the correct input value:
    expect(spy).toHaveBeenCalledWith(todoData.id);
  });
});
