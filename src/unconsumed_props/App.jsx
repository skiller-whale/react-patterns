import { useState } from "react"
import Books from "./Books"
import Locations from "./Locations"
import HackerNews from "./HackerNews"
import Reddit from "./Reddit"

const App = () => {
  const [term, setTerm] = useState("London")

  const changeTerm = (event) => {
    event.preventDefault()
    setTerm(event.currentTarget.value)
  }

  return (
    <div className="container">
      <h5>Edit me in src/unconsumed_props/App.jsx</h5>
      <h1>Omnisearch</h1>
      <div className="form-group">
        <label htmlFor="searchField">Search everything in one place</label>
        <input
          className="form-control"
          type="text"
          id="searchField"
          onChange={changeTerm}
          placeholder={term}
        />
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <Reddit term={term} />
        </div>
        <div className="col-lg-6 col-md-12">
          <HackerNews term={term} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <Locations term={term} />
        </div>
        <div className="col-lg-6 col-md-12">
          <Books term={term} />
        </div>
      </div>
    </div>
  )
}

export default App
