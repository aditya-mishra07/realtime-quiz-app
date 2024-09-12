import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { User } from "./Pages/User";
import { Admin } from "./Pages/Admin";
import Right from "./Pages/Right";
import Wrong from "./Pages/Wrong";

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
      path: "/right",
      element: <Right />,
    },
    {
      path: "/wrong",
      element: <Wrong />,
    },
  ]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
