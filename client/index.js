import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import ViewPost from "./src/component/pages/post/ViewPost";
import Login from "./src/component/pages/login";
import Signup from "./src/component/pages/signup";
import { PrivateRouteHandler } from "./src/component/PrivateRouteHandler";
import AddPost from "./src/component/pages/post/AddPost";

// configs
import AppLayout from "./src/component/AppLayout";

console.log(process.env.REACT_APP_API_BASE_URL)
const routerConfig = createBrowserRouter([
  {
    path: "/u/login",
    element: <Login />,
  },
  {
    path: "/u/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <PrivateRouteHandler element={AppLayout} />,
    children: [
      {
        path: "/p/:id",
        element: <ViewPost />,
      },
      {
        path: "/p/add_post",
        element: <AddPost />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routerConfig} />);
