// Login page for individual Todo Lists:
import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';
// The Login page:
export var Login = React.createClass({
  // Code to handle the login click (ES6 shortform code.):
  onLogin() {
    // Redux provides the actions as props.
    var {dispatch} = this.props;
    // Kick off the login action
    dispatch(actions.startLogin());
  },
  // Create a render:
  render: function() {
    return (
      <div>
        <h1 className="page-title">Todo App</h1>
        <div className="row">
          <div className="columns small-10 medium-6 large-4 small-centered">
              <div className="callout callout-auth">
                <h3>Login</h3>
                <p>Login with GitHub account below.</p>
                <button className="button" onClick={this.onLogin}>Login with GitHub</button>
              </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Redux.connect()(Login);
