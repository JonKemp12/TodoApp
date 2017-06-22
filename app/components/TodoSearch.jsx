// TodoSearch component
var React = require('react');



// Create functional component:
// Has input field for seach text, and function to search as values are entered.
var TodoSearch = React.createClass({
  handleSearch: function () {
    var showCompleted = this.refs.showCompleted.checked;
    var searchText = this.refs.searchText.value;
    // pass the values up to parent function given in the prop.
    this.props.onSearch(showCompleted, searchText);
  },

  render: function () {
    return (
      <div className="container__header"> {/*child custom class*/}
        {/*First input field*/}
        <div>
          <input type="search" ref="searchText" placeholder="Search todos" onChange={this.handleSearch}/>
        </div>
        <div>
          {/*Check box for completed - <label> means click anywhere, not just box*/}
          <div>
            <label>
              <input type="checkbox" ref="showCompleted" onChange={this.handleSearch}/>
              Show Completed todos
            </label>
          </div>
      </div>
    </div>
    );
  },
});

module.exports = TodoSearch;
