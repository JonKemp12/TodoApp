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

  // Filter todo list:
  filterTodos: function (todos, showCompleted, searchText) {
    // Get full list
    var filteredTodos = todos;

    // Filter by showCompleted
    // Items from array are returned when the return condition is true.
    // True if (NOT completed or showCompleted is set (=== show anyway)
    // TODO: I would just NOT run this if showCompleted was true??
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });

    // Filter by searchText (if set)
    searchText = searchText.toLowerCase();
    if (searchText.length > 0) {
      filteredTodos = filteredTodos.filter((todo) => {
        //
        var keepMe = todo.text.toLowerCase().indexOf(searchText);
        return (keepMe !== -1);
      });
    }

    // Sort non-completed first
    filteredTodos.sort((a, b) => {
      if (!a.completed && b.completed) {
        // a is not completes so goes before b
        return -1;
      } else if (a.completed && !b.completed) {
        // a is completed so goes after b
        return 1;
      } else {
        // Same so leave unchanged.
        return 0;
      }
    });

    // return the remains:
    return filteredTodos;
  },
};
