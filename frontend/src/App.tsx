import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { User } from "./Pages/User";
import { Admin } from "./Pages/Admin";

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
  ]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
