
export interface Example {
  prefix: string;
  letter: string;
  suffix: string;
  translation: string;
}

export interface ArabicLetter {
  id: number;
  name: string;
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  transliteration: string;
  description: string;
  soundDescription: string;
  englishComparison: string;
  mouthTips: string;
  examples: {
    isolated: Example;
    initial: Example;
    medial: Example;
    final: Example;
  };
}

export enum AppState {
  WELCOME = 'WELCOME',
  MODULES = 'MODULES',
  LETTER_SELECTION = 'LETTER_SELECTION',
  THEORY = 'THEORY',
  LESSON = 'LESSON',
  GAME_PROMPT = 'GAME_PROMPT',
  MINI_GAME = 'MINI_GAME',
  VOWELS = 'VOWELS',
  END = 'END'
}

export type LetterPosition = 'isolated' | 'initial' | 'medial' | 'final';
