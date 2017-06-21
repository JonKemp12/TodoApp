// define APIs to abstract gettings and setting persistent Todo data
// using various methods.

// need jQuery:
const $ = require('jquery');

module.exports = {
  // Func to store the todos array
  setTodos: function (todos) {
    // Check we have been passed an array:
    if ($.isArray(todos)) {
      // Store array as a string under kry 'todos':
      localStorage.setItem('todos', JSON.stringify(todos));
      // Return a vaid object to show success.
      return todos;
    }
  },
  // Func to retrieve the todos array
  getTodos: function () {
    // Fetch the persistent data
    var stringTodos = localStorage.getItem('todos');
    var todos = [];

    try {
      todos = JSON.parse(stringTodos);
    } catch (e) {
      // Just leave empty array
    } finally {
      // placeholder
    }
    // Check we have an array, otherwise return empty
    // if ($.isArray(todos)) {
    //   return todos;
    // } else {
    //   return [];
    // };
    //
    return $.isArray(todos) ? todos : [];
  },
};
