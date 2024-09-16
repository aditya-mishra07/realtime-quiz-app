export default function Signup() {
  return (
    <div className="h-screen bg-purple-500 flex items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-white rounded-lg text-center p-10">
        <h1 className=" text-2xl mb-6 font-bold">Signup</h1>
        <input
          type="text"
          placeholder="Email"
          className="border-2 border-gray-200 rounded-sm p-1 my-2 pr-20 pl-3"
        />
        <input
          type="text"
          placeholder="Create password"
          className="border-2 border-gray-200 rounded-sm p-1 my-2 pr-20 pl-3"
        />
        <input
          type="text"
          placeholder="Confirm password"
          className="border-2 border-gray-200 rounded-sm p-1 my-2 pr-20 pl-3"
        />
        <button className="bg-purple-600 rounded-md text-white font-semibold p-2 mt-2 px-28">
          Signup
        </button>
        <div className="flex gap-1 mt-2">
          <span className="text-sm mb-3">Already have an account?</span>
          <span className="text-sm text-purple-700 mb-3">Login</span>
        </div>
      </div>
    </div>
  );
}
