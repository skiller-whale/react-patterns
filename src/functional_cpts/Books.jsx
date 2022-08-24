import React from "react"
import JsonFetcher from "./JsonFetcher"

class BooksDisplay extends React.Component {
  render() {
    const book_rows =
      this.props.data &&
      this.props.data.map((book) => {
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

class Books extends React.Component {
  render() {
    const url =
      "http://openlibrary.org/query.json?type=/type/edition&limit=10&*=&title=" +
      encodeURIComponent(this.props.term)

    return <JsonFetcher DataConsumer={BooksDisplay} url={url} />
  }
}

export default Books
