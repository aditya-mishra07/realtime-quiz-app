import { AdminProfileToken } from "@/Models/admin";
import axios from "axios";
const api = "http://localhost:3000/api/v1/admin/auth/";

export const signinAPI = async (username: string, password: string) => {
  try {
    const res = await axios.post<AdminProfileToken>(api + "signin", {
      email: username,
      password: password,
    });
    return res;
  } catch (error) {
    //TODO: handleError
    console.log(error);
  }
};

export const signupAPI = async (username: string, password: string) => {
  try {
    const res = axios.post<AdminProfileToken>(api + "signup", {
      email: username,
      password: password,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
