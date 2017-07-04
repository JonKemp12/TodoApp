var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

// Load all the actions:
import * as actions from 'actions';
// Load the component
var {AddTodo} = require('AddTodo');

describe('AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });

  it('should dispatch ADD_TODO if valid todo text value', () => {
    // Test data:
    var todoText = 'Test todo 123';
    // var testAction = {
    //   type: 'ADD_TODO',
    //   text: todoText
    // }
    var testAction = actions.startAddTodo(todoText);
    // create a spy function:
    var spy = expect.createSpy();
    // Now render the form object in a var and inject the spy into it so we can tell if it is called:
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    // fetch the DOM node for the form in a jQuery selector::
    var $el = $(ReactDOM.findDOMNode(addTodo));
    // Now set the input field value:
    addTodo.refs.todoText.value = todoText;
    // Now simulate the submit button:
    // use jQuery to search for nested children with the 'form' tag,
    // find the first element ([0])
    TestUtils.Simulate.submit($el.find('form')[0]);

    // Now see if the spy was called with the correct input value:
    expect(spy).toHaveBeenCalledWith(testAction);
  });

  it('should NOT dispatch ADD_TODO on invalid todo text value', () => {
    // Test data:
    var todoText = '';
    var testAction = {
      type: 'ADD_TODO',
      text: todoText
    }
    // create a spy function:
    var spy = expect.createSpy();
    // Now render the form object in a var and inject the spy into it so we can tell if it is called:
    var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    // fetch the DOM node for the form in a jQuery selector::
    var $el = $(ReactDOM.findDOMNode(addTodo));
    // Now set the input field value:
    addTodo.refs.todoText.value = todoText;
    // Now simulate the submit button:
    // use jQuery to search for nested children with the 'form' tag,
    // find the first element ([0])
    TestUtils.Simulate.submit($el.find('form')[0]);

    // Now see if the spy was called with the correct input value:
    expect(spy).toNotHaveBeenCalled();
  });
});
