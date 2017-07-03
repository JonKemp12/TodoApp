// This file contains all the action generators for the Todo application.

// Set the search text:
export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

// Toggle the showCompleted flag: (needs no args)
export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

// Add a Todo item:
export var addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    text
  };
};

// Add a Todos array:
export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};


// Toggle completed on a todo by id
export var toggleCompleted = (id) => {
  return {
    type: 'TOGGLE_COMPLETED',
    id
  };
};
