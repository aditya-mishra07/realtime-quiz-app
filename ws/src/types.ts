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
  isCorrect: boolean;
  optionSelected: Answer;
}
export type state = "not_started" | "question" | "leaderboard" | "ended";
