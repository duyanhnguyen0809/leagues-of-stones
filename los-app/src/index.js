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

// icon
import attack from './images/attack.png';
import defense from './images/defense.png';

// players
import player01 from './images/player01.png';
import player02 from './images/player02.png';

// sounds
import attackSound from './sounds/attack.wav';
import defenseSound from './sounds/defense.mp3';
import explosion from './sounds/explosion.mp3';





const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/lobby",
        element: <Lobby />,
      },
      {
        path: "/welcome",
        element: <WelcomePage />,
      },
      {
        path: "/game",
        element: <Game />,
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
        element: <Match/>,
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

export {
  attack,
  defense,

  player01,
  player02,

  attackSound,
  defenseSound,
  explosion,
}

reportWebVitals();
