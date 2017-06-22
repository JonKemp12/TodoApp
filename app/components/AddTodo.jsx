// For webpack - import the React libs:
var React = require('react');

// Create a sub-component for our form:
// User interaction component
// Takes parent handler function as prop
var AddTodo = React.createClass({
  // Submit func:
  onFormSubmit: function (e) {
    // Prevents to default page handler which would reload
    e.preventDefault();

    var todoText = this.refs.todoText.value;

    // Clear form and add to updates var
    // Check it's not empty
    if (todoText.length > 0){
      this.refs.todoText.value = '';
      // Call the parent function;
      this.props.onSetAddTodo(todoText);
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
module.exports = AddTodo;
