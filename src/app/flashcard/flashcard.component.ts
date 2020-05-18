import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { SwiperComponent } from 'ngx-useful-swiper';
import { SwiperOptions } from 'swiper';

import { FlashcardService } from '../common/flashcard.service';
import { Randomizer } from '../common/randomizer';

import { Flashcard } from '../models/flashcard';
import { AnswerResult } from '../models/answer-result';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit, OnDestroy {

  flashcardDeckTitle: string;
  flashcards: Flashcard[] = [];
  
  questionCounter: number = 0;
  correctAnswerCount: number;
  endOfDeck: boolean;
  showResults: boolean;

  choiceOne: string;
  choiceTwo: string;
  choiceThree: string;

  @ViewChild('previousButton') previousButton: any;
  @ViewChild('nextButton') nextButton: any;

  @ViewChild('swiperInstance') swiperInstance: SwiperComponent;
  swiperConfig: SwiperOptions = {
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    grabCursor: true
    // on: {
    //   touchEnd: () => {
    //     this.goToNextQuestion();
    //   }
    // }
  };

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

    this.initKeyEventListener();
    this.generateQuestions();
    this.initCurrentAnswerChoices();
  }

  ngOnDestroy(): void {
    document.onkeyup = null;
  }

  answerQuestion(answerChoice: string): void {
    let flashcard = this.flashcards[this.questionCounter];
    const isCorrect = (answerChoice === flashcard.answer);

    flashcard.answerResult = new AnswerResult(this.questionCounter, flashcard.question,
      flashcard.answer, answerChoice, isCorrect);

    if (this.questionCounter === this.flashcards.length - 1) {
      this.endOfDeck = true;
    }
  }

  goToPreviousQuestion(): void {
    if (this.questionCounter === 0) {
      return;
    }

    this.previousButton.nativeElement.click();
    this.questionCounter--;
    this.initCurrentAnswerChoices();
  }

  goToNextQuestion(): void {
    if (this.questionCounter === this.flashcards.length - 1) {
      return;
    }

    this.nextButton.nativeElement.click();
    this.questionCounter++;
    this.initCurrentAnswerChoices();
  }

  showResultList(): void {
    const correctAnswerResults = this.flashcards.filter(ar => ar.answerResult.isCorrect);
    this.correctAnswerCount = correctAnswerResults.length;
    this.showResults = true;
  }

  resetFlashcards(): void {
    this.questionCounter = 0;
    this.showResults = false;
    this.endOfDeck = false;

    for (let flashcard of this.flashcards) {
      flashcard.answerResult = null;
    }
    
    this.generateQuestions();
  }

  private generateQuestions(): void {
    const randomizer = new Randomizer();
    for (let flashcard of this.flashcards) {
      randomizer.randomizeFlashcardAnswerChoices(flashcard, this.flashcards);
    }
  }

  private initCurrentAnswerChoices(): void {
    const flashcard = this.flashcards[this.questionCounter];
    this.choiceOne = flashcard.choiceOne;
    this.choiceTwo = flashcard.choiceTwo;
    this.choiceThree = flashcard.choiceThree;
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
