export interface User {
  username: string;
  userId: string;
  points: number;
  streak?: number[];
  roundPoints?: number;
}

export interface Result {
  position?: number;
  userinfo?: User;
}

export interface Message {
  type: string;
  roomId: string;
  userId?: string;
  questions?: Question[];
  username?: string;
  users?: User[];
  submission?: Submission;
}

export enum Answer {
  ONE,
  TWO,
  THREE,
  FOUR,
}

export interface Question {
  id: number;
  text: string;
  answer: Answer;
  startTime: number;
  options: {
    text: string;
  }[];
  submissions: Submission[];
}

export interface Submission {
  questionId: number;
  userId: string;
  isCorrect?: boolean;
  optionSelected?: Answer;
}
export type state = "not_started" | "question" | "leaderboard" | "ended";
