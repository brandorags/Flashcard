import { Component, OnInit } from '@angular/core';

import { FlashcardService } from '../common/flashcard.service';

import { FlashcardDeck } from '../models/flashcard-deck';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styles: [
  ],
})
export class FlashcardComponent implements OnInit {

  flashcardDeck: FlashcardDeck;

  constructor(private flashcardService: FlashcardService) { }

  ngOnInit(): void {
    let title = history.state['title'];
    if (!title) {
      title = this.flashcardService.getLastAccessedFlashcardDeckTitle();
    }

    this.flashcardDeck = this.flashcardService.getFlashcardDeck(title);
    this.flashcardService.saveLastAccessedFlashcardDeckTitle(title);
  }

}
