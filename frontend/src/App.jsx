import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import CollegeP from "./components/CollegeP";
import RankP from "./components/RankP";
import PercentileP from "./components/PercentileP";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/collegep",
    element: <CollegeP/>,
  },
  {
    path:"/rankp",
    element:<RankP/>
  },
  {
    path:"/percentilep",
    element:<PercentileP/>
  }
]);
function App() {
  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;