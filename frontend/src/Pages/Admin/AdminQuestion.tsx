import { Question, User } from "@/Models/quiz";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Leaderboard from "../Leaderboard";

type Props = {
  question: Question | null;
  roomId: string | null;
  socket: WebSocket | null;
  setQuestion: React.Dispatch<React.SetStateAction<Question | null>>;
};

const AdminQuestion = ({ question, roomId, socket, setQuestion }: Props) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "nextQuestion") {
        console.log("message");
        setQuestion(message.question);
      }
      if (message.type === "showLeaderboard") {
        setUsers(message.users);
        setShowLeaderboard(true);
      }
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket]);
  const handleNextQuestion = () => {
    socket?.send(
      JSON.stringify({
        type: "next",
        roomId: roomId,
      })
    );
  };

  const handleShowLeaderboard = () => {
    socket?.send(
      JSON.stringify({
        type: "leaderboard",
        roomId: roomId,
      })
    );
  };

  if (!showLeaderboard) {
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
            <button
              className=" bg-purple-500 p-2 text-white text-center rounded-lg font-medium m-2"
              onClick={handleNextQuestion}
            >
              Next Question
            </button>
            <button
              className=" bg-purple-500 p-2 text-white text-center rounded-lg font-medium m-2"
              onClick={handleShowLeaderboard}
            >
              Show Leaderboard
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <Leaderboard users={users} />;
  }
};

export default AdminQuestion;
