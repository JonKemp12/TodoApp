// Required libs:
const uuid = require('node-uuid');
const moment = require('moment');

// Returns searchText value
export var setSearchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
      break;
    default:
      return state;
  };
};

// Returns the toggled showCompleted flag
export var toggleShowCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
      break;
    default:
      return state;
  };
};

// Handles todos updates:
export var todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: uuid(),
          text: action.text,
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined,
        }
      ];
      break;
    case 'TOGGLE_TODO':
      // map through todos, toggle completed and updated
      // Use map to return the array of todos
      // toggle the completed flag if the id matches.
      // (This seems heavy way to achieve this - might code something
      //  that looks more sensible.)
      var updatedTodos = state.map( (todo) => {
        if (todo.id === action.id) {   // If the ids match
          /*
          todo.completed = !todo.completed; // toggle the flag
          // Set completedAt time when completed, else undefined.
          todo.completedAt = todo.completed ? moment().unix() : undefined;
          */
          var newCompleted = !todo.completed; // Toggle completed flag
          // For pure func, need to return a new todo object using spread:
          //console.log('todo: ', todo, todo.completed);
          return {
            ...todo,
            completed: newCompleted,
            completedAt: (newCompleted ? moment().unix() : undefined)
          };
        }
        return(todo); // Map it back
      });
      //console.log('updatedTodos: ', updatedTodos);
      return updatedTodos;
      break;
    default:
      return state;
  };
};
