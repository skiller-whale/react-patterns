import { type FC, useEffect, useState } from "react"

type RedditHit = {
  data: {
    id: string
    title: string
    url: string
    created: number
    subscribers: number
  }
}

type DisplayProps = {
  data?: {
    data: {
      children: RedditHit[]
    }
  }
}

const RedditDisplay: FC<DisplayProps> = ({ data }) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Reddit</h3>
    </div>
    <div className="panel-body">
      <table className="table table-striped">
        <tbody>
          {data?.data.children.map(({ data }) => (
            <tr key={data.id}>
              <td>{new Date(1000 * data.created).toLocaleDateString()}</td>
              <td>{data.subscribers}</td>
              <td>
                <a href={`https://reddit.com${data.url}`}>{data.title}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

type Props = {
  term: string
}

const Reddit: FC<Props> = ({ term }) => {
  const [data, setData] = useState(undefined)

  const fetchData = async () => {
    const response = await fetch(
      `https://api.reddit.com/api/subreddit_autocomplete_v2.json?limit=10&include_over_18=false&query=${encodeURIComponent(
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

  return <RedditDisplay data={data} />
}

export default Reddit
