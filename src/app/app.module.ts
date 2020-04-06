// Angular
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// user modules
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from './app-routing.module';

// user components
import { AppComponent } from './app.component';
import { FlashcardDeckComponent } from './flashcard-deck/flashcard-deck.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewFlashcardDeckDialogComponent } from './new-flashcard-deck-dialog/new-flashcard-deck-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FlashcardDeckComponent,
    NotFoundComponent,
    NewFlashcardDeckDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    NewFlashcardDeckDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
