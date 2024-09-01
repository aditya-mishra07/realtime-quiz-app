import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createQuizModel(title: string) {
  return await prisma.quiz.create({
    data: {
      title,
    },
  });
}

async function updateQuizModel(id: any, data: any) {
  return await prisma.quiz.update({
    where: {
      id: id,
    },
    data: {
      questions: {
        create: {
          text: data.text,
          answer: data.answer,
          options: {
            create: data.options.map((option: any) => ({
              text: option.text,
              votes: 0,
            })),
          },
        },
      },
    },
    include: { questions: true },
  });
}

async function addQuestion(data: any) {
  const question = await prisma.question.create({
    data: {
      text: data.text,
      answer: data.answer,
      quizId: data.quizId,
      options: {
        create: data.options.map((option: any) => ({
          text: option.text,
          votes: 0,
        })),
      },
    },
  });

  return question;
}

async function getAllQuizModel() {
  return await prisma.quiz.findMany({
    include: { questions: true },
  });
}
async function getAllQuestionsModel() {
  return await prisma.question.findMany({
    include: { options: true },
  });
}

async function getQuestionsByIdModel(quizId: number) {
  return await prisma.question.findMany({
    where: { quizId: quizId },
    include: { options: true },
  });
}

export {
  createQuizModel,
  addQuestion,
  updateQuizModel,
  getAllQuizModel,
  getQuestionsByIdModel,
  getAllQuestionsModel,
};
