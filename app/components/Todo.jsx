// Todo container component
var React = require('react');

// Create functional component with state:
var Todo = React.createClass({
  render: function() {
    var {id, text, completed} = this.props;
    // Return a DIV, that takes a prop for the function to call
    //  if it is clicked at all (this will switch the completed state)
    return (
      <div onClick={() => {
        this.props.onToggle(id);
      }}>
        <input type="checkbox" checked={completed} readOnly/>
        {text}
      </div>
    );
  },
});

module.exports = Todo;
