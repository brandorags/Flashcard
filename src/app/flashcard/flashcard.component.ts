import { Component, OnInit, OnDestroy } from '@angular/core';

import { FlashcardService } from '../common/flashcard.service';
import { AnswerResult } from '../models/answer-result';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit, OnDestroy {

  flashcardDeckTitle: string;
  flashcards: Map<string, string>;
  
  answerKeys: string[] = [];
  questionCounter: number = 0;
  currentQuestion: string;
  currentAnswer: string;
  
  answerResults: AnswerResult[] = [];
  answerResult: AnswerResult;
  showResults: boolean;
  correctAnswerCount: number;

  choiceOne: string;
  choiceTwo: string;
  choiceThree: string;

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

    this.initKeyEventListener();

    this.generateQuestion(true);
  }

  ngOnDestroy(): void {
    document.onkeyup = null;
  }

  generateQuestion(isNextQuestion: boolean): void {
    this.answerResult = this.answerResults.find(ar => ar.index === this.questionCounter);
    if (!this.answerResult) {
      this.showNewFlashcard(isNextQuestion);
      this.randomizeAnswerChoices();
    }
  }

  answerQuestion(answer: string): void {
    const question = this.flashcards.get(answer);
    const isCorrect = (question === this.currentQuestion);
    
    this.answerResult = new AnswerResult(this.questionCounter, this.currentQuestion,
      this.currentAnswer, answer, isCorrect);
    this.answerResults.push(this.answerResult);
  }

  goToPreviousQuestion(): void {
    this.questionCounter--;
    this.generateQuestion(false);
  }

  goToNextQuestion(): void {
    this.questionCounter++;
    this.generateQuestion(true);
  }

  showResultList(): void {
    const correctAnswerResults = this.answerResults.filter(ar => ar.isCorrect);
    this.correctAnswerCount = correctAnswerResults.length;
    this.showResults = true;
  }

  resetFlashcards(): void {
    this.questionCounter = 0;
    this.answerResults = [];
    this.showResults = false;

    this.generateQuestion(true);
  }

  private showNewFlashcard(isNextQuestion: boolean): void {
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

  private initKeyEventListener(): void {
    document.onkeyup = (e) => {
      switch (e.key) {
        case 'ArrowRight':
          this.goToNextQuestion();
          break;
        case 'ArrowLeft':
          this.goToPreviousQuestion();
          break;
        case '1':
          this.answerQuestion(this.choiceOne);
          break;
        case '2':
          this.answerQuestion(this.choiceTwo);
          break;
        case '3':
          this.answerQuestion(this.choiceThree);
          break;
        default:
          break;
      }
    }
  }

}
