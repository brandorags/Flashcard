// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// user modules
import { MaterialModule } from "./material/material.module";
import { AppRoutingModule } from './app-routing.module';

// user components
import { AppComponent } from './app.component';
import { FlashcardDeckComponent } from './flashcard-deck/flashcard-deck.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    FlashcardDeckComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
