import React from "react"

class Locations extends React.Component {
  constructor(props) {
    super(props)
    this.state = { locations: [] }
  }

  componentDidMount() {
    this.fetchLocations()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.term !== this.props.term) {
      this.setState({ locations: [] })
      this.fetchLocations()
    }
  }

  fetchLocations() {
    this.setState({ locations: [] })

    fetch(
      "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=" +
        encodeURIComponent(this.props.term)
    )
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({ locations: json })
      })
  }

  render() {
    const location_rows = this.state.locations.map(
      ({ place_id, display_name, lat, lon }) => {
        return (
          <tr key={place_id}>
            <td>{display_name}</td>
            <td>
              {lat},{lon}
            </td>
          </tr>
        )
      }
    )

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

export default Locations
