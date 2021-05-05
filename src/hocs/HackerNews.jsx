import React from "react"

const HackerNewsRow = props => {
  return <tr>
    <td>{props.date.toLocaleDateString()}</td>
    <td>{props.points}</td>
    <td>
      <a href={props.url}>{props.title}</a>
    </td>
  </tr>
}

const HackerNewsDisplay = props => {
  // We get other fields back that we're not using. For example, the user who submitted the URL is in the author field.
  const hn_links = props.data && props.data["hits"].map(
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

class HackerNews extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount() {
    this.fetchHNData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.term !== this.props.term) {
      this.setState({ data: null })
      this.fetchHNData()
    }
  }

  fetchHNData() {
    fetch(
      "http://new-hn.algolia.com/api/v1/search?hitsPerPage=10&query=" +
      encodeURIComponent(this.props.term)
    )
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({ data: json })
      })
  }

  render() {
    return <HackerNewsDisplay data={this.state.data} />
  }
}

export default HackerNews
