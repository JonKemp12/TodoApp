// For webpack - import the React libs:
import React from 'react';
// Load Redux-React connect functional
import {connect} from 'react-redux';
// Redux actions
import * as actions from 'actions';

// Create functional component:
// Has input field for seach text, and function to search as values are entered.
// Export the raw (unconnected) object for unit testing

// Refaactor as ES6 Class:
export class TodoSearch extends React.Component {
  render () {
    // Get the state vars via connected props.
    var {dispatch, showCompleted, searchText} = this.props;

    return (
      <div className="container__header"> {/*child custom class*/}
        {/*First input field*/}
        <div>
          {/*<input type="search" ref="searchText" placeholder="Search todos" onChange={this.handleSearch}/>
              Set default value from state and dispatch generator on change:
              NOTE: I would prefer to do this in function as above*/}
          <input type="search" ref="searchText" placeholder="Search todos"
            value={searchText} onChange={() => {
              var searchText = this.refs.searchText.value;
              dispatch(actions.setSearchText(searchText));
            }}/>
        </div>
        <div>
          {/*Check box for completed - <label> means click anywhere, not just box*/}
          <div>
            <label>
              {/* <input type="checkbox" ref="showCompleted" onChange={this.handleSearch}/> */}
              <input type="checkbox" ref="showCompleted" checked={showCompleted}
                onChange={() => {
                  dispatch(actions.toggleShowCompleted());
                }}/>
              Show Completed todos
            </label>
          </div>
      </div>
    </div>
    );
  };
};

// module.exports = TodoSearch;
// Export the connected TodoSearch
export default connect(
  // Takes a function, passing in state and returns the reqired state variables
  // and makes them available as properties to this component
  (state) => {
    return {
      showCompleted: state.showCompleted,
      searchText: state.searchText
    }
  }
)(TodoSearch);
