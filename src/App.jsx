import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Landing from "./pages/Landing";
import Dashbaord from "./pages/Dashbaord";
import Auth from "./pages/Auth";
import Link from "./pages/Link";
import RedirectLink from "./pages/RedirectLink";
const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<Landing/>
      },
      {
        path:"/dashboard",
        element:<Dashbaord/>
      },
      {
        path:"/auth",
        element:<Auth/>
      },
      {
        path:"/link/:id",
        element:<Link/>
      },
      {
        path:"/:id",
        element:<RedirectLink/>
      }]
  }
])
const App = () => {
  return (
   <RouterProvider router={router} />
  );
};

export default App;
