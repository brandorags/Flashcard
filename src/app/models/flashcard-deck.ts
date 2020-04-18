export class FlashcardDeck {
  title: string;
  flashcards: Map<string, string>;

  constructor(title: string, flashcards: Map<string, string>) {
    this.title = title;
    this.flashcards = flashcards;
  }
}
