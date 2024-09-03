import { QuizManager } from "./QuizManager";
import WebSocket from "ws";

export class UserManager {
  private quizManager: QuizManager;
  private activeUsers: number;

  constructor() {
    this.quizManager = QuizManager.getInstance();
    this.activeUsers = 0;
  }

  addUser(socket: WebSocket) {
    this.createHandlers(socket);
  }

  private createHandlers(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      console.log(message);
      if (message.type === "player_joined") {
        this.userHandler(socket, message);
      }
      if (message.type === "admin_joined") {
        this.adminHandler(socket, message);
      }
    });
  }

  adminHandler(socket: WebSocket, message: { roomId: number }) {
    if (this.quizManager.getQuiz(message.roomId)) {
      socket.send(
        JSON.stringify({
          type: "quiz_exists",
        })
      );
    } else {
      this.quizManager.addQuiz(message.roomId);
      socket.send(
        JSON.stringify({
          type: "waiting_room",
          activeUsers: this.activeUsers,
        })
      );
    }
  }

  userHandler(
    socket: WebSocket,
    message: { username: string; roomId: number }
  ) {
    if (this.quizManager.getQuiz(message.roomId)) {
      this.activeUsers++;
      socket.send(
        JSON.stringify({
          type: "waiting_room",
          activeUsers: this.activeUsers,
        })
      );
    } else {
      console.log("incorrect id");
      socket.send(
        JSON.stringify({
          type: "incorrect_id",
        })
      );
    }
  }
}
