import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import PostView from "./src/component/pages/post/ViewPost";
import ViewPost from "./src/component/pages/post/ViewPost";
import Login from "./src/component/pages/login";
import Signup from "./src/component/pages/signup";
import { PrivateRouteHandler } from "./src/component/PrivateRouteHandler";

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
        element: <PostView />,
      },
      {
        path: "/p/add_post",
        element: <ViewPost />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routerConfig} />);
