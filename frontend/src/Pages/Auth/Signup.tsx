import { useAuth } from "@/context/useAuth";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Toaster, toast } from "sonner";

export default function Signup() {
  const { signup } = useAuth();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const handleSubmit = () => {
    if (!username || !password) {
      toast.error("Please fill in the details!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("The passwords don't match!");
      return;
    }
    signup(username, password);
  };

  return (
    <div className="h-screen bg-purple-500 flex items-center justify-center">
      <Toaster richColors />
      <div className="flex flex-col justify-center items-center bg-white rounded-lg text-center p-10">
        <h1 className=" text-2xl mb-4 font-semibold text-black">
          Create a free account
        </h1>
        <input
          type="text"
          placeholder="Email"
          className="border-2 border-gray-200 rounded-sm p-1 my-2 pr-20 pl-3"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Create password"
          className="border-2 border-gray-200 rounded-sm p-1 my-2 pr-20 pl-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="border-2 border-gray-200 rounded-sm p-1 my-2 pr-20 pl-3"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-purple-600 rounded-md text-white font-semibold p-2 mt-2 px-28"
          onClick={handleSubmit}
        >
          Sign up
        </button>
        <div className="flex gap-1 mt-2">
          <span className="text-sm mb-3">Already have an account?</span>
          <span className="text-sm text-purple-700 mb-3">
            <NavLink to={"/signin"}>Login </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}
