import { nanoid } from "nanoid";
import { Question, User, Answer, state } from "./types";

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
    this.currentQuestion = 0;
  }

  public start() {
    this.currentState = "question";
    return this.questions[this.currentQuestion];
  }

  public setCurrentState(currentState: state) {
    this.currentState = currentState;
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

  public getQuestion(currentQuestion: number) {
    return this.questions[currentQuestion];
  }

  public getUsers() {
    return this.users;
  }
}
