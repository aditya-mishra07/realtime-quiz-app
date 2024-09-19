import express from "express";
import quizRouter from "./routes/quiz.route";
import cors from "cors";
import openaiRouter from "./routes/openai.route";
import authRouter from "./routes/auth.route";
import cookieParser from "cookie-parser";
import "express-async-errors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/admin/quizes", quizRouter);
app.use("/api/v1/admin/auth", authRouter);
app.use("/api/v1/openai", openaiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
