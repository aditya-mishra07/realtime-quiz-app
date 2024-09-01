"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.getAllQuestions = exports.getAllQuiz = exports.updateQuiz = exports.createQuiz = void 0;
const quiz_model_1 = require("../models/quiz.model");
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const quiz = (0, quiz_model_1.createQuizModel)(title);
    res.status(200).json(quiz);
});
exports.createQuiz = createQuiz;
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    // const question = await addQuestion(data);
    // if (!question) {
    //   res.status(411).json({ msg: "Wrong input- Question" });
    // }
    const quiz = yield (0, quiz_model_1.updateQuizModel)(numericId, data);
    if (!quiz) {
        res.status(411).json({ msg: "Wrong input- Quiz" });
    }
    res.status(200).json(quiz);
});
exports.updateQuiz = updateQuiz;
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield (0, quiz_model_1.getAllQuestionsModel)();
    if (!questions) {
        res.status(500).json({ msg: "unable to find any questions" });
    }
    res.status(200).json(questions);
});
exports.getAllQuestions = getAllQuestions;
const getAllQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quizes = yield (0, quiz_model_1.getAllQuizModel)();
    res.status(200).json(quizes);
});
exports.getAllQuiz = getAllQuiz;
const deleteAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, quiz_model_1.deleteAllModel)();
    if (!response) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
    res.status(200).json({ msg: "Deleted All the Data" });
});
exports.deleteAll = deleteAll;
