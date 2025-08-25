import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import JobListPage from "./pages/JobListPage"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<JobListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
