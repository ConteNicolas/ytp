import { RouterProvider } from "react-router"
import MainLayout from "./layout/MainLayout"
import router from "./routes"

function App(): JSX.Element {
  return (
    <MainLayout>
      <RouterProvider router={router} />
    </MainLayout>
  )
}

export default App
