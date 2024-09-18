import { signinAPI, signupAPI } from "@/Services/authService";
import axios from "axios";
import { useContext, useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  token: string | null;
  signin: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
  signout: () => void;
  isSignedIn: () => boolean;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const signup = async (username: string, password: string) => {
    try {
      const res = await signupAPI(username, password);
      if (res) {
        localStorage.setItem("token", res?.data.token);
        setToken(res?.data.token!);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
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
        localStorage.setItem("token", res?.data.token);
        setToken(res?.data.token!);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isSignedIn = () => {
    return !!token;
  };

  const signout = () => {
    localStorage.removeItem("token");
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ token, signin, signup, isSignedIn, signout }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
