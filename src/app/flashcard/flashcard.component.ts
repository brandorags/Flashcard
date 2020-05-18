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

  @ViewChild('swiperInstance') swiperInstance: SwiperComponent;
  swiperConfig: SwiperOptions = {
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // }
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    }
    // allowSlidePrev: true,
    // allowSlideNext: true,
    // grabCursor: true,
    // on: {
    //   touchEnd: () => {
    //     this.goToNextQuestion();
    //   }
    // }
  };

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

    // this.answerKeys = Array.from(this.flashcards.keys());

    // this.initKeyEventListener();

    // this.generateQuestion(true);
    this.generateQuestions();
  }

  ngOnDestroy(): void {
    document.onkeyup = null;
  }

  // generateQuestion(isNextQuestion: boolean): void {
  //   this.answerResult = this.answerResults.find(ar => ar.index === this.questionCounter);
  //   if (!this.answerResult) {
  //     this.showNewFlashcard(isNextQuestion);
  //     this.randomizeAnswerChoices();
  //   }
  // }

  answerQuestion(flashcard: Flashcard, answerChoice: string): void {
    const isCorrect = (answerChoice === flashcard.answer);
    this.answerResult = new AnswerResult(this.questionCounter, this.currentQuestion,
      this.currentAnswer, answerChoice, isCorrect);
    
    flashcard.answerResult = this.answerResult;
  }

  // goToPreviousQuestion(): void {
  //   this.questionCounter--;
  //   this.generateQuestion(false);
  // }

  // goToNextQuestion(): void {
  //   this.questionCounter++;
  //   this.generateQuestion(true);
  // }

  showResultList(): void {
    const correctAnswerResults = this.answerResults.filter(ar => ar.isCorrect);
    this.correctAnswerCount = correctAnswerResults.length;
    this.showResults = true;
  }

  resetFlashcards(): void {
    this.questionCounter = 0;
    this.answerResults = [];
    this.showResults = false;

    // this.generateQuestion(true);
  }
  
  // private showNewFlashcard(isNextQuestion: boolean): void {
  //   let index: number;
  //   if (isNextQuestion && this.usedAnswerKeyIndicies.length === this.questionCounter) {
  //     do {
  //       index = this.getRandomNumber(0, (this.flashcards.size - 1));
  //     } while (this.usedAnswerKeyIndicies.includes(index))
      
  //     this.usedAnswerKeyIndicies.push(index);
  //   } else {
  //     index = this.usedAnswerKeyIndicies[this.questionCounter];
  //   }

  //   this.currentAnswer = this.answerKeys[index];
  //   this.currentQuestion = this.flashcards.get(this.currentAnswer);
  // }

  private generateQuestions(): void {
    const randomizer = new Randomizer();
    for (let flashcard of this.flashcards) {
      randomizer.randomizeFlashcardAnswerChoices(flashcard, this.flashcards);
    }
  }

  // private randomizeAnswerChoices(flashcard: Flashcard): void {
  //   let randomAnswerChoiceIndicies: number[] = [];
  //   while (randomAnswerChoiceIndicies.length < 2) {
  //     const randomNum = this.getRandomNumber(0, (this.flashcards.length - 1));
  //     if (!randomAnswerChoiceIndicies.includes(randomNum)) {
  //       randomAnswerChoiceIndicies.push(randomNum);
  //     }
  //   }
    
  //   const correctAnswerChoiceIndex = this.answerKeys.indexOf(this.currentAnswer);
  //   const randomNum = this.getRandomNumber(1, 3);

  //   flashcard.choiceOne = (randomNum === 1) ? 
  //     this.answerKeys[correctAnswerChoiceIndex] :
  //     this.answerKeys[randomAnswerChoiceIndicies.shift()];

  //   flashcard.choiceTwo = (randomNum === 2) ? 
  //     this.answerKeys[correctAnswerChoiceIndex] :
  //     this.answerKeys[randomAnswerChoiceIndicies.shift()];

  //   flashcard.choiceThree = (randomNum === 3) ? 
  //     this.answerKeys[correctAnswerChoiceIndex] : 
  //     this.answerKeys[randomAnswerChoiceIndicies.shift()];
  // }

  // private getRandomNumber(min: number, max: number): number {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // }

  // private initKeyEventListener(): void {
  //   document.onkeyup = (e) => {
  //     switch (e.key) {
  //       case 'ArrowRight':
  //         this.goToNextQuestion();
  //         break;
  //       case 'ArrowLeft':
  //         this.goToPreviousQuestion();
  //         break;
  //       case '1':
  //         this.answerQuestion(this.choiceOne);
  //         break;
  //       case '2':
  //         this.answerQuestion(this.choiceTwo);
  //         break;
  //       case '3':
  //         this.answerQuestion(this.choiceThree);
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  //}

}
