import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FlashcardService } from '../common/flashcard.service';

@Component({
  selector: 'app-delete-flashcard-deck-dialog',
  templateUrl: './delete-flashcard-deck-dialog.component.html'
})
export class DeleteFlashcardDeckDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteFlashcardDeckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private flashcardService: FlashcardService
  ) { }

  deleteFlashcardDeck(): void {
    this.flashcardService.deleteFlashcardDeck(this.data.title);
    this.closeDialog(this.data.title);
  }

  closeDialog(title: string): void {
    this.dialogRef.close(title);
  }

}
