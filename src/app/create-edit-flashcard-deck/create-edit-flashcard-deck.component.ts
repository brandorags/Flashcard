import { Component, OnInit } from '@angular/core';
import { Flashcard } from '../models/flashcard';

@Component({
  selector: 'app-create-edit-flashcard-deck',
  templateUrl: './create-edit-flashcard-deck.component.html',
  styleUrls: ['./create-edit-flashcard-deck.component.scss']
})
export class CreateEditFlashcardDeckComponent implements OnInit {

  flashcardDeckTitle: string;
  flashcards: Flashcard[] = [];

  constructor() { }

  ngOnInit(): void {
    if (this.flashcards.length === 0) {
      for (let i = 0; i < 3; i++) {
        this.addQuestion();
      }
    }
  }

  addQuestion(): void {
    const flashcard = new Flashcard(null, null);
    this.flashcards.push(flashcard);
  }

}
