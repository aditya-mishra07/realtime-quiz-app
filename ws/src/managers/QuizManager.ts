import { Quiz } from "../Quiz";

export class QuizManager {
  private quizes: Quiz[];

  constructor() {
    this.quizes = [];
  }

  addQuiz(roomId: number) {
    this.quizes.push(new Quiz(roomId));
  }

  //?
  existingQuiz(roomId: number) {
    const existing = this.quizes.find((quiz) => quiz.getRoomId() === roomId);
    return existing;
  }
}
