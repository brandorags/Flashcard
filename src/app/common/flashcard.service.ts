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

  saveFlashcardDeckTitle(title: string): void {
    let titles = this.getFlashcardDeckTitleArr();
    titles.push(title);

    this.updateFlashcardDeckTitleArr(titles);
  }

  private updateFlashcardDeckTitleArr(titles: string[]): void {
    localStorage.setItem(this.flashcardDeckTitleArrKey, JSON.stringify(titles));
  }

}
