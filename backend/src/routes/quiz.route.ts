import express from "express";
import {
  createQuiz,
  getAllQuestions,
  getAllQuiz,
  updateQuiz,
} from "../controllers/quiz.controller";

const router = express.Router();

router.post("/createQuiz", createQuiz);
router.put("/updateQuiz/:id", updateQuiz);
router.get("/getAllQuiz", getAllQuiz);
router.get("/getAllQuestions", getAllQuestions);
export default router;
