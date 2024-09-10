"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quiz_controller_1 = require("../controllers/quiz.controller");
const router = express_1.default.Router();
router.post("/createQuiz", quiz_controller_1.createQuiz);
router.put("/updateQuiz/:id", quiz_controller_1.updateQuiz);
router.get("/getAllQuiz", quiz_controller_1.getAllQuiz);
router.get("/getQuizById/:id", quiz_controller_1.getQuizById);
router.get("/getQuestionsById/:id", quiz_controller_1.getQuestionsById);
router.get("/getAllQuestions", quiz_controller_1.getAllQuestions);
router.delete("/deleteAll", quiz_controller_1.deleteAll);
exports.default = router;
