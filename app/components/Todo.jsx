// Todo container component
var React = require('react');
const moment = require('moment');

// Create functional component with state:
var Todo = React.createClass({
  render: function() {
    var {id, text, completed, createdAt, completedAt} = this.props;
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
          this.props.onToggle(id);
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

module.exports = Todo;
