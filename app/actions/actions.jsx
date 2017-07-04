// import the firebase config index.js:
import {firebase, firebaseRef} from 'app/firebase/'
// Need moment for times:
import moment from 'moment';

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

// // Add a Todo item:
// export var addTodo = (text) => {
//   return {
//     type: 'ADD_TODO',
//     text
//   };
// };
// Firebase: Instead, return the actual created todo:
export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

// To use Firebase, need to NOT return an object, but return a function
// which makes the async call to firebase.
// This one will start adding the new Todo item
// We push the data to firebase, "then" when that is finished we dispatch the action
// to the store to update the state.
export var startAddTodo = (text) => {
  // Returns a function which take 2 args:
  // dispatch: the function that will be called after the data is saved
  // getState: the function to call to get the state of a store
  return (dispatch, getState) => {
    var todo = {
        text,
        completed: false,
        createdAt: moment().unix(),
        completedAt: null,
    };
    // Create a ref for the todo item and push it on todos table:
    var todoRef = firebaseRef.child('todos').push(todo);
    // Now also add it to the Redux store via dispatch
    // Return the promise??
    return todoRef.then(() => {
      // dispatch the whole object, plus the firebase key
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
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
