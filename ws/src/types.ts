export interface User {
  username: string;
  userId: string;
  points: number;
}

export interface Message {
  roomId: number;
  userId?: string;
  payload?: Question[];
  username?: string;
}

export enum Answer {
  ONE,
  TWO,
  THREE,
  FOUR,
}

export interface Question {
  text: string;
  answer: Answer;
  options: {
    text: string;
  }[];
}
