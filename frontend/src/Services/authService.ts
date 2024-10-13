import { AdminEmailVerifyToken, AdminProfileToken } from "@/Models/admin";
import axios from "axios";
import { toast } from "sonner";
const api = "http://localhost:3000/api/v1/admin/auth/";

export const signinAPI = async (username: string, password: string) => {
  try {
    const res = await axios.post<AdminProfileToken>(
      api + "login",
      {
        email: username,
        password: password,
      },
      {
        withCredentials: true, // Ensure cookies are sent back to the server
      }
    );
    return res;
  } catch (error: any) {
    const message = error.response.data.errors[0].message;
    toast.error(message);
  }
};

export const signupAPI = async (username: string, password: string) => {
  try {
    const res = await axios.post<AdminProfileToken>(api + "register", {
      email: username,
      password: password,
    });
    return res;
  } catch (error: any) {
    const message = error.response.data.errors[0].message;
    toast.error(message);
  }
};

export const checkAuthAPI = async () => {
  try {
    const res = await axios.get<{ authenticated: boolean }>(
      api + "auth-check",
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error: any) {
    const message = error.response.data.errors[0].message;
    toast.error(message);
  }
};

export const signoutAPI = async () => {
  try {
    const res = await axios.get<{ loggedOut: boolean }>(api + "logout", {
      withCredentials: true,
    });

    return res;
  } catch (error: any) {
    const message = error.response.data.errors[0].message;
    toast.error(message);
  }
};

export const emailVerifyAPI = async (token: string) => {
  try {
    const res = await axios.post<AdminEmailVerifyToken>(
      api + "verify-email",
      {
        token,
      },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (error: any) {
    const message = error.response.data.errors[0].message;
    toast.error(message);
  }
};
