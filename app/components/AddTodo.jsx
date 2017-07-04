// For webpack - import the React libs:
var React = require('react');
// Load Redux-React connect functional
var {connect} = require('react-redux');
// Redux actions
var actions = require('actions');

// Create a sub-component for our form:
// User interaction component
// Takes parent handler function as prop
export var AddTodo = React.createClass({
  // Submit func:
  onFormSubmit: function (e) {
    // Prevents to default page handler which would reload
    e.preventDefault();
    // Get the dispatch function from the props
    var {dispatch} = this.props;

    var todoText = this.refs.todoText.value;

    // Clear form and add to updates var
    // Check it's not empty
    if (todoText.length > 0){
      this.refs.todoText.value = '';
      // Call the parent function;
      // this.props.onSetAddTodo(todoText);
      // Using dispatch in Redux instead
      // dispatch(actions.addTodo(todoText));
      // For firebase, use startAddTodo
      dispatch(actions.startAddTodo(todoText));
    } else {
      // Re-focus back to imput field:
      this.refs.todoText.focus();
    };
  },
  // Render func:
  render: function () {
    return (
      <div className="container__footer"> {/*child custom class*/}
      <form ref="form" onSubmit={this.onFormSubmit}>
        <input type="text" ref="todoText" placeholder="Enter something to do:"/>
        <button className="button expanded" >Add Todo</button>
      </form>
    </div>
    )
  }
});

// Export the object:
// module.exports = AddTodo;
// Export the default. needs no props from the store state.
export default connect()(AddTodo);
