import { useAuth } from "@/context/useAuth";

const Logout = () => {
  const { signout } = useAuth();
  const handleLogout = () => {
    signout();
  };
  return (
    <button onClick={handleLogout} className="bg-purple-500">
      Logout
    </button>
  );
};

export default Logout;
