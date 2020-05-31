import { Flashcard } from '../models/flashcard';

export class Randomizer {
  
  /**
   * Reorders the flashcard array in random order
   * 
   * @param flashcards - the flashcard array to shuffle
   */
  public shuffleFlashcards(flashcards: Flashcard[]): void {
    let currentIndex = flashcards.length;
    let randomIndex: number;
    let tempFlashcard: Flashcard;

    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      tempFlashcard = flashcards[currentIndex];
      flashcards[currentIndex] = flashcards[randomIndex];
      flashcards[randomIndex] = tempFlashcard;
    }
  }
  
  /**
   * Creates random answer choices for a flashcard
   * 
   * @param flashcards - the array of flashcards to create random answer choices from
   */
  public randomizeFlashcardAnswerChoices(flashcards: Flashcard[]): void {
    for (let i = 0; i < flashcards.length; i++) {
      let flashcard = flashcards[i];
      let randomAnswerChoiceIndicies: number[] = [];
      while (randomAnswerChoiceIndicies.length < 2) {
        const randomNum = this.getRandomNumber(0, (flashcards.length - 1));
        if (!randomAnswerChoiceIndicies.includes(randomNum) && randomNum !== i) {
          randomAnswerChoiceIndicies.push(randomNum);
        }
      }
      
      const correctAnswer = flashcard.answer;
      const randomNum = this.getRandomNumber(1, 3);
  
      flashcard.choiceOne = (randomNum === 1) ? correctAnswer : flashcards[randomAnswerChoiceIndicies.shift()].answer;
      flashcard.choiceTwo = (randomNum === 2) ? correctAnswer : flashcards[randomAnswerChoiceIndicies.shift()].answer;
      flashcard.choiceThree = (randomNum === 3) ? correctAnswer : flashcards[randomAnswerChoiceIndicies.shift()].answer;      
    }
  }

  /**
   * Generates a random integer from a minimum and maximum range
   * 
   * @param min - the integer to start the range 
   * @param max - the integer to end the range
   * 
   * @returns a random integer that falls within (and including) the minimum and maximum range
   */
  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
