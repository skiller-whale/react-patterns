import { type FC, useEffect, useState } from "react"

type Props = {
  term: string
}

const Books: FC<Props> = ({ term }) => {
  const [hits, setHits] = useState([])

  const fetchHits = async () => {
    const response = await fetch(
      `http://openlibrary.org/query.json?type=/type/edition&limit=10&*=&title=${encodeURIComponent(
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
        <h3 className="panel-title">Books</h3>
      </div>
      <div className="panel-body">
        <table className="table table-striped">
          <tbody>
            {hits.map(({ key, title, subtitle, subjects, publish_date }) => (
              <tr key={key}>
                <td>{title}</td>
                <td>{subtitle}</td>
                <td>{subjects ? subjects.join("; ") : null}</td>
                <td>{publish_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Books
