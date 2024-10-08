import { Request, Response } from "express";
import {
  updateQuizModel,
  createQuizModel,
  getAllQuizModel,
  getAllQuestionsModel,
  deleteAllModel,
  getQuizByIdModel,
  getQuestionsByIdModel,
} from "../models/quiz.model";

const createQuiz = async (req: Request, res: Response) => {
  const { title } = req.body;

  const quiz = await createQuizModel(title);

  res.status(200).json({ id: quiz.id });
};

const updateQuiz = async (req: Request, res: Response) => {
  const data = req.body;
  const { id } = req.params;
  const numericId = parseInt(id, 10);

  const quiz = await updateQuizModel(numericId, data);

  if (!quiz) {
    res.status(411).json({ msg: "Wrong input- Quiz" });
  }

  res.status(200).json(quiz);
};

const getAllQuestions = async (req: Request, res: Response) => {
  const questions = await getAllQuestionsModel();
  if (!questions) {
    res.status(500).json({ msg: "unable to find any questions" });
  }

  res.status(200).json(questions);
};

const getAllQuiz = async (req: Request, res: Response) => {
  const quizes = await getAllQuizModel();
  res.status(200).json(quizes);
};

const getQuizById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const quiz = await getQuizByIdModel(id);
  res.status(200).json(quiz);
};

const getQuestionsById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const questions = await getQuestionsByIdModel(id);
  res.status(200).json(questions);
};

const deleteAll = async (req: Request, res: Response) => {
  const response = await deleteAllModel();
  if (!response) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
  res.status(200).json({ msg: "Deleted All the Data" });
};

export {
  createQuiz,
  updateQuiz,
  getAllQuiz,
  getAllQuestions,
  deleteAll,
  getQuizById,
  getQuestionsById,
};
