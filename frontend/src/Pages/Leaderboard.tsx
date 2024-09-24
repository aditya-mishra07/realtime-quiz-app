import { Question, User } from "@/Models/quiz";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoRocketSharp } from "react-icons/io5";
import AdminQuestion from "./Admin/AdminQuestion";
import Questions from "./Questions";

type Props = {
  users: User[] | null;
  isAdmin: boolean;
  question?: Question | null;
  roomId: string | null;
  socket: WebSocket | null;
  setQuestion?: React.Dispatch<React.SetStateAction<Question | null>>;
  userId?: string;
};

const Leaderboard = ({
  users,
  setQuestion,
  question,
  isAdmin,
  socket,
  roomId,
  userId,
}: Props) => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [nextQuestion, setNextQuestion] = useState<Question | null>(null);
  useEffect(() => {
    if (!socket) return;
    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "nextQuestion") {
        setNextQuestion(message.question);
        setShowQuestion(true);
      }
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket]);
  useEffect(() => {
    if (isAdmin) {
      setTimeout(() => {
        setShowQuestion(true);
      }, 10000);
    }
  }, []);
  if (!showQuestion) {
    return (
      <div className=" flex flex-col bg-slate-300 h-screen w-full justify-center items-center">
        <div className=" flex flex-col bg-slate-300 rounded-xl shadow-lg items-center min-h-80 min-w-60">
          <div className="flex items-center mb-14">
            <h4 className=" font-semibold text-4xl mr-4">
              Leaderboard Results
            </h4>
            <IoRocketSharp className="text-white text-4xl" />
          </div>
          {users &&
            users.map((user, index) => (
              <div className=" bg-white rounded-lg shadow-sm flex justify-between gap-5 p-2 py-4 mx-6 my-2 pl-4 w-[32rem] h-[4rem] overflow-hidden">
                <h2 className="font-semibold text-xl w-8">{++index}.</h2>
                <h2 className="font-semibold text-xl w-40">{user.username}</h2>
                <h2 className="font-semibold text-xl w-24">{user.points}</h2>
                <div className=" w-8">
                  <FaUser className="text-black text-2xl" />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  } else {
    if (isAdmin && question && setQuestion)
      return (
        <AdminQuestion
          question={question}
          setQuestion={setQuestion}
          roomId={roomId}
          socket={socket}
        />
      );
    if (!isAdmin && showQuestion) {
      <Questions
        question={nextQuestion}
        roomId={roomId}
        socket={socket}
        userId={userId}
      />;
    }
  }
};

export default Leaderboard;
