import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateEditFlashcardDeckComponent } from './create-edit-flashcard-deck/create-edit-flashcard-deck.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { FlashcardDeckComponent } from './flashcard-deck/flashcard-deck.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'create-edit', component: CreateEditFlashcardDeckComponent },
  { path: 'flashcard', component: FlashcardComponent },
  { path: '', component: FlashcardDeckComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
