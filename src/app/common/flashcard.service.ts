import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  private readonly flashcardDeckTitleArrKey = 'flashcardDeckTitles';

  constructor() { }

  getFlashcardDeckTitleArr(): string[] {
    let titles = localStorage.getItem(this.flashcardDeckTitleArrKey);
    return (titles) ? JSON.parse(titles) : [];
  }

  updateFlashcardDeckTitleArr(titles: string[]): void {
    localStorage.setItem(this.flashcardDeckTitleArrKey, JSON.stringify(titles));
  }

}
