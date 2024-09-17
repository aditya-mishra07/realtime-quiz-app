import express from "express";
import quizRouter from "./routes/quiz.route";
import cors from "cors";
import openaiRouter from "./routes/openai.route";
import authRouter from "./routes/auth.route";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/admin/quizes", quizRouter);
app.use("/api/v1/admin/auth", authRouter);
app.use("/api/v1/openai", openaiRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
