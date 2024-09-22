import { User } from "../Pages/User";
import { Admin } from "@/Pages/Admin/Admin";
import Leaderboard from "../Pages/Leaderboard";
import SignIn from "../Pages/Auth/SignIn";
import Signup from "../Pages/Auth/Signup";
import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import ForgottenPassword from "@/Pages/Auth/ForgottenPassword";
import ProtectedRoute from "./ProtectedRoute";
import AdminQuestion from "@/Pages/Admin/AdminQuestion";

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

        element: (
          <ProtectedRoute>
            <Admin />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/question",
        element: <AdminQuestion />,
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
      {
        path: "/forgotpassword",
        element: <ForgottenPassword />,
      },
    ],
  },
]);
