import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-flashcard-deck-dialog',
  templateUrl: './new-flashcard-deck-dialog.component.html',
  styles: [
  ],
})
export class NewFlashcardDeckDialogComponent {

  title: string;

  constructor(
    public dialogRef: MatDialogRef<NewFlashcardDeckDialogComponent>
  ) { }

  saveFlashcardDeck(): void {
    console.log(this.title);
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
