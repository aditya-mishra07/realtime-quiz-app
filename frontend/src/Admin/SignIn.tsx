export default function SignIn() {
  return (
    <div className="h-screen bg-purple-500 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-white rounded-lg text-center p-10">
        <h1 className=" text-2xl mb-6 font-bold">Login</h1>
        <input
          type="text"
          placeholder="Email"
          className="border-2 border-gray-200 rounded-sm p-1 mb-3 pr-16 pl-3"
        />
        <input
          type="text"
          placeholder="Password"
          className="border-2 border-gray-200 rounded-sm p-1 mb-3 pr-16 pl-3"
        />
        <span className="text-sm text-purple-700 mb-3">Forgot password?</span>
        <button className="bg-purple-600 rounded-md text-white font-semibold p-2 px-28">
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
