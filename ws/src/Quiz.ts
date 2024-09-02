interface User {
  username: string;
  id: number;
  points: number;
}

enum Answer {
  ONE,
  TWO,
  THREE,
  FOUR,
}

interface Question {
  text: string;
  answer: Answer;
  options: {
    text: string;
  }[];
}

export class Quiz {
  private roomId: number;
  private hasStarted: boolean;
  private questions: Question[];
  private users: User[];

  constructor(roomId: number) {
    this.roomId = roomId;
    this.hasStarted = false;
    this.questions = [];
    this.users = [];
  }

  public getRoomId() {
    return this.roomId;
  }
}
