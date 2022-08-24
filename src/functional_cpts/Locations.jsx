import React from "react"
import JsonFetcher from "./JsonFetcher"

class LocationDisplay extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const location_rows =
      this.props.data &&
      this.props.data.map(({ place_id, display_name, lat, lon }) => {
        return (
          <tr key={place_id}>
            <td>{display_name}</td>
            <td>
              {lat},{lon}
            </td>
          </tr>
        )
      })

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Locations</h3>
        </div>
        <div className="panel-body">
          <table className="table table-striped">
            <tbody>{location_rows}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

class Locations extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const url =
      "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=" +
      encodeURIComponent(this.props.term)

    return <JsonFetcher DataConsumer={LocationDisplay} url={url} />
  }
}

export default Locations
