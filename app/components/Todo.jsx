// Todo container component
import React from 'react';
import moment from 'moment';
// Load Redux-React connect functional
import {connect} from 'react-redux';
// Redux actions
import * as actions from 'actions';

// Create functional component with state:
// Export the raw version for testing only
// Refaactor as ES6 Class:
export class Todo extends React.Component {
  render() {
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
  };
};

// module.exports = Todo;
// Connect Todo to store to pickup dispatch Function
// export the connected version as the default to those that require it!
export default connect()(Todo);
