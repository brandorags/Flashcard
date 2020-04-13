import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

import { FlashcardService } from '../common/flashcard.service';
import { NewFlashcardDeckDialogComponent } from '../new-flashcard-deck-dialog/new-flashcard-deck-dialog.component';
import { DeleteFlashcardDeckDialogComponent } from '../delete-flashcard-deck-dialog/delete-flashcard-deck-dialog.component';

@Component({
  selector: 'app-flashcard-deck',
  templateUrl: './flashcard-deck.component.html'
})
export class FlashcardDeckComponent implements OnInit, OnDestroy {

  flashcardDeckTitleArr: string[] = [];

  newDeckSubscription: Subscription;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private flashcardService: FlashcardService
  ) { 
    this.newDeckSubscription = this.flashcardService.newDeckEventEmitter.subscribe((newDeck: string) => {
      if (newDeck) {
        this.loadFlashcardDeckTitleArr();
      }
    });
  }

  ngOnInit(): void {
    this.loadFlashcardDeckTitleArr();
  }

  ngOnDestroy(): void {
    this.newDeckSubscription.unsubscribe();
  }

  openNewDeckDialog(): void {
    const dialogRef = this.dialog.open(NewFlashcardDeckDialogComponent, {});
    
    dialogRef.afterClosed().subscribe((newDeck: string) => {
      if (newDeck) {
        this.loadFlashcardDeckTitleArr();
        this.snackBar.open(`${newDeck} has been created`);
      }
    });
  }

  openDeleteDeckDialog(title: string): void {
    const dialogRef = this.dialog.open(DeleteFlashcardDeckDialogComponent, {
      data: {title: title}
    });
    
    dialogRef.afterClosed().subscribe((deletedDeck: string) => {
      if (deletedDeck) {
        this.loadFlashcardDeckTitleArr();
        this.snackBar.open(`${deletedDeck} has been deleted`);
      }
    });
  }

  private loadFlashcardDeckTitleArr(): void {
    this.flashcardDeckTitleArr = this.flashcardService.getFlashcardDeckTitleArr();
  }

}
