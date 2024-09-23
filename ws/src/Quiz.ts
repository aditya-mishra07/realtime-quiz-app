import { nanoid } from "nanoid";
import { Question, User, Answer, state, Submission, Result } from "./types";

export class Quiz {
  private roomId: string;
  private hasStarted: boolean;
  private questions: Question[];
  private users: User[];
  private currentQuestion: number;
  private currentState: state;
  private questionTimer: number;
  private result: Result;

  constructor(roomId: string) {
    this.roomId = roomId;
    this.hasStarted = false;
    this.questions = [];
    this.users = [];
    this.currentQuestion = 0;
    this.currentState = "not_started";
    this.questionTimer = 30;
    this.result = {};
  }

  public setCurrentQuestion(question: Question) {
    this.currentState = "question";
    question.submissions = [];
    question.startTime = new Date().getTime();
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

  public next() {
    this.currentQuestion++;
    this.currentState = "question";
    return this.setCurrentQuestion(this.questions[this.currentQuestion]);
  }

  public checkGameEnded(): boolean {
    if (this.currentQuestion > this.questions.length - 1) {
      return true;
    }
    return false;
  }

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

    if (question.answer === submission.optionSelected) {
      if (!user.streak) {
        user.streak = [];
      }
      user.streak?.push(1);
    }

    if (question.answer !== submission.optionSelected) {
      user.streak = [];
    }

    question?.submissions.push({
      questionId: submission.questionId,
      userId: submission.userId,
      isCorrect: question.answer === submission.optionSelected,
      optionSelected: submission.optionSelected,
    });
    if (question.answer === submission.optionSelected) {
      user.roundPoints =
        (1 -
          (new Date().getTime() - question?.startTime) /
            1000 /
            (this.questionTimer * 2)) *
        1000;
      user.points += user.roundPoints;
    }
    this.currentState = "leaderboard";
  }

  public getResult(userId: string) {
    const user = this.users.find((user) => user.userId === userId);
    const users = this.users.sort((a, b) => (a.points < b.points ? 1 : -1));
    const position = users.findIndex((user) => user.userId === userId) + 1;
    this.result.position = position;
    if (user && !user.streak) {
      user.streak = [];
    }
    this.result.userinfo = user;
    return this.result;
  }

  public showLeaderboard() {
    this.currentState = "leaderboard";
    return this.getLeaderboard();
  }
}
