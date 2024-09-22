import { Quiz } from "../Quiz";

export class QuizManager {
  private quizes: Quiz[];
  private static instance: QuizManager;

  constructor() {
    this.quizes = [];
  }

  static getInstance(): QuizManager {
    if (!QuizManager.instance) {
      QuizManager.instance = new QuizManager();
    }
    return QuizManager.instance;
  }

  getQuiz(roomId: string) {
    return this.quizes.find((x) => x.getRoomId() === roomId) ?? null;
  }

  addQuiz(roomId: string) {
    if (this.getQuiz(roomId)) {
      return;
    }
    const quiz = new Quiz(roomId);
    this.quizes.push(quiz);
  }
}
