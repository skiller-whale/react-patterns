import React from "react"

const LocationsDisplay = (props) => {
  const location_rows =
    props.data &&
    props.data.map(({ place_id, display_name, lat, lon }) => {
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

class Locations extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount() {
    this.fetchLocations()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.term !== this.props.term) {
      this.setState({ data: null })
      this.fetchLocations()
    }
  }

  fetchLocations() {
    fetch(
      "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=" +
        encodeURIComponent(this.props.term)
    )
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({ data: json })
      })
  }

  render() {
    return <LocationsDisplay data={this.state.data} />
  }
}

export default Locations
