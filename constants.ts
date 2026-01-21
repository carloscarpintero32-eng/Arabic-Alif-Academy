
import { ArabicLetter } from './types';

export const ALPHABET_DATA: ArabicLetter[] = [
  {
    id: 1, name: 'Alif', isolated: 'أ', initial: 'أ', medial: 'ـأ', final: 'ـأ', transliteration: 'a', description: 'The first letter, often used as a carrier for vowels.',
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
      isolated: { prefix: 'أثا', letter: 'ث', suffix: '', translation: 'Furniture' },
      initial: { prefix: '', letter: 'ثـ', suffix: 'علب', translation: 'Fox' },
      medial: { prefix: 'مـ', letter: 'ـثـ', suffix: 'ل', translation: 'Example' },
      final: { prefix: 'ليـ', letter: 'ـث', suffix: '', translation: 'Lion' }
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
      isolated: { prefix: 'ملح', letter: '', suffix: '', translation: 'Salt' },
      initial: { prefix: '', letter: 'حـ', suffix: 'ليب', translation: 'Milk' },
      medial: { prefix: 'لـ', letter: 'ـحـ', suffix: 'م', translation: 'Meat' },
      final: { prefix: 'سبـ', letter: 'ـح', suffix: '', translation: 'Swim' }
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
    id: 8, name: 'Dal', isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد', transliteration: 'd', description: 'Like the English "D". Does not connect to the left.',
    examples: {
      isolated: { prefix: 'ور', letter: 'د', suffix: '', translation: 'Rose' },
      initial: { prefix: '', letter: 'د', suffix: 'يك', translation: 'Rooster' },
      medial: { prefix: 'هـ', letter: 'ـد', suffix: 'هـد', translation: 'Hoopoe' },
      final: { prefix: 'ولـ', letter: 'ـد', suffix: '', translation: 'Boy' }
    }
  },
  {
    id: 9, name: 'Thal', isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ', transliteration: 'dh', description: 'Like "th" in "that". Does not connect to the left.',
    examples: {
      isolated: { prefix: 'أستا', letter: 'ذ', suffix: '', translation: 'Teacher' },
      initial: { prefix: '', letter: 'ذ', suffix: 'ئب', translation: 'Wolf' },
      medial: { prefix: 'حـ', letter: 'ـذ', suffix: 'اء', translation: 'Shoe' },
      final: { prefix: 'لذيـ', letter: 'ـذ', suffix: '', translation: 'Delicious' }
    }
  },
  {
    id: 10, name: 'Ra', isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر', transliteration: 'r', description: 'A trilled or rolled "R". Does not connect to the left.',
    examples: {
      isolated: { prefix: 'زهو', letter: 'ر', suffix: '', translation: 'Flowers' },
      initial: { prefix: '', letter: 'ر', suffix: 'مان', translation: 'Pomegranate' },
      medial: { prefix: 'جـ', letter: 'ـر', suffix: 'س', translation: 'Bell' },
      final: { prefix: 'تمـ', letter: 'ـر', suffix: '', translation: 'Dates' }
    }
  },
  { id: 11, name: 'Zay', isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز', transliteration: 'z', description: 'Like the English "Z".', examples: { isolated: { prefix: 'أر', letter: 'ز', suffix: '', translation: 'Rice' }, initial: { prefix: '', letter: 'ز', suffix: 'رافة', translation: 'Giraffe' }, medial: { prefix: 'مـ', letter: 'ـز', suffix: 'رعة', translation: 'Farm' }, final: { prefix: 'مو', letter: 'ـز', suffix: '', translation: 'Banana' } } },
  { id: 12, name: 'Seen', isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس', transliteration: 's', description: 'Like the English "S".', examples: { isolated: { prefix: 'فأ', letter: 'س', suffix: '', translation: 'Axe' }, initial: { prefix: '', letter: 'سـ', suffix: 'مكة', translation: 'Fish' }, medial: { prefix: 'مـ', letter: 'ـسـ', suffix: 'جد', translation: 'Mosque' }, final: { prefix: 'شمـ', letter: 'ـس', suffix: '', translation: 'Sun' } } },
  { id: 13, name: 'Sheen', isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش', transliteration: 'sh', description: 'Like the English "Sh".', examples: { isolated: { prefix: 'عر', letter: 'ش', suffix: '', translation: 'Throne' }, initial: { prefix: '', letter: 'شـ', suffix: 'مس', translation: 'Sun' }, medial: { prefix: 'مـ', letter: 'ـشـ', suffix: 'ط', translation: 'Comb' }, final: { prefix: 'عـ', letter: 'ـش', suffix: '', translation: 'Nest' } } },
  { id: 14, name: 'Saad', isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص', transliteration: 'ṣ', description: 'An emphatic "S" sound.', examples: { isolated: { prefix: 'قـفـ', letter: 'ص', suffix: '', translation: 'Cage' }, initial: { prefix: '', letter: 'صـ', suffix: 'قر', translation: 'Falcon' }, medial: { prefix: 'بـ', letter: 'ـصـ', suffix: 'ل', translation: 'Onion' }, final: { prefix: 'مـقـ', letter: 'ـص', suffix: '', translation: 'Scissors' } } },
  { id: 15, name: 'Daad', isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض', transliteration: 'ḍ', description: 'An emphatic "D" sound.', examples: { isolated: { prefix: 'بيـ', letter: 'ض', suffix: '', translation: 'Eggs' }, initial: { prefix: '', letter: 'ضـ', suffix: 'فدع', translation: 'Frog' }, medial: { prefix: 'خـ', letter: 'ـضـ', suffix: 'راء', translation: 'Green' }, final: { prefix: 'مريـ', letter: 'ـض', suffix: '', translation: 'Sick' } } },
  { id: 16, name: 'Taa', isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط', transliteration: 'ṭ', description: 'An emphatic "T" sound.', examples: { isolated: { prefix: 'بطو', letter: 'ط', suffix: '', translation: 'Ducks' }, initial: { prefix: '', letter: 'طـ', suffix: 'يارة', translation: 'Plane' }, medial: { prefix: 'قـ', letter: 'ـطـ', suffix: 'ار', translation: 'Train' }, final: { prefix: 'بـ', letter: 'ـط', suffix: '', translation: 'Duck' } } },
  { id: 17, name: 'Zaa', isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ', transliteration: 'ẓ', description: 'An emphatic "Z" or "Dh" sound.', examples: { isolated: { prefix: 'عـظـ', letter: 'ظ', suffix: '', translation: 'Great' }, initial: { prefix: '', letter: 'ظـ', suffix: 'رف', translation: 'Envelope' }, medial: { prefix: 'نـ', letter: 'ـظـ', suffix: 'ارة', translation: 'Glasses' }, final: { prefix: 'حـفـ', letter: 'ـظ', suffix: '', translation: 'Keep' } } },
  { id: 18, name: 'Ayn', isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع', transliteration: 'ʿ', description: 'A deep guttural sound from the throat.', examples: { isolated: { prefix: 'مرا', letter: 'ع', suffix: '', translation: 'Pastures' }, initial: { prefix: '', letter: 'عـ', suffix: 'ين', translation: 'Eye' }, medial: { prefix: 'ثـ', letter: 'ـعـ', suffix: 'لب', translation: 'Fox' }, final: { prefix: 'إصبـ', letter: 'ـع', suffix: '', translation: 'Finger' } } },
  { id: 19, name: 'Ghayn', isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ', transliteration: 'gh', description: 'A gargling sound like the French "R".', examples: { isolated: { prefix: 'صمـ', letter: 'غ', suffix: '', translation: 'Glue' }, initial: { prefix: '', letter: 'غـ', suffix: 'زال', translation: 'Gazelle' }, medial: { prefix: 'بـ', letter: 'ـغـ', suffix: 'باء', translation: 'Parrot' }, final: { prefix: 'مبـلـ', letter: 'ـغ', suffix: '', translation: 'Amount' } } },
  { id: 20, name: 'Fa', isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف', transliteration: 'f', description: 'Like the English "F".', examples: { isolated: { prefix: 'رفو', letter: 'ف', suffix: '', translation: 'Shelves' }, initial: { prefix: '', letter: 'فـ', suffix: 'يل', translation: 'Elephant' }, medial: { prefix: 'سـ', letter: 'ـفـ', suffix: 'ينة', translation: 'Ship' }, final: { prefix: 'أنـ', letter: 'ـف', suffix: '', translation: 'Nose' } } },
  { id: 21, name: 'Qaaf', isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق', transliteration: 'q', description: 'A deep "K" sound from the back of the throat.', examples: { isolated: { prefix: 'أورا', letter: 'ق', suffix: '', translation: 'Papers' }, initial: { prefix: '', letter: 'قـ', suffix: 'لم', translation: 'Pen' }, medial: { prefix: 'بـ', letter: 'ـقـ', suffix: 'رة', translation: 'Cow' }, final: { prefix: 'فـريـ', letter: 'ـق', suffix: '', translation: 'Team' } } },
  { id: 22, name: 'Kaaf', isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك', transliteration: 'k', description: 'Like the English "K".', examples: { isolated: { prefix: 'ديـ', letter: 'ك', suffix: '', translation: 'Rooster' }, initial: { prefix: '', letter: 'كـ', suffix: 'تاب', translation: 'Book' }, medial: { prefix: 'مـ', letter: 'ـكـ', suffix: 'تب', translation: 'Desk' }, final: { prefix: 'سـمـ', letter: 'ـك', suffix: '', translation: 'Fish' } } },
  { id: 23, name: 'Laam', isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل', transliteration: 'l', description: 'Like the English "L".', examples: { isolated: { prefix: 'رما', letter: 'ل', suffix: '', translation: 'Sands' }, initial: { prefix: '', letter: 'لـ', suffix: 'يمون', translation: 'Lemon' }, medial: { prefix: 'عـ', letter: 'ـلـ', suffix: 'م', translation: 'Flag' }, final: { prefix: 'جـمـ', letter: 'ـل', suffix: '', translation: 'Camel' } } },
  { id: 24, name: 'Meem', isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم', transliteration: 'm', description: 'Like the English "M".', examples: { isolated: { prefix: 'قـلـ', letter: 'م', suffix: '', translation: 'Pen' }, initial: { prefix: '', letter: 'مـ', suffix: 'وز', translation: 'Banana' }, medial: { prefix: 'سـ', letter: 'ـمـ', suffix: 'كة', translation: 'Fish' }, final: { prefix: 'فـمـ', letter: 'ـم', suffix: '', translation: 'Mouth' } } },
  { id: 25, name: 'Noon', isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن', transliteration: 'n', description: 'Like the English "N".', examples: { isolated: { prefix: 'عيـ', letter: 'ن', suffix: '', translation: 'Eye' }, initial: { prefix: '', letter: 'نـ', suffix: 'حلة', translation: 'Bee' }, medial: { prefix: 'عـ', letter: 'ـنـ', suffix: 'ب', translation: 'Grapes' }, final: { prefix: 'سـفـيـ', letter: 'ـن', suffix: '', translation: 'Ship' } } },
  { id: 26, name: 'He', isolated: 'هـ', initial: 'هـ', medial: 'ـهـ', final: 'ـه', transliteration: 'h', description: 'Like the English "H".', examples: { isolated: { prefix: 'ميا', letter: 'ه', suffix: '', translation: 'Waters' }, initial: { prefix: '', letter: 'هـ', suffix: 'لال', translation: 'Crescent' }, medial: { prefix: 'نـ', letter: 'ـهـ', suffix: 'ر', translation: 'River' }, final: { prefix: 'وجـ', letter: 'ـه', suffix: '', translation: 'Face' } } },
  { id: 27, name: 'Waw', isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو', transliteration: 'w', description: 'Like the English "W" or a long "U".', examples: { isolated: { prefix: 'دلـ', letter: 'و', suffix: '', translation: 'Bucket' }, initial: { prefix: '', letter: 'و', suffix: 'رد', translation: 'Rose' }, medial: { prefix: 'د', letter: 'ـو', suffix: 'رة', translation: 'Turn' }, final: { prefix: 'بـهـ', letter: 'ـو', suffix: '', translation: 'Lobby' } } },
  { id: 28, name: 'Ya', isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي', transliteration: 'y', description: 'Like the English "Y" or a long "I".', examples: { isolated: { prefix: 'كرسـ', letter: 'ي', suffix: '', translation: 'Chair' }, initial: { prefix: '', letter: 'يـ', suffix: 'د', translation: 'Hand' }, medial: { prefix: 'بـ', letter: 'ـيـ', suffix: 'ت', translation: 'House' }, final: { prefix: 'ظـبـ', letter: 'ـي', suffix: '', translation: 'Deer' } } },
];
