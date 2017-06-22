// Todo container component
var React = require('react');
const moment = require('moment');

// Create functional component with state:
var Todo = React.createClass({
  render: function() {
    var {id, text, completed, createdAt, completedAt} = this.props;
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
      <div onClick={() => {
        this.props.onToggle(id);
      }}>
        <input type="checkbox" checked={completed} readOnly/>
        <p>{text}</p>
        <p>{renderdate()}</p>
      </div>
    );
  },
});

module.exports = Todo;
