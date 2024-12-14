import { RouterProvider } from "react-router"
import MainLayout from "./layout/MainLayout"
import router from "./routes"
import { LoadingProvider } from "./contexts/LoadingContext"

function App(): JSX.Element {
  return (
    <LoadingProvider>
      <MainLayout>
        <RouterProvider router={router} />
      </MainLayout>
    </LoadingProvider>
  )
}

export default App
