import { AnswerResult } from './answer-result';

export class Flashcard {
  question: string;
  answer: string;
  choiceOne: string;
  choiceTwo: string;
  choiceThree: string;
  answerResult: AnswerResult;

  constructor(question: string, answer: string, choiceOne?: string, choiceTwo?: string,
    choiceThree?: string, answerResult?: AnswerResult) {
    this.question = question;
    this.answer = answer;
    this.choiceOne = choiceOne;
    this.choiceTwo = choiceTwo;
    this.choiceThree = choiceThree;
    this.answerResult = answerResult;
  }
}
