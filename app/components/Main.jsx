// Main container component

var React = require('react');

// Instead create stateless functional component
var Main = (props) => {
  return (
    <div>
      <Nav/>
      <div className="row">
        {/* create a grid for all children
            1/2 on medium screen, 1/3 on large, all centered */}
        <div className="columns medium-6 large-4 small-centered">
            {props.children}
        </div>
      </div>
    </div>
  );
}

module.exports = Main;
