import { nanoid } from "nanoid";
import { Question, User, Answer } from "./types";

export class Quiz {
  private roomId: number;
  private hasStarted: boolean;
  private questions: Question[];
  private users: User[];
  private currentQuestion: number;

  constructor(roomId: number) {
    this.roomId = roomId;
    this.hasStarted = false;
    this.questions = [];
    this.users = [];
    this.currentQuestion = 0;
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
