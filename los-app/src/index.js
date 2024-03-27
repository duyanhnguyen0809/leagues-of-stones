import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import Root from "./pages/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Provider } from "react-redux";
import store from "./store"; // replace with the path to your store
import Game from "./pages/Game";
import WelcomePage from "./pages/WelcomePage";
import Lobby from "./pages/Lobby";
import Match from "./pages/Match";
const username = localStorage.getItem("username");
const token = localStorage.getItem("authToken");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/lobby",
        element: <Lobby username={username} token={token} />,
      },
      {
        path: "/welcome",
        element: <WelcomePage username={username} token={token} />,
      },
      {
        path: "/game",
        element: <Game token={token} />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/match",
        element: <Match username={username} token={token}/>,
      },
    ],
  },
]);

const root = document.getElementById("root");
createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
