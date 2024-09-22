import { useEffect, useState } from "react";
import axios from "axios";
import { Question, Quiz } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WaitRoom from "../WaitRoom";
import { useSocket } from "@/hooks/useSocket.ts";
import { nanoid } from "nanoid";

export const Admin = () => {
  const [data, setData] = useState<Quiz[] | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [quizId, setQuizId] = useState<number | null>(null);
  const [adminJoined, setAdminJoined] = useState<boolean>(false);
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [players, setPlayers] = useState<{ username: string }[] | []>([]);

  const socket = useSocket();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/admin/quizes/getAllQuiz",
          { withCredentials: true }
        );
        setData(response.data);
        console.log(response.data);
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
          // console.log("activeUsers changed");
          setActiveUsers(message.activeUsers);
          setAdminJoined(true);
          setPlayers(message.players);
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

  useEffect(() => {
    if (roomId && socket) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/admin/quizes/getQuestionsById/${quizId}`,
            { withCredentials: true }
          );
          console.log(response.data);
          setQuestions(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchQuestions();
    }
  }, [roomId, socket]);

  const handleJoin = (id: number) => {
    if (socket) {
      setRoomId(nanoid(8));
      setQuizId(id);
    }
  };

  useEffect(() => {
    if (questions && socket && roomId) {
      socket.send(
        JSON.stringify({
          type: "admin_joined",
          roomId: roomId,
          questions: questions,
        })
      );
    }
  }, [questions, socket, roomId]);

  if (!adminJoined) {
    return (
      <div className="flex justify-center h-screen bg-gray-100">
        <Card className="w-[850px]">
          <CardHeader className="text-center">
            <CardTitle className="text-purple-600">My Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            {data &&
              data.map((quiz: Quiz) => (
                <div key={quiz.id} className="flex flex-col my-5">
                  <button
                    onClick={() => handleJoin(quiz?.id)}
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

  return (
    <WaitRoom
      socket={socket}
      activeUsers={activeUsers}
      adminJoined={adminJoined}
      roomId={roomId}
      players={players}
    />
  );
};
