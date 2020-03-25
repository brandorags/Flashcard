import { Flashcard } from './flashcard';

export class FlashcardDeck {
  title: string;
  flashcards: Flashcard[];

  constructor(title: string, flashcards: Flashcard[]) {
    this.title = title;
    this.flashcards = flashcards;
  }
}
