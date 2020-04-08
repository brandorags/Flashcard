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
  fileContents: string[];

  constructor(
    private dialogRef: MatDialogRef<NewFlashcardDeckDialogComponent>,
    private flashcardService: FlashcardService
  ) { }

  saveFlashcardDeck(): void {
    this.flashcardService.saveFlashcardDeckTitle(this.title);
    this.closeDialog();
  }

  onFileSelected(): void {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const fileResult = e.target.result;
        const fileResultArr = fileResult.split('\n');
        for (let a of fileResultArr) {
          this.fileContents.push(a);
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
