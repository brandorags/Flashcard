export class AnswerResult {
  index: number;
  question: string;
  answer: string;
  isCorrect: boolean;
  
  constructor(index?: number, question?: string, 
    answer?: string, isCorrect?: boolean) {
    this.index = index;
    this.question = question;
    this.answer = answer;
    this.isCorrect = isCorrect;
  }
}
