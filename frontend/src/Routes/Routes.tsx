import { User } from "../Pages/User";
import { Admin } from "../Admin/Admin";
import Leaderboard from "../Pages/Leaderboard";
import SignIn from "../Admin/SignIn";
import Signup from "../Admin/Signup";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <User />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
