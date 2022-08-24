import React from "react"

import SearchBox from "./SearchBox"
import Books from "./Books"
import Locations from "./Locations"
import HackerNews from "./HackerNews"
import Reddit from "./Reddit"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { term: "London" }
    this.setSearchTerm = this.setSearchTerm.bind(this)
  }

  setSearchTerm(searchTerm) {
    this.setState({ term: searchTerm })
  }

  render() {
    return (
      <div className="container">
        <h5>Edit me in src/functional_cpts/App.jsx</h5>
        <h1>Omnisearch</h1>
        <SearchBox setSearchTerm={this.setSearchTerm} />
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
