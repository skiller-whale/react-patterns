import { useEffect, useState } from "react"

const LocationsDisplay = ({ data }) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Locations</h3>
    </div>
    <div className="panel-body">
      <table className="table table-striped">
        <tbody>
          {data?.map(({ place_id, display_name, lat, lon }) => (
            <tr key={place_id}>
              <td>{display_name}</td>
              <td>
                {lat},{lon}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const Locations = ({ term }) => {
  const [data, setData] = useState(undefined)

  const fetchData = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
        term
      )}`
    )
    const json = await response.json()
    setData(json)
  }

  useEffect(() => {
    setData(undefined)
    fetchData()
  }, [term])

  return <LocationsDisplay data={data} />
}

export default Locations
