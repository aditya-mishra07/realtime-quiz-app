import { QuizManager } from "./QuizManager";
import WebSocket from "ws";

export class UserManager {
  private quizManager: QuizManager;

  constructor() {
    this.quizManager = new QuizManager();
  }

  addUser(socket: WebSocket) {
    this.createHandlers(socket);
  }

  private createHandlers(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === "admin_joined") {
        console.log("joined");
        if (this.quizManager.existingQuiz(message.roomId)) {
          socket.send(
            JSON.stringify({
              type: "quiz_exists",
            })
          );
        } else {
          this.quizManager.addQuiz(message.roomId);
          console.log("Quiz created");
        }
      }
    });
  }
}
