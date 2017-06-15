// Todo container component
var React = require('react');

// Create functional component with state:
var Todo = React.createClass({
  render: function() {
    var {id, text} = this.props;
    return (
      <div>
        <p>{id} {text}</p>
      </div>
    );
  },
});

module.exports = Todo;
