import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FlashcardService } from './common/flashcard.service';

import { NewFlashcardDeckDialogComponent } from './new-flashcard-deck-dialog/new-flashcard-deck-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title: string = 'flashcard';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private flashcardService: FlashcardService
  ) { }

  openNewDeckDialog(): void {
    const dialogRef = this.dialog.open(NewFlashcardDeckDialogComponent, {});
    
    dialogRef.afterClosed().subscribe((newDeck: string) => {
      if (newDeck) {
        this.flashcardService.newDeckEventEmitter.emit(newDeck);
        this.snackBar.open(`${newDeck} has been created`);
      }
    });
  }

}
