import { HiCheckCircle } from "react-icons/hi";
import { BsFire } from "react-icons/bs";
import { Question, User } from "@/Models/quiz";
import PositionEnding from "@/components/Result/PositionEnding";
import { useEffect, useState } from "react";
import Questions from "./Questions";
import Leaderboard from "./Leaderboard";

type RightProps = {
  userinfo: User;
  position: number;
  socket: WebSocket | null;
  roomId: string | null;
  userId?: string;
};

export default function Right({
  userinfo,
  position,
  socket,
  userId,
  roomId,
}: RightProps) {
  const suffix = PositionEnding(position);
  const [nextQuestion, setNextQuestion] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  useEffect(() => {
    if (!socket) return;
    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "nextQuestion") {
        setQuestion(message.question);
        setNextQuestion(true);
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

  if (!nextQuestion && !showLeaderboard) {
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
            +{Math.round(userinfo.points)}
          </div>
          <h5 className="text-white text-lg font-semibold mt-2">
            You're in {position}
            {suffix} place
          </h5>
        </div>
      </div>
    );
  }

  if (nextQuestion && question) {
    return (
      <Questions
        question={question}
        roomId={roomId}
        socket={socket}
        userId={userId}
      />
    );
  }

  if (showLeaderboard && users) {
    console.log(showLeaderboard);
    return (
      <Leaderboard
        socket={socket}
        isAdmin={false}
        roomId={roomId}
        users={users}
        userId={userId}
      />
    );
  }
}
