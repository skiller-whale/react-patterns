import { debounce } from "lodash"

const DebouncedInput = (props) => {
  // Use lodash's debounce function to only call the onChange after 300ms without changes
  const debouncedCallback = debounce(props.onChange, 300)

  return <input onChange={debouncedCallback} />
}

export default DebouncedInput
