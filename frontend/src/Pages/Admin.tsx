import { useEffect, useState } from "react";
import axios from "axios";
import { Quiz } from "@/types";
import AdminQuizCard from "@/components/Admin/AdminQuizCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Admin = () => {
  const [data, setData] = useState<Quiz[] | null>();

  const [adminJoined, setAdminJoined] = useState<boolean>(false);

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
                  setAdminJoined={setAdminJoined}
                  title={quiz.title}
                />
              ))}
          </CardContent>
        </Card>
      </div>
    );
  }
};
