import { useAuth } from "@/context/useAuth";
import { Navigate } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { auth } = useAuth();
  if (auth.loading) {
    return <div>Loading...</div>;
  }
  if (!auth.authenticated) {
    return <Navigate to="/signin" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
