import { checkAuthAPI } from "@/Services/authService";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const [auth, setAuth] = useState({ authenticated: false, loading: true });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await checkAuthAPI();
        if (res) {
          setAuth({ authenticated: res.data.authenticated, loading: false });
        } else {
          setAuth({ authenticated: false, loading: false });
        }
      } catch (error) {
        setAuth({ authenticated: false, loading: false });
      }
    };
    checkAuth();
  }, []);

  console.log(auth);
  if (auth.loading) {
    return <div>Loading...</div>;
  }
  if (!auth.authenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};
export default ProtectedRoute;
