import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
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

  @ViewChild('sidenav') sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  private isHandset: boolean;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private flashcardService: FlashcardService
  ) { 
    this.isHandset$.subscribe(isHandset => {
      this.isHandset = isHandset;
    });
  }

  navigateToDeckList(): void {
    this.router.navigate(['/']);
    if (this.isHandset) {
      this.sidenav.close();
    }
  }

  openNewDeckDialog(): void {
    const dialogRef = this.dialog.open(NewFlashcardDeckDialogComponent, {});
    
    dialogRef.afterClosed().subscribe((newDeck: string) => {
      if (newDeck) {
        this.flashcardService.newDeckEventEmitter.emit(newDeck);
        this.snackBar.open(`${newDeck} has been created`);
      }
    });

    if (this.isHandset) {
      this.sidenav.close();
    }
  }

}
