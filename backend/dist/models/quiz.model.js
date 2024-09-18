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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuizModel = createQuizModel;
exports.addQuestion = addQuestion;
exports.updateQuizModel = updateQuizModel;
exports.getAllQuizModel = getAllQuizModel;
exports.getQuestionsByIdModel = getQuestionsByIdModel;
exports.getAllQuestionsModel = getAllQuestionsModel;
exports.deleteAllModel = deleteAllModel;
exports.getQuizByIdModel = getQuizByIdModel;
const db_1 = __importDefault(require("../db/db"));
function createQuizModel(title) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.default.quiz.create({
            data: {
                title,
            },
        });
    });
}
function updateQuizModel(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.default.quiz.update({
            where: {
                id: id,
            },
            data: {
                questions: {
                    create: {
                        text: data.text,
                        answer: data.answer,
                        options: {
                            create: data.options.map((option) => ({
                                text: option.text,
                                votes: 0,
                            })),
                        },
                    },
                },
            },
            include: { questions: true },
        });
    });
}
function addQuestion(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const question = yield db_1.default.question.create({
            data: {
                text: data.text,
                answer: data.answer,
                quizId: data.quizId,
                options: {
                    create: data.options.map((option) => ({
                        text: option.text,
                        votes: 0,
                    })),
                },
            },
        });
        return question;
    });
}
function getAllQuizModel() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.default.quiz.findMany({
            include: { questions: true },
        });
    });
}
function getQuizByIdModel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.default.quiz.findMany({
            where: { id: id },
            include: { questions: true },
        });
    });
}
function getAllQuestionsModel() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.default.question.findMany({
            include: { options: true },
        });
    });
}
function getQuestionsByIdModel(quizId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.default.question.findMany({
            where: { quizId: quizId },
            include: { options: true },
        });
    });
}
function deleteAllModel() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.option.deleteMany();
        yield db_1.default.question.deleteMany();
        yield db_1.default.user.deleteMany();
        return yield db_1.default.quiz.deleteMany();
    });
}
