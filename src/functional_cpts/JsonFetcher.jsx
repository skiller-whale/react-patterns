import React from "react"

class JsonFetcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: null }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.fetchData()
    }
  }

  fetchData() {
    this.setState({ data: null })
    fetch(this.props.url)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({ data: json })
      })
  }

  render() {
    return <this.props.DataConsumer data={this.state.data} />
  }
}

export default JsonFetcher
