import { useAuth } from "@/context/useAuth";
import { useState } from "react";

export default function SignIn() {
  const { signin } = useAuth();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = () => {
    if (username && password) {
      signin(username, password);
    } else {
      console.log("please enter username and password!");
    }
  };
  return (
    <div className="h-screen bg-purple-500 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-white rounded-lg text-center p-10">
        <h1 className=" text-2xl mb-6 font-bold">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="border-2 border-gray-200 rounded-sm p-1 mb-3 pr-16 pl-3"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          className="border-2 border-gray-200 rounded-sm p-1 mb-3 pr-16 pl-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="text-sm text-purple-700 mb-3">Forgot password?</span>
        <button
          className="bg-purple-600 rounded-md text-white font-semibold p-2 px-28"
          onClick={handleSubmit}
        >
          Login
        </button>
        <div className="flex gap-1 mt-2">
          <span className="text-sm mb-3">Don't have an account?</span>
          <span className="text-sm text-purple-700 mb-3">Signup</span>
        </div>
      </div>
    </div>
  );
}
