import { HashRouter, Route, Routes } from "react-router"
import MainLayout from "./layout/MainLayout"
import { LoadingProvider } from "./contexts/LoadingContext"
import Setting from "./pages/Setting/Setting"
import Home from "./pages/Home/Home"
import Pendrive from "./pages/Pendrive/Pendrive"
import History from "./pages/History/History"

function App(): JSX.Element {
  return (
    <LoadingProvider>
      <HashRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/history" element={<History />} />
            <Route path="/pendrive" element={<Pendrive />} />
            <Route path="*" element={<div>No se supone que estes aqui :C</div>} />
          </Routes>
        </MainLayout>
      </HashRouter>
    </LoadingProvider>
  )
}

export default App
