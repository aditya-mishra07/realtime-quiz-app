import { useEffect, useState } from "react";
import "./customCss.css";
import { useLocation } from "react-router-dom";
import Questions from "./Questions";
import { Question } from "@/Models/quiz";
import { nanoid } from "nanoid";
import { FaUser } from "react-icons/fa";
import AdminQuestion from "./Admin/AdminQuestion";
type Props = {
  socket: WebSocket | null;
  activeUsers: number | null;
  adminJoined: boolean;
  roomId: string | null;
  userId?: string;
  players: { username: string }[] | [];
};

export default function WaitRoom({
  socket,
  activeUsers,
  adminJoined,
  roomId,
  userId,
  players,
}: Props) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const location = useLocation();
  const [loadQuestion, setLoadQuestion] = useState<boolean>(false);
  const [question, setQuestion] = useState<Question | null>(null);
  let playerContent;
  useEffect(() => {
    if (location.pathname === "/admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [location.pathname]);
  useEffect(() => {
    console.log(players);
  }, []);
  useEffect(() => {
    if (!socket) {
      console.log("!socket");
      return;
    }

    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "question") {
        setLoadQuestion(true);
        setQuestion(message.question);
      }
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket]);

  const waiting_player = (
    <div className="flex items-center justify-center bg-white p-2 text shadow-md rounded-md">
      <div className="text-2xl mr-5 font-semibold">Waiting for players</div>
      <div className="loader flex space-x-2 mt-5">
        <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
        <div className=" w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
        <div className=" w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
      </div>
    </div>
  );

  if (activeUsers === 0) {
  } else if (activeUsers === 1 && players) {
    playerContent = (
      <div className="bg-white text-gray-800 rounded-sm p-2 flex items-center justify-center min-w-6">
        {players[0].username}
      </div>
    );
  } else {
    if (players) {
      playerContent = players.map((player) => (
        <div
          className="bg-white text-gray-800 rounded-sm shadow-md mx-2 p-2 text-lg min-w-20 text-center font-semibold"
          key={nanoid()}
        >
          {player.username}
        </div>
      ));
    }
  }

  const handleStartGame = () => {
    socket?.send(
      JSON.stringify({
        type: "started",
        roomId: roomId,
      })
    );
  };
  if (!loadQuestion) {
    return (
      <div className="h-screen w-full flex flex-col ">
        <div className="bg-blue-800 h-1/5 flex flex-col justify-center items-center">
          <div className="flex items-center justify-center bg-white p-2 shadow-lg rounded-md rounded-b-none">
            <h4 className="text-2xl font-bold">Game ID:</h4>
          </div>
          <div className="flex items-center justify-center bg-white p-2 shadow-lg rounded-md">
            <h3 className="text-5xl font-bold">{roomId}</h3>
          </div>
        </div>
        <div className="bg-blue-700 h-4/5 flex flex-col">
          <nav className="flex justify-between items-center p-4">
            <div className="flex-1"> </div>
            <div className="flex items-center gap-1">
              <FaUser className="text-white text-2xl" />
              <h4 className="text-2xl text-white">{activeUsers}</h4>
            </div>
          </nav>
          <div className="flex justify-center mt-32">{playerContent}</div>

          <div className="mt-36 flex items-center justify-center">
            {waiting_player}
          </div>
          {adminJoined ? (
            <div className="flex justify-center mt-20 ">
              <button
                className="bg-white p-2 rounded-lg text-lg font-semibold"
                onClick={handleStartGame}
              >
                Start Game
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    if (loadQuestion && !isAdmin && question) {
      return (
        <Questions
          question={question}
          roomId={roomId}
          socket={socket}
          userId={userId}
        />
      );
    } else {
      return (
        <AdminQuestion
          question={question}
          roomId={roomId}
          socket={socket}
          setQuestion={setQuestion}
        />
      );
    }
  }

  // if (!loadQuestion) {
  //   return (
  //     <div className="bg-white h-screen w-full">
  //       <div className="flex flex-col min-h-screen items-center">
  //         <div className="flex items-center justify-center mt-20">
  //           {isAdmin ? (
  //             <div className="text-5xl mr-5 text-gray-500">
  //               Enter the code to join the quiz: {roomId}
  //             </div>
  //           ) : (
  //             waiting_player
  //           )}
  //         </div>
  //         <div className="flex items-center justify-center mt-32 ml-20">
  //           {activeUsers == 0 && waiting_player}
  //         </div>
  //         <div className="flex flex-col items-center justify-center w-max">
  //           <h4 className="text-2xl font-semibold">Players</h4>
  //           <div className="flex justify-center items-center bg-purple-300 rounded-lg border-2 border-purple-950 p-4 w-full ">
  //             <div className="grid grid-cols-5 gap-5 p-2">{playerContent}</div>
  //           </div>
  //         </div>

  //         {adminJoined ? (
  //           <div className="flex justify-center mt-20 ">
  //             <Button onClick={handleStartGame}>Start Game</Button>
  //           </div>
  //         ) : null}
  //       </div>
  //     </div>
  //   );
}
