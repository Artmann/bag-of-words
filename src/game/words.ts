import words from './words.json';

export interface Word {
  english: string;
  spanish: string;
}

export function getWordsInRandomOrder(): Word[] {
  return words.sort(() => Math.random() >= 0.5 ? -1 : 1);
}
