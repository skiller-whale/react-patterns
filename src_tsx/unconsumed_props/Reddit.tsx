import { type FC, useEffect, useState } from "react"

type Props = {
  term: string
}

const Reddit: FC<Props> = ({ term }) => {
  const [hits, setHits] = useState([])

  const fetchHits = async () => {
    const response = await fetch(
      `https://api.reddit.com/api/subreddit_autocomplete_v2.json?limit=10&include_over_18=false&query=${encodeURIComponent(
        term
      )}`
    )
    const json = await response.json()
    setHits(json.data.children)
  }

  useEffect(() => {
    setHits([])
    fetchHits()
  }, [term])

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">Reddit</h3>
      </div>
      <div className="panel-body">
        <table className="table table-striped">
          <tbody>
            {hits.map(({ data: { id, title, url, created, subscribers } }) => (
              <tr key={id}>
                <td>{new Date(1000 * created).toLocaleDateString()}</td>
                <td>{subscribers}</td>
                <td>
                  <a href={"https://reddit.com" + url}>{title}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Reddit
