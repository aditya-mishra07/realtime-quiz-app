// interface Option {
//   id: number;
//   text: string;
//   votes: number;
//   questionId: number;
// }

export interface Quiz {
  id: number;
  title: string;
  hasStarted?: boolean | null;
  questions?: Question[];
  users?: User[];
  currentState?: string;
}

export interface User {
  username: string;
  userId: string;
  points: number;
  streak?: number[];
  roundPoints?: number;
}

export interface Message {
  type: string;
  roomId: string;
  userId?: string;
  questions?: Question[];
  username?: string;
  users?: User[];
  submissions?: Submission;
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
    id: number;
    text: string;
  }[];
  submissions: Submission[];
}

export interface Submission {
  questionId?: number;
  userId?: string;
  isCorrect?: boolean;
  optionSelected?: string;
}
