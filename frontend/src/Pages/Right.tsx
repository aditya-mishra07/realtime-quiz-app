import { HiCheckCircle } from "react-icons/hi";
import { BsFire } from "react-icons/bs";
import { User } from "@/types";
import PositionEnding from "@/components/Result/PositionEnding";

type RightProps = {
  userinfo: User;
  position: number;
};

export default function Right({ userinfo, position }: RightProps) {
  const suffix = PositionEnding(position);
  return (
    <div className="h-screen bg-green-600 font-sans">
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white font-semibold mt-40 mb-4">
          Correct
        </h1>
        <HiCheckCircle className=" size-32" color="white" />
        <div className="flex justify-center items-center mt-2">
          <h3 className=" text-white text-2xl mt-4 mr-2 font-semibold">
            {" "}
            Answer Streak:
          </h3>
          <h3 className="text-white text-xl mt-4 font-semibold">
            {userinfo.streak?.length}
          </h3>
          <BsFire color="orange" size={"20px"} className="mt-4" />
        </div>

        <div className="bg-green-800 text-white text-2xl font-semibold p-3 px-20 mt-5 rounded-sm">
          +{userinfo.points}
        </div>
        <h5 className="text-white text-lg font-semibold mt-2">
          You're in {position}
          {suffix} place
        </h5>
      </div>
    </div>
  );
}
