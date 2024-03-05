import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Pdf from "./Pages/Pdf";
import AllPdfs from "./Pages/AllPdfs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/invoice-generator",
    element:<Home />,
  },
  {
    path: "/pdfs",
    element:<AllPdfs />,
  },
  {
    path: "/invoice-pdf/:id",
    element:<Pdf />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
