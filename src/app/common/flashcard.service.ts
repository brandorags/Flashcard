import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  private readonly flashcardDeckTitleArrKey = 'flashcardDeckTitles';

  constructor() { }

  getFlashcardDeckTitleArr(): string[] {
    const titles = localStorage.getItem(this.flashcardDeckTitleArrKey);
    return (titles) ? JSON.parse(titles) : [];
  }

  saveFlashcardDeck(title: string, flashcardMap: {}): void {
    localStorage.setItem(title, JSON.stringify(flashcardMap));
    this.saveFlashcardDeckTitle(title);
  }

  deleteFlashcardDeck(title: string): void {
    localStorage.removeItem(title);
    this.deleteFlashcardDeckTitle(title);
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
