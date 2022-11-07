import { useEffect, useState } from "react"

const Locations = ({ term }) => {
  const [hits, setHits] = useState([])

  const fetchHits = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
        term
      )}`
    )
    const json = await response.json()
    setHits(json)
  }

  useEffect(() => {
    setHits([])
    fetchHits()
  }, [term])

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Locations</h3>
      </div>
      <div className="panel-body">
        <table className="table table-striped">
          <tbody>
            {hits.map(({ place_id, display_name, lat, lon }) => (
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
}

export default Locations
