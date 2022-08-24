import React from "react"

class Books extends React.Component {
  constructor(props) {
    super(props)
    this.state = { book_hits: [] }
  }

  componentDidMount() {
    this.fetchBookData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.term !== this.props.term) {
      this.setState({ book_hits: [] })
      this.fetchBookData()
    }
  }

  fetchBookData() {
    fetch(
      "http://openlibrary.org/query.json?type=/type/edition&limit=10&*=&title=" +
        encodeURIComponent(this.props.term)
    )
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({ book_hits: json })
      })
  }

  render() {
    const book_rows = this.state.book_hits.map((book) => {
      const subject_list = book.subjects && book.subjects.join("; ")
      return (
        <tr key={book.key}>
          <td>{book.title}</td>
          <td>{book.subtitle}</td>
          <td>{subject_list}</td>
          <td>{book.publish_date}</td>
        </tr>
      )
    })

    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Books</h3>
        </div>
        <div className="panel-body">
          <table className="table table-striped">
            <tbody>{book_rows}</tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Books
