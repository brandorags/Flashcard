import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FlashcardService } from '../common/flashcard.service';

@Component({
  selector: 'app-new-flashcard-deck-dialog',
  templateUrl: './new-flashcard-deck-dialog.component.html',
  styles: [
  ],
})
export class NewFlashcardDeckDialogComponent {

  title: string;
  filename: string;
  flashcardMap = {};

  constructor(
    private dialogRef: MatDialogRef<NewFlashcardDeckDialogComponent>,
    private flashcardService: FlashcardService
  ) { }

  saveFlashcardDeck(): void {
    this.flashcardService.saveFlashcardDeck(this.title, this.flashcardMap);
    this.closeDialog();
  }

  onFileSelected(): void {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const fileResultArr = e.target.result.split('\n');
        for (let i = 0; i < fileResultArr.length; i++) {
          let row = fileResultArr[i];
          // ignore header and empty rows
          if (i === 0 || !row) {
            continue;
          }

          const rowSplit = row.split(',');
          const question = rowSplit[0].trim();
          const answer = rowSplit[1].trim();

          this.flashcardMap[answer] = question;
        }
      };
  
      const file = inputNode.files[0];
      this.filename = file.name;
      reader.readAsText(file);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
