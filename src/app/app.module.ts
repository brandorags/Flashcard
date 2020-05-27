// Angular
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// third-party modules
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

// user modules
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from './app-routing.module';

// user components
import { AppComponent } from './app.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { FlashcardDeckComponent } from './flashcard-deck/flashcard-deck.component';
import { CreateEditFlashcardDeckComponent } from './create-edit-flashcard-deck/create-edit-flashcard-deck.component';
import { NewFlashcardDeckDialogComponent } from './new-flashcard-deck-dialog/new-flashcard-deck-dialog.component';
import { DeleteFlashcardDeckDialogComponent } from './delete-flashcard-deck-dialog/delete-flashcard-deck-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    FlashcardComponent,
    FlashcardDeckComponent,
    CreateEditFlashcardDeckComponent,
    NewFlashcardDeckDialogComponent,
    DeleteFlashcardDeckDialogComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxUsefulSwiperModule
  ],
  entryComponents: [
    NewFlashcardDeckDialogComponent,
    DeleteFlashcardDeckDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
