import { Question } from "@/types";
import { nanoid } from "nanoid";

type Props = {
  question: Question | null;
  roomId: string | null;
  socket: WebSocket | null;
};
const AdminQuestion = ({ question, roomId, socket }: Props) => {
  return (
    <div className=" flex flex-col justify-center items-center h-screen w-full bg-purple-500">
      <div className="flex flex-col min-h-64 min-w-80 bg-white rounded-lg px-20 shadow-lg">
        <div className="text-gray-600 text-3xl font-semibold my-5">
          <h4>{question?.text}</h4>
        </div>
        {question?.options.map((option) => (
          <div
            key={nanoid()}
            className="shadow-md rounded-3xl p-4 mt-4 my-2 "
            role="button"
          >
            {option.text}
          </div>
        ))}
        <div className="flex items-center mt-20 justify-center">
          <button className=" bg-purple-500 p-2 text-white text-center rounded-lg font-medium m-2">
            Next Question
          </button>
          <button className=" bg-purple-500 p-2 text-white text-center rounded-lg font-medium m-2">
            Show Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestion;
