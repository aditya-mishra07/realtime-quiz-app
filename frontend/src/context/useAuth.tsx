import {
  // checkAuthAPI,
  emailVerifyAPI,
  signinAPI,
  signoutAPI,
  signupAPI,
} from "@/Services/authService";
import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
type AuthContextType = {
  signin: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
  signout: () => void;
  verifyemail: (token: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
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
        toast.success(`${username} has signed in!`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signout = async () => {
    try {
      const res = await signoutAPI();
      if (res?.data.loggedOut == true) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyemail = async (token: string) => {
    try {
      await emailVerifyAPI(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signin, signup, signout, verifyemail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
