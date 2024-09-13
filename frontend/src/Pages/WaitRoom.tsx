import { useEffect, useState } from "react";
import "./customCss.css";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Questions from "./Questions";
import { Question } from "@/types";

type Props = {
  socket: WebSocket | null;
  activeUsers: number | null;
  adminJoined: boolean;
  roomId: number | null;
  userId?: string;
};

export default function WaitRoom({
  socket,
  activeUsers,
  adminJoined,
  roomId,
  userId,
}: Props) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const location = useLocation();
  const [loadQuestion, setLoadQuestion] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question | null>(null);
  useEffect(() => {
    if (location.pathname === "/admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!socket) {
      console.log("!socket");
      return;
    }

    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "question" && !adminJoined) {
        setLoadQuestion(true);
        setQuestion(message.question);
      }
      // if (message.type === "question" && adminJoined) {
      //   return;
      // }
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket]);
  // TODO: listen for started event to get the question
  // useEffect(() => {
  //   if (!socket) {
  //     return;
  //   }

  // }, [socket]);

  const handleStartGame = () => {
    console.log("");
    socket?.send(
      JSON.stringify({
        type: "started",
        roomId: roomId,
      })
    );
  };
  if (!loadQuestion) {
    return (
      <div className="bg-white">
        <div className="flex flex-col h-screen">
          <div className=" flex justify-center mt-32">
            <div className="flex gap-3 text-6xl mb-32 font-light">
              <p>Question</p> <p className=" font-medium">{currentQuestion}</p>{" "}
              <p>of</p> <p className=" font-medium">4</p>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4">
            <div className=" text-5xl mr-5">Waiting for players</div>
            <div className="loader flex space-x-3 mt-8">
              <div className="w-4 h-4 bg-gray-800 rounded-full animate-bounce"></div>
              <div className=" w-4 h-4 bg-gray-800 rounded-full animate-bounce"></div>
              <div className=" w-4 h-4 bg-gray-800 rounded-full animate-bounce"></div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-16">
            {activeUsers === 1 ? (
              <div className=" text-2xl mr-5">
                {activeUsers} player is ready!
              </div>
            ) : (
              <div className=" text-2xl mr-5">
                {activeUsers} players are ready!
              </div>
            )}
          </div>
          {adminJoined ? (
            <div className="flex justify-center mt-4 ">
              <Button variant="destructive" onClick={handleStartGame}>
                Start Game
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <Questions
        question={question}
        roomId={roomId}
        socket={socket}
        userId={userId}
      />
    );
  }
}
