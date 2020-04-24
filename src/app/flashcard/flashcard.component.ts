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
  choiceOne: string;
  choiceTwo: string;
  choiceThree: string;
  answerResult: string;

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

    this.generateQuestion();
  }

  generateQuestion(): void {
    this.showFlashcard();
    this.randomizeAnswerChoices();
  }

  answerQuestion(answer: string): void {
    const question = this.flashcards.get(answer);
    this.answerResult = (question === this.currentQuestion) ? 'Correct!' : 'Incorrect.';
  }

  private showFlashcard(): void {
    if (this.questionCounter > this.flashcards.size) {
      return;
    }

    const answer = this.answerKeys[this.questionCounter];
    this.currentQuestion = this.flashcards.get(answer);
  }

  private randomizeAnswerChoices(): void {
    const deckCount = this.flashcards.size;
    const correctAnswerChoice = this.getRandomNumber(1, 3);

    while (true) {
      const randomNum = this.getRandomNumber(0, deckCount);
      this.choiceOne = (correctAnswerChoice === 1) ? 
        this.answerKeys[this.questionCounter] : 
        this.answerKeys[randomNum];
      if (this.choiceOne) {
        break;
      }
    }
    
    while (true) {
      const randomNum = this.getRandomNumber(0, deckCount);
      this.choiceTwo = (correctAnswerChoice === 2) ? 
        this.answerKeys[this.questionCounter] : 
        this.answerKeys[randomNum];
      if (this.choiceTwo && this.choiceTwo !== this.choiceOne) {
        break;
      }
    }

    while (true) {
      const randomNum = this.getRandomNumber(0, deckCount);
      this.choiceThree = (correctAnswerChoice === 3) ? 
        this.answerKeys[this.questionCounter] : 
        this.answerKeys[randomNum];
      if (this.choiceThree && this.choiceThree !== this.choiceOne &&
        this.choiceThree !== this.choiceTwo) {
        break;
      }
    }
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
