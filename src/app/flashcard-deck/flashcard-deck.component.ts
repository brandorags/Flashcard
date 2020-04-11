import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FlashcardService } from '../common/flashcard.service';
import { NewFlashcardDeckDialogComponent } from '../new-flashcard-deck-dialog/new-flashcard-deck-dialog.component';
import { DeleteFlashcardDeckDialogComponent } from '../delete-flashcard-deck-dialog/delete-flashcard-deck-dialog.component';

@Component({
  selector: 'app-flashcard-deck',
  templateUrl: './flashcard-deck.component.html',
  styleUrls: ['./flashcard-deck.component.scss']
})
export class FlashcardDeckComponent implements OnInit {

  flashcardDeckTitleArr: string[] = [];

  constructor(
    private dialog: MatDialog,
    private flashcardService: FlashcardService
  ) { }

  ngOnInit(): void {
    this.flashcardDeckTitleArr = this.flashcardService.getFlashcardDeckTitleArr();
  }

  openNewDeckDialog(): void {
    const dialogRef = this.dialog.open(NewFlashcardDeckDialogComponent, {});
    
    dialogRef.afterClosed().subscribe(() => {
      this.flashcardDeckTitleArr = this.flashcardService.getFlashcardDeckTitleArr();
    });
  }

  openDeleteDeckDialog(title: string): void {
    const dialogRef = this.dialog.open(DeleteFlashcardDeckDialogComponent, {
      data: {title: title}
    });
    
    dialogRef.afterClosed().subscribe((deletedDeck: string) => {
      if (deletedDeck) {
        this.flashcardDeckTitleArr = this.flashcardService.getFlashcardDeckTitleArr();
      }
    });
  }

}
