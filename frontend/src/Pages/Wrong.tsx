import PositionEnding from "@/components/Result/PositionEnding";
import { User } from "@/types";
import { HiOutlineXCircle } from "react-icons/hi";

type WrongProps = {
  userinfo?: User;
  position: number;
};

export default function Wrong({ userinfo, position }: WrongProps) {
  const suffix = PositionEnding(position);

  return (
    <div className=" h-screen bg-pink-600">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl text-white font-semibold mt-40 mb-4">
          Incorrect
        </h1>
        <HiOutlineXCircle className=" size-32" color="white" />
        <h3 className=" text-white text-2xl mt-4 mr-2 font-semibold">
          {" "}
          Answer Streak Lost
        </h3>
        <div className="bg-pink-800 text-white text-2xl font-semibold p-3 px-20 mt-5 rounded-sm">
          Lock it in!
        </div>
        <h5 className="text-white text-lg font-semibold mt-2">
          You're in {position}
          {suffix} place
        </h5>
      </div>
    </div>
  );
}
