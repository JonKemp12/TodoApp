// import the firebase config index.js:
import firebase, {firebaseRef, githubProvider} from 'app/firebase/'
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

// Challenge to fetch todos from Firebase and convert to an array.
// To use Firebase, need to NOT return an object, but return a function
// which makes the async call to firebase.
// We fetch the data from Firebase, "then" when that is finished we dispatch the action
// to the store to add the array addTodos().
export var startAddTodos = () => {
  // Returns a function which take 2 args:
  // dispatch: the function that will be called after the data is saved
  // getState: the function to call to get the state of a store
  return (dispatch, getState) => {
    // Get ref to todos snapshot
    var todosRef = firebaseRef.child('todos').once('value');
    // return the promise
    return todosRef.then((snapshot) => {
      // console.log('Got child key: ', snapshot.key, snapshot.val());
      // Think this will turn DB key:object pairs into an array
      // var todos = Object.keys(snapshot.val());
      // Not sure why to use keys, can simply forEach over the items:
      var todos = [];
      snapshot.forEach(item => {
        todos.push({
          id: item.key,
          ...item.val()
        });
      });
      // console.log('todos[]:', todos);
      // Dispatch to the store:
      dispatch(addTodos(todos));
    }, (err) => {
      console.log('once(value) failed:', err);
    });
  };
};


/*
// Toggle completed on a todo by id
export var toggleCompleted = (id) => {
  return {
    type: 'TOGGLE_COMPLETED',
    id
  };
};
*/

// Apply updated props to a Todo:
export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

// Toggle completed flag on a Firebase todo.
// For this, we will pass in the id and the value (so not exactly toggle!?)
export var startToggleCompleted = (id, completed) => {
  // Return the function to make the asyn calls
  return (dispatch, getState) => {
    var todoRef = firebaseRef.child(`todos/${id}`); // ('todos/'+id)
    // properties to be updated:
    var updates = {
      completed,
      // Set or clear completedAt dependant on completed flag.
      completedAt: completed ? moment().unix() : null
    };
    // Return the result for testing
    return todoRef.update(updates).then(() => {
      // On success, call sync dispatch generically updating
      dispatch(updateTodo(id, updates));
    })
  };
};

// Login async action:
export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then(
      (res) => {
        console.log('Auth worked:', res);
      }, (err) => {
        console.log('Auth failed:', err);
      });
  };
};

// Logout async action:
export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      console.log('Logged out OK.');
    });
  };
};
