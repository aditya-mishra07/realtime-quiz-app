import PositionEnding from "@/components/Result/PositionEnding";
import { HiOutlineXCircle } from "react-icons/hi";
import { useState, useEffect } from "react";
import { Question } from "@/Models/quiz";
import Questions from "./Questions";

type WrongProps = {
  position: number;
  socket: WebSocket | null;
  roomId: number | null;
  userId?: string;
};

export default function Wrong({
  position,
  socket,
  roomId,
  userId,
}: WrongProps) {
  const suffix = PositionEnding(position);
  const [nextQuestion, setNextQuestion] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    socket?.send(
      JSON.stringify({
        type: "fetchQuestion",
        roomId: roomId,
        userId: userId,
      })
    );
    setTimeout(() => {
      setNextQuestion(true);
    }, 10000);
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "nextQuestion") {
        console.log(message);
        setQuestion(message.question);
      }
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket]);

  if (!nextQuestion) {
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
}
