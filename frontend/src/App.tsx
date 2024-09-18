import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/useAuth";

function App() {
  return (
    <>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default App;
