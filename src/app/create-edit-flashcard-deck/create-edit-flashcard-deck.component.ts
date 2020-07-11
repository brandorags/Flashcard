import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { FlashcardService } from '../common/flashcard.service';

import { Flashcard } from '../models/flashcard';
import { NewFlashcardDeckDialogComponent } from '../new-flashcard-deck-dialog/new-flashcard-deck-dialog.component';

@Component({
  selector: 'app-create-edit-flashcard-deck',
  templateUrl: './create-edit-flashcard-deck.component.html',
  styleUrls: ['./create-edit-flashcard-deck.component.scss']
})
export class CreateEditFlashcardDeckComponent implements OnInit {

  flashcardDeckTitle: FormControl;
  flashcards: Flashcard[] = [];

  currentDeckTitle: string;

  deckTitleErrorMessage: string;
  flashcardErrorMessage: string;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private flashcardService: FlashcardService
  ) { }

  ngOnInit(): void {
    this.currentDeckTitle = history.state['title'] ?? '';
    this.flashcardDeckTitle = new FormControl(this.currentDeckTitle, Validators.required);

    const flashcardDeck = this.flashcardService.getFlashcardDeck(this.currentDeckTitle);
    if (flashcardDeck) {
      this.flashcards = flashcardDeck.flashcards;
    } else {
      // init with 3 questions
      for (let i = 0; i < 3; i++) {
        this.addQuestion();
      }
    }
  }

  addQuestion(): void {
    const flashcard = new Flashcard(null, null);
    this.flashcards.push(flashcard);
  }

  saveFlashcardDeck(): void {
    const isDeckValid = this.validateFlashcardDeck();
    if (!isDeckValid) {
      return;
    }

    let flashcardMap = {};
    for (const flashcard of this.flashcards) {
      flashcardMap[flashcard.answer] = flashcard.question;
    }

    this.flashcardService.saveFlashcardDeck(this.flashcardDeckTitle.value, flashcardMap);
    if (this.currentDeckTitle !== this.flashcardDeckTitle.value) {
      this.flashcardService.deleteFlashcardDeck(this.currentDeckTitle);
    }

    let successMessage: string;
    if (this.currentDeckTitle) {
      successMessage = `${this.flashcardDeckTitle.value} has been updated`;
    } else {
      successMessage = `${this.flashcardDeckTitle.value} has been created`;      
    }

    this.snackBar.open(successMessage);

    this.currentDeckTitle = this.flashcardDeckTitle.value;
  }

  openNewDeckDialog(): void {
    const dialogRef = this.dialog.open(NewFlashcardDeckDialogComponent, {});
    
    dialogRef.afterClosed().subscribe((newDeck: string) => {
      if (newDeck) {
        this.flashcardService.newDeckEventEmitter.emit(newDeck);
        this.snackBar.open(`${newDeck} has been created`);
      }
    });
  }

  private validateFlashcardDeck(): boolean {
    // reset error messages
    this.deckTitleErrorMessage = '';
    this.flashcardErrorMessage = '';

    // check if deck title has a value
    if (this.flashcardDeckTitle.hasError('required')) {
      this.flashcardDeckTitle.markAsTouched();
      this.deckTitleErrorMessage = 'You must enter a title';
      return false;
    }

    // check if there's at least 3 question/answer pairs entered
    let validFlashcardCounter = 0;
    for (const flashcard of this.flashcards) {
      if (flashcard.question && flashcard.answer) {
        validFlashcardCounter++
      }

      if (validFlashcardCounter >= 3) {
        break;
      }
    }

    if (validFlashcardCounter < 3) {
      this.flashcardErrorMessage = 'At least 3 question/answers need to be entered';
      return false;
    }

    return true;
  }

}
