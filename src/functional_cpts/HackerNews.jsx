import React from "react"
import JsonFetcher from "./JsonFetcher"

class HackerNewsRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <tr>
      <td>{this.props.date.toLocaleDateString()}</td>
      <td>{this.props.points}</td>
      <td>
        <a href={this.props.url}>{this.props.title}</a>
      </td>
    </tr>
  }
}

class HackerNewsDisplay extends React.Component {
  render() {
    // We get other fields back that we're not using. For example, the user who submitted the URL is in the author field.
    const hn_links = this.props.data && this.props.data.hits.map(
      ({ objectID, author, created_at, points, title, url }) => {
        const date = new Date(created_at)
        return (
          <HackerNewsRow key={objectID} author={author} date={date} points={points} url={url} title={title} />
        )
      }
    )
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Hacker News</h3>
        </div>
        <div className="panel-body">
          <table className="table table-striped">
            <tbody>{hn_links}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

class HackerNews extends React.Component {
  render() {
    const url = "http://hn.algolia.com/api/v1/search?hitsPerPage=10&query=" +
      encodeURIComponent(this.props.term)

    return <JsonFetcher DataConsumer={HackerNewsDisplay} url={url} />
  }
}

export default HackerNews
