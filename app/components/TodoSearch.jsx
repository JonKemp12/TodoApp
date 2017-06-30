// TodoSearch component
var React = require('react');

// Load Redux-React connect functional
var {connect} = require('react-redux');
// Redux action generators
var actions = require('actions');


// Create functional component:
// Has input field for seach text, and function to search as values are entered.
// Export the raw (unconnected) object for unit testing
export var TodoSearch = React.createClass({
  /*
  handleSearch: function () {
    var showCompleted = this.refs.showCompleted.checked;
    var searchText = this.refs.searchText.value;
    // Get the dispatch from the props.
    var {dispatch} = this.props;
    // pass the values up to parent function given in the prop.
    this.props.onSearch(showCompleted, searchText);
    // dispatch the action to the store:
    dispatch(actions.setSearchText(searchText));
  },
  */


  render: function () {
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
  },
});

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
