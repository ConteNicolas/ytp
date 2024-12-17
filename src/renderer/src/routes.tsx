import { createBrowserRouter } from "react-router";
import Home from "./pages/Home/Home";
import Setting from "./pages/Setting/Setting";
import History from "./pages/History/History";
import Pendrive from "./pages/Pendrive/Pendrive";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/setting",
        element: <Setting />,
    },
    {
        path: "/history",
        element: <History />,
    },
    {
        path: "/pendrive",
        element: <Pendrive />,
    }
])

export default router;