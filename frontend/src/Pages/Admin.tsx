import { useEffect, useState } from "react";
import axios from "axios";
import { Quiz } from "@/types";

export const Admin = () => {
  const [data, setData] = useState<Quiz[]>();

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
  return(
    {
      data.map((data) => <div>
        
      </div>)
    }
  );
};
