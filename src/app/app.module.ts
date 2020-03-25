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

@NgModule({
  declarations: [
    AppComponent,
    FlashcardDeckComponent
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
