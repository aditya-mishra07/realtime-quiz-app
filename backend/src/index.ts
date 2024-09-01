import express from "express";
import router from "./routes/quiz.route";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/admin/api/quizes", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
