import { Component, OnInit } from '@angular/core';

import { FlashcardService } from '../common/flashcard.service';

@Component({
  selector: 'app-flashcard-deck',
  templateUrl: './flashcard-deck.component.html',
  styles: []
})
export class FlashcardDeckComponent implements OnInit {

  flashcardDeckTitleArr: string[] = [];

  constructor(private flashcardService: FlashcardService) { }

  ngOnInit(): void {
    this.flashcardDeckTitleArr = this.flashcardService.getFlashcardDeckTitleArr();
  }

  saveFlashcardDeckTitle(title: string): void {
    this.flashcardDeckTitleArr.push(title);
    this.flashcardService.updateFlashcardDeckTitleArr(this.flashcardDeckTitleArr);
  }

}
