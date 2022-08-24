import React from "react"
import JsonFetcher from "./JsonFetcher"

class RedditDisplay extends React.Component {
  render() {
    const reddit_links =
      this.props.data &&
      this.props.data.data &&
      this.props.data.data.children.map(
        ({ data: { id, title, url, created, subscribers } }) => {
          const date = new Date(1000 * created) // Convert seconds to milliseconds
          return (
            <tr key={id}>
              <td>{date.toLocaleDateString()}</td>
              <td>{subscribers}</td>
              <td>
                <a href={"https://reddit.com" + url}>{title}</a>
              </td>
            </tr>
          )
        }
      )

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Reddit</h3>
        </div>
        <div className="panel-body">
          <table className="table table-striped">
            <tbody>{reddit_links}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

class Reddit extends React.Component {
  render() {
    const url =
      "https://api.reddit.com/api/subreddit_autocomplete_v2.json?limit=10&include_over_18=false&query=" +
      encodeURIComponent(this.props.term)

    return <JsonFetcher DataConsumer={RedditDisplay} url={url} />
  }
}

export default Reddit
