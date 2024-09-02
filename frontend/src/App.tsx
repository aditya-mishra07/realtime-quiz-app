import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { User } from "./Pages/User";
import { Admin } from "./Pages/Admin";
import WaitRoom from "./Pages/WaitRoom";

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
      path: "/waiting_room",
      element: <WaitRoom />,
    },
  ]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
