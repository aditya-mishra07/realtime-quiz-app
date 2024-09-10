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
exports.createQuizModel = createQuizModel;
exports.addQuestion = addQuestion;
exports.updateQuizModel = updateQuizModel;
exports.getAllQuizModel = getAllQuizModel;
exports.getQuestionsByIdModel = getQuestionsByIdModel;
exports.getAllQuestionsModel = getAllQuestionsModel;
exports.deleteAllModel = deleteAllModel;
exports.getQuizByIdModel = getQuizByIdModel;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createQuizModel(title) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.quiz.create({
            data: {
                title,
            },
        });
    });
}
function updateQuizModel(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.quiz.update({
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
        const question = yield prisma.question.create({
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
        return yield prisma.quiz.findMany({
            include: { questions: true },
        });
    });
}
function getQuizByIdModel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.quiz.findMany({
            where: { id: id },
            include: { questions: true },
        });
    });
}
function getAllQuestionsModel() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.question.findMany({
            include: { options: true },
        });
    });
}
function getQuestionsByIdModel(quizId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.question.findMany({
            where: { quizId: quizId },
            include: { options: true },
        });
    });
}
function deleteAllModel() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.option.deleteMany();
        yield prisma.question.deleteMany();
        yield prisma.user.deleteMany();
        return yield prisma.quiz.deleteMany();
    });
}
