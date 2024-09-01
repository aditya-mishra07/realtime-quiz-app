enum Answer {
  ONE,
  TWO,
  THREE,
  FOUR,
}

interface Question {
  id: number;
  text: string;
  options: Option[];
  answer: Answer;
  quizId: number;
}

interface Option {
  id: number;
  text: string;
  votes: number;
  questionId: number;
}

export interface Quiz {
  id: number;
  title: string;
  questions?: Question[];
  users?: User[];
}

interface User {
  id: number;
  username: string;
  quizId: number;
}
