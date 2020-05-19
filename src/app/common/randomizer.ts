import { Flashcard } from '../models/flashcard';

export class Randomizer {

  /**
   * Creates random answer choices for a flashcard
   * 
   * @param flashcard - the flashcard to create random answer choices for
   * @param flashcards - the array of flashcards to create random answer choices from
   */
  public randomizeFlashcardAnswerChoices(flashcard: Flashcard, flashcards: Flashcard[]): void {
    let randomAnswerChoiceIndicies: number[] = [];
    while (randomAnswerChoiceIndicies.length < 2) {
      const randomNum = this.getRandomNumber(0, (flashcards.length - 1));
      if (!randomAnswerChoiceIndicies.includes(randomNum)) {
        randomAnswerChoiceIndicies.push(randomNum);
      }
    }
    
    const correctAnswer = flashcard.answer;
    const randomNum = this.getRandomNumber(1, 3);

    flashcard.choiceOne = (randomNum === 1) ? correctAnswer : flashcards[randomAnswerChoiceIndicies.shift()].answer;
    flashcard.choiceTwo = (randomNum === 2) ? correctAnswer : flashcards[randomAnswerChoiceIndicies.shift()].answer;
    flashcard.choiceThree = (randomNum === 3) ? correctAnswer : flashcards[randomAnswerChoiceIndicies.shift()].answer;
  }

  // TODO: this one needs more work
  /**
   * reorders the flashcard array in random order
   * 
   * @param flashcards - the flashcard array to shuffle
   */
  public shuffleFlashcards(flashcards: Flashcard[]): void {
    for (let i = flashcards.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const tempFlashcard = flashcards[randomIndex];

      flashcards[i] = flashcards[randomIndex];
      flashcards[randomIndex] = tempFlashcard;
    }
  }

  /**
   * Generates a random integer from a minimum and maximum range
   * 
   * @param min - the integer to start the range 
   * @param max - the integer to end the range
   * 
   * @returns an random integer that falls within (and including) the minimum and maximum range
   */
  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
