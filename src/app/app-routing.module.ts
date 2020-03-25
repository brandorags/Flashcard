import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlashcardDeckComponent } from './flashcard-deck/flashcard-deck.component';

const routes: Routes = [
  { path: '', component: FlashcardDeckComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
