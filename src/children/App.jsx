import React from "react"
import Books from "./Books"
import Locations from "./Locations"
import HackerNews from "./HackerNews"
import Reddit from "./Reddit"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { term: "London" }
    this.termChanged = this.termChanged.bind(this)
  }

  termChanged(event) {
    event.preventDefault()
    // This is happening too often at the moment. We'll fix that later.
    this.setState({ term: event.target.value })
  }

  render() {
    return (
      <div className="container">
        <h5>Edit me in src/children/App.jsx</h5>
        <h1>Omnisearch</h1>
        <div className="form-group">
          <label htmlFor="searchField">Search everything in one place</label>
          <input
            className="form-control"
            type="text"
            id="searchField"
            onChange={this.termChanged}
            placeholder={this.state.term}
          />
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <Reddit term={this.state.term} />
          </div>
          <div className="col-lg-6 col-md-12">
            <HackerNews term={this.state.term} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <Locations term={this.state.term} />
          </div>
          <div className="col-lg-6 col-md-12">
            <Books term={this.state.term} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
