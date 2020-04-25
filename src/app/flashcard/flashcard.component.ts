import { Component, OnInit } from '@angular/core';

import { FlashcardService } from '../common/flashcard.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {

  flashcardDeckTitle: string;
  flashcards: Map<string, string>;
  
  answerKeys: string[] = [];
  questionCounter: number = 0;
  currentQuestion: string;
  currentAnswer: string;
  choiceOne: string;
  choiceTwo: string;
  choiceThree: string;
  answerResult: string;

  private usedAnswerKeyIndicies: number[] = [];

  constructor(private flashcardService: FlashcardService) { }

  ngOnInit(): void {
    let title = history.state['title'];
    if (!title) {
      title = this.flashcardService.getLastAccessedFlashcardDeckTitle();
    }

    const flashcardDeck = this.flashcardService.getFlashcardDeck(title);
    this.flashcardDeckTitle = flashcardDeck.title;
    this.flashcards = flashcardDeck.flashcards;

    this.flashcardService.saveLastAccessedFlashcardDeckTitle(this.flashcardDeckTitle);

    this.answerKeys = Array.from(this.flashcards.keys());

    this.generateQuestion(true);
  }

  generateQuestion(isNextQuestion: boolean): void {
    this.showFlashcard(isNextQuestion);
    this.randomizeAnswerChoices();
  }

  answerQuestion(answer: string): void {
    const question = this.flashcards.get(answer);
    this.answerResult = (question === this.currentQuestion) ? 'Correct!' : 'Incorrect.';
  }

  goToPreviousQuestion(): void {
    this.questionCounter--;
    this.generateQuestion(false);
  }

  goToNextQuestion(): void {
    this.questionCounter++;
    this.generateQuestion(true);
  }

  private showFlashcard(isNextQuestion: boolean): void {
    this.answerResult = null;

    let index: number;
    if (isNextQuestion && this.usedAnswerKeyIndicies.length === this.questionCounter) {
      do {
        index = this.getRandomNumber(0, (this.flashcards.size - 1));
      } while (this.usedAnswerKeyIndicies.includes(index))
      
      this.usedAnswerKeyIndicies.push(index);
    } else {
      index = this.usedAnswerKeyIndicies[this.questionCounter];
    }

    this.currentAnswer = this.answerKeys[index];
    this.currentQuestion = this.flashcards.get(this.currentAnswer);
  }

  private randomizeAnswerChoices(): void {
    let randomAnswerChoiceIndicies: number[] = [];
    while (randomAnswerChoiceIndicies.length < 2) {
      const randomNum = this.getRandomNumber(0, (this.flashcards.size - 1));
      if (!randomAnswerChoiceIndicies.includes(randomNum)) {
        randomAnswerChoiceIndicies.push(randomNum);
      }
    }
    
    const correctAnswerChoiceIndex = this.answerKeys.indexOf(this.currentAnswer);
    const randomNum = this.getRandomNumber(1, 3);

    this.choiceOne = (randomNum === 1) ? 
      this.answerKeys[correctAnswerChoiceIndex] :
      this.answerKeys[randomAnswerChoiceIndicies.shift()];

    this.choiceTwo = (randomNum === 2) ? 
      this.answerKeys[correctAnswerChoiceIndex] :
      this.answerKeys[randomAnswerChoiceIndicies.shift()];

    this.choiceThree = (randomNum === 3) ? 
      this.answerKeys[correctAnswerChoiceIndex] : 
      this.answerKeys[randomAnswerChoiceIndicies.shift()];
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
