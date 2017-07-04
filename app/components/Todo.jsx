// Todo container component
var React = require('react');
const moment = require('moment');
// Load Redux-React connect functional
var {connect} = require('react-redux');
// Redux actions
var actions = require('actions');

// Create functional component with state:
// Export the raw version for testing only
export var Todo = React.createClass({
  render: function() {
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    // var to change class/style depending on status
    var todoClassName = completed ? 'todo todo-completed' : 'todo'
    // Func to render dates
    var renderdate = () => {
      var message = 'Created ';
      var timestamp = createdAt;

      // If completed, use that date in display
      if (completed) {
        message = 'Completed ';
        timestamp = completedAt;
      }

      return message + moment.unix(timestamp).format('MMM Do YYYY @ HH:mm');
    };
    // Return a DIV, that takes a prop for the function to call
    //  if it is clicked at all (this will switch the completed state)
    return (
      <div className={todoClassName} onClick={() => {
          //this.props.onToggle(id);
          dispatch(actions.startToggleCompleted(id, !completed));
        }}>
        <div>
          <input type="checkbox" checked={completed} readOnly/>
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderdate()}</p>
        </div>
      </div>
    );
  },
});

// module.exports = Todo;
// Connect Todo to store to pickup dispatch Function
// export the connected version as the default to those that require it!
export default connect()(Todo);
