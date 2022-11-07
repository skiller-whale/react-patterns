import { type FC, useEffect, useState } from "react"

type Props = {
  term: string
}

const HackerNews: FC<Props> = ({ term }) => {
  const [hits, setHits] = useState([])

  const fetchHits = async () => {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?hitsPerPage=10&query=${encodeURIComponent(
        term
      )}`
    )
    const json = await response.json()
    setHits(json.hits)
  }

  useEffect(() => {
    setHits([])
    fetchHits()
  }, [term])

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Hacker News</h3>
      </div>
      <div className="panel-body">
        <table className="table table-striped">
          <tbody>
            {hits.map(({ objectID, created_at, points, url, title }) => (
              <tr key={objectID}>
                <td>{new Date(created_at).toLocaleDateString()}</td>
                <td>{points}</td>
                <td>
                  <a href={url}>{title}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HackerNews
