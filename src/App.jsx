import { Show } from "./components/Show"
import { Update } from "./components/Update.jsx"
import { BrowserRouter,Route,Routes } from "react-router-dom"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Show/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
