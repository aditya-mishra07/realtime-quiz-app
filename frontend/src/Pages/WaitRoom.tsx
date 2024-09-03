import { useEffect, useState } from "react";
import "./customCss.css";

type Props = {
  socket: WebSocket | null;
};

export default function WaitRoom({ socket }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [players, setPlayers] = useState<number>(0);

  useEffect(() => {
    if (!socket) {
      console.log("!socket");
      return;
    }

    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (message.type === "waiting_room") {
        setPlayers(message.activeUsers);
      }
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket]);

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
          <div className=" text-2xl mr-5">{players} players are ready!</div>
        </div>
      </div>
    </div>
  );
}
