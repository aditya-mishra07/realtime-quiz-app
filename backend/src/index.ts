import express from "express";
import quizRouter from "./routes/quiz.route";
import cors from "cors";
import openaiRouter from "./routes/openai.route";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/admin/api/quizes", quizRouter);
app.use("/openai/api", openaiRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
