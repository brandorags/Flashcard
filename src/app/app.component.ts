import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    private router: Router
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

  navigateToCreateEditFlashcardDeck(): void {
    this.router.navigate(['/create-edit']);
    if (this.isHandset) {
      this.sidenav.close();
    }
  }

}
