import {
  updateQuizModel,
  createQuizModel,
  getAllQuizModel,
  getAllQuestionsModel,
  deleteAllModel,
} from "../models/quiz.model";

const createQuiz = async (req: any, res: any) => {
  const { title } = req.body;

  const quiz = createQuizModel(title);

  res.status(200).json(quiz);
};

const updateQuiz = async (req: any, res: any) => {
  const data = req.body;
  const { id } = req.params;
  const numericId = parseInt(id, 10);

  const quiz = await updateQuizModel(numericId, data);

  if (!quiz) {
    res.status(411).json({ msg: "Wrong input- Quiz" });
  }

  res.status(200).json(quiz);
};

const getAllQuestions = async (req: any, res: any) => {
  const questions = await getAllQuestionsModel();
  if (!questions) {
    res.status(500).json({ msg: "unable to find any questions" });
  }

  res.status(200).json(questions);
};

const getAllQuiz = async (req: any, res: any) => {
  const quizes = await getAllQuizModel();
  res.status(200).json(quizes);
};

const deleteAll = async (req: any, res: any) => {
  const response = await deleteAllModel();
  if (!response) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
  res.status(200).json({ msg: "Deleted All the Data" });
};

export { createQuiz, updateQuiz, getAllQuiz, getAllQuestions, deleteAll };
