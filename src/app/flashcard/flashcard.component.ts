import { Component, OnInit } from '@angular/core';

import { FlashcardService } from '../common/flashcard.service';

import { FlashcardDeck } from '../models/flashcard-deck';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {

  flashcardDeck: FlashcardDeck;
  
  answerKeys: string[] = [];
  questionCounter: number = 0;
  currentQuestion: string;
  choiceOne: string;
  choiceTwo: string;
  choiceThree: string;

  constructor(private flashcardService: FlashcardService) { }

  ngOnInit(): void {
    let title = history.state['title'];
    if (!title) {
      title = this.flashcardService.getLastAccessedFlashcardDeckTitle();
    }

    this.flashcardDeck = this.flashcardService.getFlashcardDeck(title);
    this.flashcardService.saveLastAccessedFlashcardDeckTitle(title);

    this.answerKeys = Array.from(this.flashcardDeck.flashcards.keys());

    this.generateQuestion();
  }

  generateQuestion(): void {
    this.showFlashcard();
    this.randomizeAnswerChoices();
  }

  private showFlashcard(): void {
    const flashcards = this.flashcardDeck.flashcards;
    if (this.questionCounter > flashcards.size) {
      return;
    }

    const answer = this.answerKeys[this.questionCounter];
    this.currentQuestion = flashcards.get(answer);
  }

  private randomizeAnswerChoices(): void {
    const deckCount = this.flashcardDeck.flashcards.size;
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
