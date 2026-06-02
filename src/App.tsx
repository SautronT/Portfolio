import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import ProjectDetail from "./pages/ProjectDetail"
import { LanguageProvider } from "./context/LanguageContext"

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<><Header /><Home /><Footer /></>} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
