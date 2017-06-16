//Load in libs:
var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

// Load the component
var Todo = require('TodoApp');

describe('Todo', () => {
  // test to check testing is working:
  it('should exist', () => {
    expect(Todo).toExist();
  });
});
