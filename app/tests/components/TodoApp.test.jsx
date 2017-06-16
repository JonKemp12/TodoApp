//Load in libs:
var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

// Load the component
var TodoApp = require('TodoApp');

describe('TodoApp', () => {
  // test to check testing is working:
  it('should exist', () => {
    expect(TodoApp).toExist();
  });
});
