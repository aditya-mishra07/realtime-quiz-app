import { nanoid } from "nanoid";
import { Question, User, Answer, state, Submission } from "./types";

export class Quiz {
  private roomId: number;
  private hasStarted: boolean;
  private questions: Question[];
  private users: User[];
  private currentQuestion: number;
  private currentState: state;

  constructor(roomId: number) {
    this.roomId = roomId;
    this.hasStarted = false;
    this.questions = [];
    this.users = [];
    this.currentQuestion = 0;
    this.currentState = "not_started";
  }

  public setCurrentQuestion(question: Question) {
    this.currentState = "question";
    question.submissions = [];
    question.startTime = new Date().getTime();

    // setTimeout(() => {
    //   this.showLeaderboard();
    // }, 30 * 1000);
    return question;
  }

  public getRoomId() {
    return this.roomId;
  }

  public addUser(username: string, userId: string) {
    const points: number = 0;
    this.users.push({ username, userId, points });
  }

  public removeUser(userId: string) {
    this.users.filter((user) => user.userId !== userId);
  }

  public addQuestion(question: Question) {
    this.questions.push(question);
  }

  public getUsers() {
    return this.users;
  }
  public getLeaderboard() {
    return this.users
      .sort((a, b) => (a.points < b.points ? 1 : -1))
      .slice(0, 10);
  }

  public start() {
    this.hasStarted = true;
    this.currentState = "question";
    return this.setCurrentQuestion(this.questions[0]);
  }

  public next() {}

  public getQuestions() {
    this.questions.forEach((question) => {
      console.log(question);
    });
  }

  public submit(submission: Submission) {
    const question = this.questions.find(
      (question) => question.id === submission.questionId
    );
    const user = this.users.find((user) => user.userId === submission.userId);
    if (!user || !question) {
      console.log("the user or the question doesn't exist");
      return;
    }

    question?.submissions.push({
      questionId: submission.questionId,
      userId: submission.userId,
      isCorrect: question.answer === submission.optionSelected,
      optionSelected: submission.optionSelected,
    });

    user.points +=
      1000 - (500 * (new Date().getTime() - question?.startTime)) / (30 * 1000);
  }

  public showLeaderboard() {
    this.currentState = "leaderboard";
    return this.getLeaderboard();
  }
}
