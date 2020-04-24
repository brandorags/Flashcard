import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';

import { FlashcardService } from '../common/flashcard.service';
import { NewFlashcardDeckDialogComponent } from '../new-flashcard-deck-dialog/new-flashcard-deck-dialog.component';
import { DeleteFlashcardDeckDialogComponent } from '../delete-flashcard-deck-dialog/delete-flashcard-deck-dialog.component';

@Component({
  selector: 'app-flashcard-deck',
  templateUrl: './flashcard-deck.component.html',
  styleUrls: ['./flashcard-deck.component.scss']
})
export class FlashcardDeckComponent implements OnInit, OnDestroy {

  flashcardDeckTitles: string[] = [];

  newDeckSubscription: Subscription;

  isEditMode: boolean;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private flashcardService: FlashcardService
  ) { 
    this.newDeckSubscription = this.flashcardService.newDeckEventEmitter.subscribe((newDeck: string) => {
      if (newDeck) {
        this.loadFlashcardDeckTitles();
      }
    });
  }

  ngOnInit(): void {
    this.loadFlashcardDeckTitles();
  }

  ngOnDestroy(): void {
    this.newDeckSubscription.unsubscribe();
  }

  openFlashcardDeck(title: string): void {
    this.router.navigate(['/flashcard'], {state: {title: title}});
  }

  openNewDeckDialog(): void {
    const dialogRef = this.dialog.open(NewFlashcardDeckDialogComponent, {});
    
    dialogRef.afterClosed().subscribe((newDeck: string) => {
      if (newDeck) {
        this.loadFlashcardDeckTitles();
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
        this.loadFlashcardDeckTitles();
        this.snackBar.open(`${deletedDeck} has been deleted`);
      }
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  private loadFlashcardDeckTitles(): void {
    this.flashcardDeckTitles = this.flashcardService.getFlashcardDeckTitles();
  }

}
