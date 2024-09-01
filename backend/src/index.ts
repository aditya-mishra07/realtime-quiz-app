import express from "express";
import router from "./routes/quiz.route";

const app = express();

app.use(express.json());

app.use("/admin/api/quizes", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
