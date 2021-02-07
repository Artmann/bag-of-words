import { ReactElement, useState } from 'react';
import GameOverScreen from './game-over-screen';
import GameScreen from './game-screen';

import Timer from './timer';
import { getWordsInRandomOrder, Word } from './words';

export type Option = {
  isCorrect: boolean;
  text: string;
}

export default function Game(): ReactElement {
  const [ hasStarted, setHasStarted ] = useState(false);
  const [ remainingWords, setRemainingWords ] = useState<Word[]>([]);
  const [ currentWord, setCurrentWord ] = useState<Word>();
  const [ options, setOptions ] = useState<Option[]>();
  const [ score, setScore ] = useState(0);
  const [ finishedGame, setFinishedGame ] = useState(false);

  const pickAWord = () => {

    const index = Math.floor(Math.random() * remainingWords.length);
    const word = remainingWords[index];

    const otherWords = getWordsInRandomOrder()
      .filter(w => w.english !== word.english)
      .sort(() => Math.random() >= 0.5 ? 1 : -1)
      .slice(0, 3);

    setOptions(
      [
        ...otherWords.map(w => ({ text: w.english, isCorrect: false })),
        { text: word.english, isCorrect: true }
      ].sort(() => Math.random() >= 0.5 ? 1 : -1)
    );

    setCurrentWord(word);
    setRemainingWords(
      remainingWords.filter(w => w.english !== word.english)
    );
  };

  const startGame = () => {
    setCurrentWord(undefined);
    setHasStarted(true);
    setOptions([]);
    setScore(0);
    setFinishedGame(false);
    setRemainingWords(getWordsInRandomOrder());
  };

  const didPlay = (success: boolean) => {
    setScore(score + (success ? 3 : 0));

    if (remainingWords.length === 0) {
      setFinishedGame(true);

      return;
    }

    pickAWord();
  };

  if (remainingWords.length > 0 && !currentWord) {
    pickAWord();
  }

  if (!hasStarted) {
    startGame();
  }

  if (!hasStarted) {
    return (
      <div>
        <button onClick={ startGame }>
          Start
        </button>
      </div>
    );
  }

  if (!currentWord || !options) {
    return (
      <div>
        Selecting words.
      </div>
    );
  }

  if (finishedGame) {
    return (
      <GameOverScreen
        score={ score }
        restartGame={ startGame }
      />
    );
  }

  return (
    <GameScreen
      didPlay={ didPlay }
      options={ options }
      word={ currentWord }
    />
  );
};
