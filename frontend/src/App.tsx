import GlobalStyled from "./styles/global"
import { BrowserRouter } from "react-router-dom"

import { Router } from "./router"

function App() {

  return (
    <BrowserRouter>
      <GlobalStyled />
      <Router />
    </BrowserRouter>
  )
}

export default App
