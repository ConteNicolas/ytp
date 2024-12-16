import { createBrowserRouter } from "react-router";
import Home from "./pages/Home/Home";
import Setting from "./pages/Setting/Setting";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/setting",
        element: <Setting />,
    }
])

export default router;