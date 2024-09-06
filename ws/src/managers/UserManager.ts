import { Message, Question, User } from "../types";
import { QuizManager } from "./QuizManager";
import WebSocket from "ws";

export class UserManager {
  private quizManager: QuizManager;
  private sockets: Set<WebSocket>;

  constructor() {
    this.quizManager = QuizManager.getInstance();
    this.sockets = new Set();
  }

  checkUserLeft(socket: WebSocket) {
    socket.on("close", (data) => {
      this.sockets.delete(socket);
      const message = JSON.parse(data.toString());
      this.quizManager.getQuiz(message.id)?.removeUser(message.userId);
      let activeUsers: number | undefined = 0;
      if (message.id) {
        activeUsers = this.getActiveUsers(message.id);
      }

      this.broadcast({
        type: "user_left",
        activeUsers: activeUsers,
      });
    });
  }

  addUser(socket: WebSocket) {
    this.sockets.add(socket);
    this.createHandlers(socket);

    this.checkUserLeft(socket);
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

      socket.on("message", (data) => {
        const message = JSON.parse(data.toString());
        if (message.type === "started") {
          const question = this.quizManager.getQuiz(message.roomId)?.start();
          this.broadcast({
            type: "start",
            question: question,
            roomId: message.roomId,
          });
        }
      });
    }
  }

  userHandler(socket: WebSocket, message: Message) {
    if (this.quizManager.getQuiz(message.roomId)) {
      this.addUserToQuiz(message, socket);
      this.sendQuestion(socket);
      this.submitAnswer(socket);
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

  private addUserToQuiz(message: Message, socket: WebSocket) {
    if (message.username && message.userId) {
      this.quizManager
        .getQuiz(message.roomId)
        ?.addUser(message.username, message.userId);
      this.broadcast({
        type: "waiting_room",
        activeUsers: this.getActiveUsers(message),
      });
    }
  }

  private sendQuestion(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.type == "start") {
        socket.send(
          JSON.stringify({
            type: "question",
            question: this.quizManager.getQuiz(message.roomId)?.start(),
          })
        );
      }
    });
  }

  private submitAnswer(socket: WebSocket) {
    socket.on("message", (data) => {});
  }

  private getActiveUsers(message: Message) {
    if (!message.roomId) return;
    const users: User[] | undefined = this.quizManager
      .getQuiz(message.roomId)
      ?.getUsers();

    return users?.length;
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
