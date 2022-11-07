import { useEffect, useState } from "react"

const HackerNewsDisplay = ({ data }) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Hacker News</h3>
    </div>
    <div className="panel-body">
      <table className="table table-striped">
        <tbody>
          {data?.hits.map(({ objectID, created_at, points, title, url }) => (
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

const HackerNews = ({ term }) => {
  const [data, setData] = useState(undefined)

  const fetchData = async () => {
    const response = await fetch(
      `http://hn.algolia.com/api/v1/search?hitsPerPage=10&query=${encodeURIComponent(
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

  return <HackerNewsDisplay data={data} />
}

export default HackerNews
