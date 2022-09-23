import React from "react"

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.onTermChanged = this.onTermChanged.bind(this)
  }

  onTermChanged(event) {
    event.preventDefault()
    this.props.setSearchTerm(event.target.value)
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="searchField">Search everything in one place</label>
        <input
          className="form-control"
          type="text"
          id="searchField"
          onChange={this.onTermChanged}
          placeholder="London"
        />
      </div>
    )
  }
}

export default SearchBox
