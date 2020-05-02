export class AnswerResult {
  index: number;
  question: string;
  answer: string;
  userAnswer: string;
  isCorrect: boolean;
  
  constructor(index?: number, question?: string, answer?: string, 
    userAnser?: string, isCorrect?: boolean) {
    this.index = index;
    this.question = question;
    this.answer = answer;
    this.userAnswer = userAnser;
    this.isCorrect = isCorrect;
  }
}
