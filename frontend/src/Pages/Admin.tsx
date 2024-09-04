import { useEffect, useState } from "react";
import axios from "axios";
import { Quiz } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WaitRoom from "./WaitRoom";
import { useSocket } from "../hooks/useSocket.ts";

export const Admin = () => {
  const [data, setData] = useState<Quiz[] | null>(null);
  const [roomId, setRoomId] = useState<number | null>(null);
  const [adminJoined, setAdminJoined] = useState<boolean>(false);
  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const socket = useSocket();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/api/quizes/getAllQuiz"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "waiting_room":
          setActiveUsers(message.activeUsers);
          setAdminJoined(true);
          break;
        case "quiz_exists":
          console.log("quiz exists");
          break;
        default:
          break;
      }
    };

    socket.addEventListener("message", handleSocketMessage);

    return () => {
      socket.removeEventListener("message", handleSocketMessage);
    };
  }, [socket]);

  const handleJoin = (id: number, title: string) => {
    if (socket) {
      setRoomId(id);
      console.log("hello");
      socket.send(
        JSON.stringify({
          type: "admin_joined",
          roomId: id,
        })
      );
    }
  };

  if (!adminJoined) {
    return (
      <div className="flex justify-center h-screen bg-gray-100">
        <Card className="w-[850px]">
          <CardHeader className="text-center">
            <CardTitle className="text-purple-600">My Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            {data &&
              data.map((quiz: any) => (
                <div key={quiz.id} className="flex flex-col my-5">
                  <button
                    onClick={() => handleJoin(quiz.id, quiz.title)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    {quiz.title}
                  </button>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return <WaitRoom socket={socket} activeUsers={activeUsers} />;
};
