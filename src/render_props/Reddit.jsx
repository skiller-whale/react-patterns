import React from "react"

const RedditDisplay = props => {
  const reddit_links = props.data && props.data.data && props.data.data.children.map(
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

class Reddit extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount() {
    this.fetchRedditData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.term !== this.props.term) {
      this.setState({ data: null })
      this.fetchRedditData()
    }
  }

  fetchRedditData() {
    fetch(
      "https://api.reddit.com/api/subreddit_autocomplete_v2.json?limit=10&include_over_18=false&query=" +
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
    return <RedditDisplay data={this.state.data} />
  }
}

export default Reddit
