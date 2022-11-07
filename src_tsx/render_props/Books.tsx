import { type FC, useEffect, useState } from "react"

type BooksHit = {
  key: string
  title: string
  subtitle: string
  publish_date: string
  subjects?: string[]
}

type DisplayProps = {
  data?: BooksHit[]
}

const BooksDisplay: FC<DisplayProps> = ({ data }) => (
  <div className="panel panel-default">
    <div className="panel-heading">
      <h3 className="panel-title">Books</h3>
    </div>
    <div className="panel-body">
      <table className="table table-striped">
        <tbody>
          {data?.map((book) => (
            <tr key={book.key}>
              <td>{book.title}</td>
              <td>{book.subtitle}</td>
              <td>{book.subjects?.join("; ")}</td>
              <td>{book.publish_date}</td>
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

const Books: FC<Props> = ({ term }) => {
  const [data, setData] = useState(undefined)

  const fetchData = async () => {
    const response = await fetch(
      `http://openlibrary.org/query.json?type=/type/edition&limit=10&*=&title=${encodeURIComponent(
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

  return <BooksDisplay data={data} />
}

export default Books
