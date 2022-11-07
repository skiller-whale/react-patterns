import { createRoot } from "react-dom/client"

/import App from "./children/App"
// import App from "./unconsumed_props/App"
// import App from "./hocs/App"
// import App from "./render_props/App"

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
