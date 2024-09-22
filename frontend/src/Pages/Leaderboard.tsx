import { FaUser } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
const Leaderboard = () => {
  return (
    <div className=" flex flex-col bg-slate-300 h-screen w-full justify-center items-center">
      <div className=" flex flex-col bg-slate-300 rounded-xl shadow-lg items-center min-h-80 min-w-60">
        <div className="flex items-center mb-14">
          <h4 className=" font-semibold text-4xl mr-4">Leaderboard Results</h4>
          <IoRocketSharp className="text-white text-4xl" />
        </div>
        <div className=" bg-white rounded-lg shadow-sm flex justify-between gap-5 p-2 py-4 mx-6 pl-4">
          <h2 className="font-semibold text-xl">1.</h2>
          <h2 className="font-semibold text-xl mr-32">MessiLingard</h2>
          <h2 className="font-semibold text-xl mr-24">450</h2>
          <div className=" mr-2">
            <FaUser className="text-black text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
