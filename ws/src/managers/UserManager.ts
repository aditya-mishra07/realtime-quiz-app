import { Message, Question } from "../types";
import { QuizManager } from "./QuizManager";
import WebSocket from "ws";

export class UserManager {
  private quizManager: QuizManager;
  private sockets: Set<WebSocket>;

  constructor() {
    this.quizManager = QuizManager.getInstance();
    this.sockets = new Set();
  }

  addUser(socket: WebSocket) {
    this.sockets.add(socket);
    this.createHandlers(socket);

    socket.on("close", (data) => {
      this.sockets.delete(socket);
      const message = JSON.parse(data.toString());
      this.quizManager.getQuiz(message.id)?.removeUser(message.userId);
      const activeUsers = this.getActiveUsers(message.id);
      this.broadcast({
        type: "user_left",
        activeUsers: activeUsers,
      });
    });
  }

  private createHandlers(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === "player_joined") {
        this.userHandler(socket, message);
      }
      if (message.type === "admin_joined") {
        this.adminHandler(socket, message);
      }
    });
  }

  adminHandler(socket: WebSocket, message: Message) {
    if (this.quizManager.getQuiz(message.roomId)) {
      socket.send(
        JSON.stringify({
          type: "quiz_exists",
        })
      );
    } else {
      this.createQuiz(message);
      socket.send(
        JSON.stringify({
          type: "waiting_room",
          id: message.roomId,
        })
      );

      // socket.on("message", (data) => {});
    }
  }

  userHandler(socket: WebSocket, message: Message) {
    if (this.quizManager.getQuiz(message.roomId)) {
      this.addUserToQuiz(message);
      this.broadcast({
        type: "waiting_room",
        activeUsers: this.getActiveUsers(message),
      });
    } else {
      console.log("incorrect id");
      socket.send(
        JSON.stringify({
          type: "incorrect_id",
        })
      );
    }
  }

  private createQuiz(message: Message) {
    this.quizManager.addQuiz(message.roomId);
    message.payload?.map((question: Question) => {
      this.quizManager.getQuiz(message.roomId)?.addQuestion(question);
    });
  }

  private addUserToQuiz(message: Message) {
    if (message.username && message.userId) {
      this.quizManager
        .getQuiz(message.roomId)
        ?.addUser(message.username, message.userId);
    }
  }

  private getActiveUsers(message: Message) {
    if (!message.roomId) return;

    return this.quizManager.getQuiz(message.roomId)?.getUsers.length;
  }

  private broadcast(data: object) {
    const message = JSON.stringify(data);
    this.sockets.forEach((socket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    });
  }
}
