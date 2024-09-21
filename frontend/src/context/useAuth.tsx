import { checkAuthAPI, signinAPI, signupAPI } from "@/Services/authService";
import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  auth: {
    authenticated: boolean;
    loading: boolean;
  };
  signin: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
  signout: () => void;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({ authenticated: false, loading: true });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await checkAuthAPI();
        if (res) {
          setAuth({ authenticated: res.data.authenticated, loading: false });
        }
        setAuth({ authenticated: false, loading: false });
      } catch (error) {
        setAuth({ authenticated: false, loading: false });
      }
    };
    checkAuth();
  }, []);

  const signup = async (username: string, password: string) => {
    try {
      const res = await signupAPI(username, password);
      if (res) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (username: string, password: string) => {
    try {
      const res = await signinAPI(username, password);
      if (res) {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signout = () => {};

  return (
    <AuthContext.Provider value={{ auth, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
