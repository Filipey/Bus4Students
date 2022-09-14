import GlobalStyled from "./styles/global"
import { BrowserRouter } from "react-router-dom"

import { Router } from "./router"

function App() {

  return (
    <BrowserRouter>
      <GlobalStyled />
      <header>

      </header>
      <body>
        <Router />
      </body>
      <footer>

      </footer>
    </BrowserRouter>
  )
}

export default App
