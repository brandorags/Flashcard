import { Injectable, EventEmitter } from '@angular/core';

import { FlashcardDeck } from '../models/flashcard-deck';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  public newDeckEventEmitter: EventEmitter<string> = new EventEmitter();

  private readonly lastAccessedFlashcardDeckTitleKey = 'lastAccessedFlashcardDeckTitle';
  private readonly flashcardDeckTitleArrKey = 'flashcardDeckTitles';

  constructor() { }

  getFlashcardDeck(title: string): FlashcardDeck {
    let deck = localStorage.getItem(title);
    deck = JSON.parse(deck);
    
    let flashcards = new Map<string, string>();
    const keys = Object.keys(deck);
    for (const key of keys) {
      const value = deck[key];
      flashcards.set(key, value);
    }

    return new FlashcardDeck(title, flashcards);
  }

  saveFlashcardDeck(title: string, flashcardMap: {}): void {
    localStorage.setItem(title, JSON.stringify(flashcardMap));
    this.saveFlashcardDeckTitle(title);
  }

  deleteFlashcardDeck(title: string): void {
    localStorage.removeItem(title);
    this.deleteFlashcardDeckTitle(title);
  }

  saveLastAccessedFlashcardDeckTitle(title: string): void {
    localStorage.setItem(this.lastAccessedFlashcardDeckTitleKey, title);
  }

  getLastAccessedFlashcardDeckTitle(): string {
    return localStorage.getItem(this.lastAccessedFlashcardDeckTitleKey);
  }

  getFlashcardDeckTitleArr(): string[] {
    const titles = localStorage.getItem(this.flashcardDeckTitleArrKey);
    return (titles) ? JSON.parse(titles) : [];
  }

  private saveFlashcardDeckTitle(title: string): void {
    let titles = this.getFlashcardDeckTitleArr();
    titles.push(title);
    localStorage.setItem(this.flashcardDeckTitleArrKey, JSON.stringify(titles));
  }

  private deleteFlashcardDeckTitle(title: string): void {
    let titles = this.getFlashcardDeckTitleArr();
    titles = titles.filter(t => t !== title);
    localStorage.setItem(this.flashcardDeckTitleArrKey, JSON.stringify(titles));
  }

}
