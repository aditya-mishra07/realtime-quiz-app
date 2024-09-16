import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { User } from "./Pages/User";
import { Admin } from "./Admin/Admin";
import Leaderboard from "./Pages/Leaderboard";
import SignIn from "./Admin/SignIn";
import Signup from "./Admin/Signup";

function App() {
  const router = createBrowserRouter([
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
  ]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
