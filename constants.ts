
import { ArabicLetter } from './types';

export const ALPHABET_DATA: ArabicLetter[] = [
  {
    id: 1, name: 'Alif', isolated: 'أ', initial: 'أ', medial: 'ـأ', final: 'ـأ', transliteration: 'a', description: 'The first letter, often silent or used as a carrier for vowels.',
    examples: {
      isolated: { prefix: '', letter: 'أ', suffix: 'رنب', translation: 'Rabbit' },
      initial: { prefix: '', letter: 'أ', suffix: 'سد', translation: 'Lion' },
      medial: { prefix: 'ف', letter: 'أ', suffix: 'ر', translation: 'Mouse' },
      final: { prefix: 'مرف', letter: 'أ', suffix: '', translation: 'Elevated' }
    }
  },
  {
    id: 2, name: 'Ba', isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب', transliteration: 'b', description: 'Like the English "B".',
    examples: {
      isolated: { prefix: 'با', letter: 'ب', suffix: '', translation: 'Door' },
      initial: { prefix: '', letter: 'بـ', suffix: 'نت', translation: 'Girl' },
      medial: { prefix: 'خـ', letter: 'ـبـ', suffix: 'ز', translation: 'Bread' },
      final: { prefix: 'كلـ', letter: 'ـب', suffix: '', translation: 'Dog' }
    }
  },
  {
    id: 3, name: 'Ta', isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت', transliteration: 't', description: 'Like the English "T".',
    examples: {
      isolated: { prefix: 'تو', letter: 'ت', suffix: '', translation: 'Berries' },
      initial: { prefix: '', letter: 'تـ', suffix: 'مساح', translation: 'Crocodile' },
      medial: { prefix: 'كـ', letter: 'ـتـ', suffix: 'اب', translation: 'Book' },
      final: { prefix: 'بيـ', letter: 'ـت', suffix: '', translation: 'House' }
    }
  },
  {
    id: 4, name: 'Tha', isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث', transliteration: 'th', description: 'Like the "th" in "thin".',
    examples: {
      isolated: { prefix: 'حرث', letter: '', suffix: '', translation: 'Plough' },
      initial: { prefix: '', letter: 'ثـ', suffix: 'علب', translation: 'Fox' },
      medial: { prefix: 'كـ', letter: 'ـثـ', suffix: 'ير', translation: 'Many' },
      final: { prefix: 'مثلـ', letter: 'ـث', suffix: '', translation: 'Triangle' }
    }
  },
  {
    id: 5, name: 'Jeem', isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج', transliteration: 'j', description: 'Like the "J" in "jam".',
    examples: {
      isolated: { prefix: 'دجا', letter: 'ج', suffix: '', translation: 'Chicken' },
      initial: { prefix: '', letter: 'جـ', suffix: 'مل', translation: 'Camel' },
      medial: { prefix: 'شـ', letter: 'ـجـ', suffix: 'رة', translation: 'Tree' },
      final: { prefix: 'ثلـ', letter: 'ـج', suffix: '', translation: 'Snow' }
    }
  },
  {
    id: 6, name: 'Haa', isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح', transliteration: 'ḥ', description: 'A deep breathy "H" sound.',
    examples: {
      isolated: { prefix: 'تفاح', letter: '', suffix: '', translation: 'Apple' },
      initial: { prefix: '', letter: 'حـ', suffix: 'ليب', translation: 'Milk' },
      medial: { prefix: 'لـ', letter: 'ـحـ', suffix: 'م', translation: 'Meat' },
      final: { prefix: 'ملـ', letter: 'ـح', suffix: '', translation: 'Salt' }
    }
  },
  {
    id: 7, name: 'Khaa', isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ', transliteration: 'kh', description: 'A raspy sound like clearing your throat.',
    examples: {
      isolated: { prefix: 'خو', letter: 'خ', suffix: '', translation: 'Peach' },
      initial: { prefix: '', letter: 'خـ', suffix: 'يمة', translation: 'Tent' },
      medial: { prefix: 'نـ', letter: 'ـخـ', suffix: 'لة', translation: 'Palm tree' },
      final: { prefix: 'مطبـ', letter: 'ـخ', suffix: '', translation: 'Kitchen' }
    }
  },
  {
    id: 8, name: 'Dal', isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد', transliteration: 'd', description: 'Like the English "D".',
    examples: {
      isolated: { prefix: 'ور', letter: 'د', suffix: '', translation: 'Rose' },
      initial: { prefix: '', letter: 'د', suffix: 'يك', translation: 'Rooster' },
      medial: { prefix: 'هـ', letter: 'ـد', suffix: 'هـد', translation: 'Hoopoe' },
      final: { prefix: 'ولـ', letter: 'ـد', suffix: '', translation: 'Boy' }
    }
  },
  {
    id: 9, name: 'Thal', isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ', transliteration: 'dh', description: 'Like the "th" in "that".',
    examples: {
      isolated: { prefix: 'أستا', letter: 'ذ', suffix: '', translation: 'Teacher' },
      initial: { prefix: '', letter: 'ذ', suffix: 'ئب', translation: 'Wolf' },
      medial: { prefix: 'حـ', letter: 'ـذ', suffix: 'اء', translation: 'Shoe' },
      final: { prefix: 'لذيـ', letter: 'ـذ', suffix: '', translation: 'Delicious' }
    }
  },
  {
    id: 10, name: 'Ra', isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر', transliteration: 'r', description: 'A trilled or rolled "R".',
    examples: {
      isolated: { prefix: 'زهو', letter: 'ر', suffix: '', translation: 'Flowers' },
      initial: { prefix: '', letter: 'ر', suffix: 'مان', translation: 'Pomegranate' },
      medial: { prefix: 'جـ', letter: 'ـر', suffix: 'س', translation: 'Bell' },
      final: { prefix: 'تمـ', letter: 'ـر', suffix: '', translation: 'Dates' }
    }
  },
];
