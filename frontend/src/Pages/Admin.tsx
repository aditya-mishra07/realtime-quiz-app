import { useEffect, useState } from "react";
import axios from "axios";
import { Quiz } from "@/types";
import AdminQuizCard from "@/components/Admin/AdminQuizCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WaitRoom from "./WaitRoom";
import { useSocket } from "@/hooks/useSocket";

export const Admin = () => {
  const [data, setData] = useState<Quiz[] | null>();

  const socket = useSocket();
  const [adminJoined, setAdminJoined] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [roomId, setRoomId] = useState<number | null>(null);

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
    if (!socket) {
      console.log("hello");
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {
        case "waiting":
          console.log("in waiting room");
        case "quiz_exists":
          console.log("quiz exists");
      }
    };
  }, [socket]);

  if (!adminJoined) {
    return (
      <div className="flex justify-center h-screen bg-gray-100">
        <Card className="w-[850px]">
          <CardHeader className="text-center">
            <CardTitle className=" text-purple-600">My Quizes</CardTitle>
          </CardHeader>
          <CardContent>
            {data &&
              data.map((quiz) => (
                <AdminQuizCard
                  key={quiz.id}
                  setAdminJoined={setAdminJoined}
                  id={quiz.id}
                  setRoomId={setRoomId}
                  title={quiz.title}
                  socket={socket}
                />
              ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return <WaitRoom />;
};
