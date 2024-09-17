import express from "express";
import {
  createQuiz,
  deleteAll,
  getAllQuestions,
  getAllQuiz,
  updateQuiz,
  getQuizById,
  getQuestionsById,
} from "../controllers/quiz.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.use(authMiddleware);
router.post("/createQuiz", createQuiz);
router.put("/updateQuiz/:id", updateQuiz);
router.get("/getAllQuiz", getAllQuiz);
router.get("/getQuizById/:id", getQuizById);
router.get("/getQuestionsById/:id", getQuestionsById);
router.get("/getAllQuestions", getAllQuestions);
router.delete("/deleteAll", deleteAll);
export default router;
