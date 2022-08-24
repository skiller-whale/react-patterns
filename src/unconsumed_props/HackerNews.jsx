import React from "react"

class HackerNewsRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr>
        <td>{this.props.date.toLocaleDateString()}</td>
        <td>{this.props.points}</td>
        <td>
          <a href={this.props.url}>{this.props.title}</a>
        </td>
      </tr>
    )
  }
}

class HackerNews extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hn_hits: [] }
  }

  componentDidMount() {
    this.fetchHNData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.term !== this.props.term) {
      this.setState({ hn_hits: [] })
      this.fetchHNData()
    }
  }

  fetchHNData() {
    fetch(
      "http://hn.algolia.com/api/v1/search?hitsPerPage=10&query=" +
        encodeURIComponent(this.props.term)
    )
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        const hits = json["hits"]
        this.setState({ hn_hits: hits })
      })
  }

  render() {
    // We get other fields back that we're not using. For example, the user who submitted the URL is in the author field.
    const hn_links = this.state.hn_hits.map(
      ({ objectID, author, created_at, points, title, url }) => {
        const date = new Date(created_at)
        return (
          <HackerNewsRow
            key={objectID}
            author={author}
            date={date}
            points={points}
            url={url}
            title={title}
          />
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

export default HackerNews
