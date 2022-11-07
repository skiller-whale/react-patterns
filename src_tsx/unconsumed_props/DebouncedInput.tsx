import { type ChangeEventHandler, type FC } from "react"
import { debounce } from "lodash"

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>
}

const DebouncedInput: FC<Props> = (props) => {
  // Use lodash's debounce function to only call the onChange after 300ms without changes
  const debouncedCallback = debounce(props.onChange, 300)

  return <input onChange={debouncedCallback} />
}

export default DebouncedInput
