export type QuizOption = {
  label: string;
  value: string;
};

export type QuizQuestion = {
  question: string;
  options: QuizOption[];
};
