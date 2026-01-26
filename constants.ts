
import { ArabicLetter } from './types';

export const ALPHABET_DATA: ArabicLetter[] = [
  {
    id: 1, name: 'Alif', isolated: 'أ', initial: 'أ', medial: 'ـأ', final: 'ـأ', transliteration: 'a', 
    description: 'The first letter, often used as a carrier for vowels.',
    soundDescription: 'A short, sharp glottal stop or a short vowel sound.',
    englishComparison: 'Like the "a" in "apple".',
    mouthTips: 'Keep your throat relaxed and make a short, clean sound.',
    examples: {
      isolated: { prefix: '', letter: 'أ', suffix: 'رنب', translation: 'Rabbit' },
      initial: { prefix: '', letter: 'أ', suffix: 'سد', translation: 'Lion' },
      medial: { prefix: 'فـ', letter: 'ـأ', suffix: 'ر', translation: 'Mouse' },
      final: { prefix: 'مرفـ', letter: 'ـأ', suffix: '', translation: 'Port' }
    }
  },
  {
    id: 2, name: 'Ba', isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب', transliteration: 'b', 
    description: 'A simple labial sound.',
    soundDescription: 'A voiced bilabial plosive.',
    englishComparison: 'Exactly like the English "B" in "boat".',
    mouthTips: 'Press your lips together and release them quickly.',
    examples: {
      isolated: { prefix: 'با', letter: 'ب', suffix: '', translation: 'Door' },
      initial: { prefix: '', letter: 'بـ', suffix: 'نت', translation: 'Girl' },
      medial: { prefix: 'خـ', letter: 'ـبـ', suffix: 'ز', translation: 'Bread' },
      final: { prefix: 'كلـ', letter: 'ـب', suffix: '', translation: 'Dog' }
    }
  },
  {
    id: 3, name: 'Ta', isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت', transliteration: 't', 
    description: 'A light dental sound.',
    soundDescription: 'A voiceless dental plosive.',
    englishComparison: 'Like the English "T" in "tea".',
    mouthTips: 'Touch the tip of your tongue against the back of your upper front teeth.',
    examples: {
      isolated: { prefix: 'حو', letter: 'ت', suffix: '', translation: 'Whale' },
      initial: { prefix: '', letter: 'تـ', suffix: 'مساح', translation: 'Crocodile' },
      medial: { prefix: 'كـ', letter: 'ـتـ', suffix: 'اب', translation: 'Book' },
      final: { prefix: 'بيـ', letter: 'ـت', suffix: '', translation: 'House' }
    }
  },
  {
    id: 4, name: 'Tha', isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث', transliteration: 'th', 
    description: 'A soft interdental sound.',
    soundDescription: 'A voiceless interdental fricative.',
    englishComparison: 'Like the "th" in "think".',
    mouthTips: 'Place your tongue tip between your upper and lower front teeth.',
    examples: {
      isolated: { prefix: 'أثا', letter: 'ث', suffix: '', translation: 'Furniture' },
      initial: { prefix: '', letter: 'ثـ', suffix: 'علب', translation: 'Fox' },
      medial: { prefix: 'مـ', letter: 'ـثـ', suffix: 'ل', translation: 'Example' },
      final: { prefix: 'ليـ', letter: 'ـث', suffix: '', translation: 'Lion' }
    }
  },
  {
    id: 5, name: 'Jeem', isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج', transliteration: 'j', 
    description: 'A voiced palatal sound.',
    soundDescription: 'A voiced postalveolar affricate.',
    englishComparison: 'Like the "J" in "jam".',
    mouthTips: 'The middle of your tongue should touch the roof of your mouth.',
    examples: {
      isolated: { prefix: 'تا', letter: 'ج', suffix: '', translation: 'Crown' },
      initial: { prefix: '', letter: 'جـ', suffix: 'مل', translation: 'Camel' },
      medial: { prefix: 'شـ', letter: 'ـجـ', suffix: 'رة', translation: 'Tree' },
      final: { prefix: 'ثلـ', letter: 'ـج', suffix: '', translation: 'Snow' }
    }
  },
  {
    id: 6, name: 'Haa', isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح', transliteration: 'ḥ', 
    description: 'A deep breathy sound from the center of the throat.',
    soundDescription: 'A voiceless pharyngeal fricative.',
    englishComparison: 'Like the "H" in "hot" but much deeper and breathier.',
    mouthTips: 'Tighten your throat muscles slightly and exhale forcefully.',
    examples: {
      isolated: { prefix: 'تفا', letter: 'ح', suffix: '', translation: 'Apples' },
      initial: { prefix: '', letter: 'حـ', suffix: 'ليب', translation: 'Milk' },
      medial: { prefix: 'لـ', letter: 'ـحـ', suffix: 'م', translation: 'Meat' },
      final: { prefix: 'سبـ', letter: 'ـح', suffix: '', translation: 'Swim' }
    }
  },
  {
    id: 7, name: 'Khaa', isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ', transliteration: 'kh', 
    description: 'A raspy sound from the top of the throat.',
    soundDescription: 'A voiceless uvular fricative.',
    englishComparison: 'Similar to the "ch" in the German word "Bach".',
    mouthTips: 'Produce a raspy sound by vibrating the back of your tongue against the roof of your mouth.',
    examples: {
      isolated: { prefix: 'صارو', letter: 'خ', suffix: '', translation: 'Rocket' },
      initial: { prefix: '', letter: 'خـ', suffix: 'يمة', translation: 'Tent' },
      medial: { prefix: 'نـ', letter: 'ـخـ', suffix: 'لة', translation: 'Palm tree' },
      final: { prefix: 'مطبـ', letter: 'ـخ', suffix: '', translation: 'Kitchen' }
    }
  },
  {
    id: 8, name: 'Dal', isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد', transliteration: 'd', 
    description: 'A simple dental sound.',
    soundDescription: 'A voiced dental plosive.',
    englishComparison: 'Like the English "D" in "door".',
    mouthTips: 'Touch the tip of your tongue against the upper teeth.',
    examples: {
      isolated: { prefix: 'ور', letter: 'د', suffix: '', translation: 'Rose' },
      initial: { prefix: '', letter: 'د', suffix: 'يك', translation: 'Rooster' },
      medial: { prefix: 'هـ', letter: 'ـد', suffix: 'هـد', translation: 'Hoopoe' },
      final: { prefix: 'ولـ', letter: 'ـد', suffix: '', translation: 'Boy' }
    }
  },
  {
    id: 9, name: 'Thal', isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ', transliteration: 'dh', 
    description: 'A soft voiced interdental sound.',
    soundDescription: 'A voiced interdental fricative.',
    englishComparison: 'Like the "th" in "this".',
    mouthTips: 'Place your tongue tip between your front teeth, but add your voice to the sound.',
    examples: {
      isolated: { prefix: 'أستا', letter: 'ذ', suffix: '', translation: 'Teacher' },
      initial: { prefix: '', letter: 'ذ', suffix: 'ئب', translation: 'Wolf' },
      medial: { prefix: 'حـ', letter: 'ـذ', suffix: 'اء', translation: 'Shoe' },
      final: { prefix: 'لذيـ', letter: 'ـذ', suffix: '', translation: 'Delicious' }
    }
  },
  {
    id: 10, name: 'Ra', isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر', transliteration: 'r', 
    description: 'A vibrant or rolled sound.',
    soundDescription: 'An alveolar tap or trill.',
    englishComparison: 'Similar to the "r" in Spanish words like "pero".',
    mouthTips: 'Let the tip of your tongue tap the roof of your mouth quickly.',
    examples: {
      isolated: { prefix: 'زهو', letter: 'ر', suffix: '', translation: 'Flowers' },
      initial: { prefix: '', letter: 'ر', suffix: 'مان', translation: 'Pomegranate' },
      medial: { prefix: 'جـ', letter: 'ـر', suffix: 'س', translation: 'Bell' },
      final: { prefix: 'تمـ', letter: 'ـر', suffix: '', translation: 'Dates' }
    }
  },
  { 
    id: 11, name: 'Zay', isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز', transliteration: 'z', 
    description: 'Like the English "Z".', 
    soundDescription: 'Voiced alveolar fricative.', 
    englishComparison: 'Like "Z" in "zebra".', 
    mouthTips: 'Bring teeth close together and use your voice.', 
    examples: { 
      isolated: { prefix: 'أر', letter: 'ز', suffix: '', translation: 'Rice' }, 
      initial: { prefix: '', letter: 'ز', suffix: 'رافة', translation: 'Giraffe' }, 
      medial: { prefix: 'مـ', letter: 'ـز', suffix: 'رعة', translation: 'Farm' }, 
      final: { prefix: 'مو', letter: 'ز', suffix: '', translation: 'Banana' } 
    } 
  },
  { 
    id: 12, name: 'Seen', isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس', transliteration: 's', 
    description: 'Like the English "S".', 
    soundDescription: 'Voiceless alveolar fricative.', 
    englishComparison: 'Like "S" in "sun".', 
    mouthTips: 'Similar to "Z" but without using your voice.', 
    examples: { 
      isolated: { prefix: 'فأ', letter: 'س', suffix: '', translation: 'Axe' }, 
      initial: { prefix: '', letter: 'سـ', suffix: 'مكة', translation: 'Fish' }, 
      medial: { prefix: 'مـ', letter: 'ـسـ', suffix: 'جد', translation: 'Mosque' }, 
      final: { prefix: 'شمـ', letter: 'ـس', suffix: '', translation: 'Sun' } 
    } 
  },
  { 
    id: 13, name: 'Sheen', isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش', transliteration: 'sh', 
    description: 'Like the English "Sh".', 
    soundDescription: 'Voiceless postalveolar fricative.', 
    englishComparison: 'Like "Sh" in "ship".', 
    mouthTips: 'Pucker your lips slightly and push air through.', 
    examples: { 
      isolated: { prefix: 'فرا', letter: 'ش', suffix: '', translation: 'Butterfly' }, 
      initial: { prefix: '', letter: 'شـ', suffix: 'مس', translation: 'Sun' }, 
      medial: { prefix: 'مـ', letter: 'ـشـ', suffix: 'ط', translation: 'Comb' }, 
      final: { prefix: 'عـ', letter: 'ـش', suffix: '', translation: 'Nest' } 
    } 
  },
  { 
    id: 14, name: 'Saad', isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص', transliteration: 'ṣ', 
    description: 'An emphatic "S" sound.', 
    soundDescription: 'Voiceless alveolar emphatic fricative.', 
    englishComparison: 'A heavier, deeper "S" sound.', 
    mouthTips: 'Lift the back of your tongue toward the roof while saying "S".', 
    examples: { 
      isolated: { prefix: 'قفـ', letter: 'ص', suffix: '', translation: 'Cage' }, 
      initial: { prefix: '', letter: 'صـ', suffix: 'قر', translation: 'Falcon' }, 
      medial: { prefix: 'بـ', letter: 'ـصـ', suffix: 'ل', translation: 'Onion' }, 
      final: { prefix: 'مـقـ', letter: 'ـص', suffix: '', translation: 'Scissors' } 
    } 
  },
  { 
    id: 15, name: 'Daad', isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض', transliteration: 'ḍ', 
    description: 'An emphatic "D" sound.', 
    soundDescription: 'Voiced alveolar emphatic plosive.', 
    englishComparison: 'A heavier, deeper "D" sound.', 
    mouthTips: 'Press the side of your tongue against your upper molars.', 
    examples: { 
      isolated: { prefix: 'بيـ', letter: 'ض', suffix: '', translation: 'Eggs' }, 
      initial: { prefix: '', letter: 'ضـ', suffix: 'فدع', translation: 'Frog' }, 
      medial: { prefix: 'خـ', letter: 'ـضـ', suffix: 'راء', translation: 'Green' }, 
      final: { prefix: 'مريـ', letter: 'ـض', suffix: '', translation: 'Sick' } 
    } 
  },
  { 
    id: 16, name: 'Taa', isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط', transliteration: 'ṭ', 
    description: 'An emphatic "T" sound.', 
    soundDescription: 'Voiceless alveolar emphatic plosive.', 
    englishComparison: 'A heavier, deeper "T" sound.', 
    mouthTips: 'Similar to "T" but with the back of the tongue raised.', 
    examples: { 
      isolated: { prefix: 'اخطبو', letter: 'ط', suffix: '', translation: 'Octopus' }, 
      initial: { prefix: '', letter: 'طـ', suffix: 'يارة', translation: 'Plane' }, 
      medial: { prefix: 'قـ', letter: 'ـطـ', suffix: 'ار', translation: 'Train' }, 
      final: { prefix: 'بـ', letter: 'ـط', suffix: '', translation: 'Duck' } 
    } 
  },
  { 
    id: 17, name: 'Zaa', isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ', transliteration: 'ẓ', 
    description: 'An emphatic "Dh" sound.', 
    soundDescription: 'Voiced dental emphatic fricative.', 
    englishComparison: 'A heavy, emphatic "Dh" sound.', 
    mouthTips: 'Similar to "Dh" but with the back of the tongue raised.', 
    examples: { 
      isolated: { prefix: 'لفـ', letter: 'ظ', suffix: '', translation: 'Word' }, 
      initial: { prefix: '', letter: 'ظـ', suffix: 'رف', translation: 'Envelope' }, 
      medial: { prefix: 'نـ', letter: 'ـظـ', suffix: 'ارة', translation: 'Glasses' }, 
      final: { prefix: 'حـفـ', letter: 'ـظ', suffix: '', translation: 'Keep' } 
    } 
  },
  { 
    id: 18, name: 'Ayn', isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع', transliteration: 'ʿ', 
    description: 'A deep guttural sound from the throat.', 
    soundDescription: 'Voiced pharyngeal fricative.', 
    englishComparison: 'A deep squeeze in the throat.', 
    mouthTips: 'Constrict the middle of your throat as if you are swallowing.', 
    examples: { 
      isolated: { prefix: 'ذرا', letter: 'ع', suffix: '', translation: 'Arm' }, 
      initial: { prefix: '', letter: 'عـ', suffix: 'ين', translation: 'Eye' }, 
      medial: { prefix: 'ثـ', letter: 'ـعـ', suffix: 'لب', translation: 'Fox' }, 
      final: { prefix: 'إصبـ', letter: 'ـع', suffix: '', translation: 'Finger' } 
    } 
  },
  { 
    id: 19, name: 'Ghayn', isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ', transliteration: 'gh', 
    description: 'A gargling sound.', 
    soundDescription: 'Voiced uvular fricative.', 
    englishComparison: 'Like the French "R" or a gargling sound.', 
    mouthTips: 'Similar to "Kh" but with your voice added.', 
    examples: { 
      isolated: { prefix: 'دما', letter: 'غ', suffix: '', translation: 'Brain' }, 
      initial: { prefix: '', letter: 'غـ', suffix: 'زال', translation: 'Gazelle' }, 
      medial: { prefix: 'بـ', letter: 'ـغـ', suffix: 'باء', translation: 'Parrot' }, 
      final: { prefix: 'صمـ', letter: 'ـغ', suffix: '', translation: 'Glue' } 
    } 
  },
  { 
    id: 20, name: 'Fa', isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف', transliteration: 'f', 
    description: 'Like the English "F".', 
    soundDescription: 'Voiceless labiodental fricative.', 
    englishComparison: 'Like "F" in "fish".', 
    mouthTips: 'Top teeth on your bottom lip.', 
    examples: { 
      isolated: { prefix: 'خرو', letter: 'ف', suffix: '', translation: 'Sheep' }, 
      initial: { prefix: '', letter: 'فـ', suffix: 'يل', translation: 'Elephant' }, 
      medial: { prefix: 'سـ', letter: 'ـفـ', suffix: 'ينة', translation: 'Ship' }, 
      final: { prefix: 'أنـ', letter: 'ـف', suffix: '', translation: 'Nose' } 
    } 
  },
  { 
    id: 21, name: 'Qaaf', isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق', transliteration: 'q', 
    description: 'A deep "K" sound.', 
    soundDescription: 'Voiceless uvular plosive.', 
    englishComparison: 'A deep "K" from the very back of the mouth.', 
    mouthTips: 'Drop the back of your tongue as far back as possible.', 
    examples: { 
      isolated: { prefix: 'سو', letter: 'ق', suffix: '', translation: 'Market' }, 
      initial: { prefix: '', letter: 'قـ', suffix: 'لم', translation: 'Pen' }, 
      medial: { prefix: 'بـ', letter: 'ـقـ', suffix: 'رة', translation: 'Cow' }, 
      final: { prefix: 'فـريـ', letter: 'ـق', suffix: '', translation: 'Team' } 
    } 
  },
  { 
    id: 22, name: 'Kaaf', isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك', transliteration: 'k', 
    description: 'Like the English "K".', 
    soundDescription: 'Voiceless velar plosive.', 
    englishComparison: 'Like "K" in "kite".', 
    mouthTips: 'Similar to "Q" but further forward in the mouth.', 
    examples: { 
      isolated: { prefix: 'شبا', letter: 'ك', suffix: '', translation: 'Window' }, 
      initial: { prefix: '', letter: 'كـ', suffix: 'تاب', translation: 'Book' }, 
      medial: { prefix: 'مـ', letter: 'ـكـ', suffix: 'تب', translation: 'Desk' }, 
      final: { prefix: 'سـمـ', letter: 'ـك', suffix: '', translation: 'Fish' } 
    } 
  },
  { 
    id: 23, name: 'Laam', isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل', transliteration: 'l', 
    description: 'Like the English "L".', 
    soundDescription: 'Alveolar lateral approximant.', 
    englishComparison: 'Like "L" in "light".', 
    mouthTips: 'Touch the roof of your mouth just behind the front teeth.', 
    examples: { 
      isolated: { prefix: 'برتقا', letter: 'ل', suffix: '', translation: 'Orange' }, 
      initial: { prefix: '', letter: 'لـ', suffix: 'يمون', translation: 'Lemon' }, 
      medial: { prefix: 'عـ', letter: 'ـلـ', suffix: 'م', translation: 'Flag' }, 
      final: { prefix: 'جـمـ', letter: 'ـل', suffix: '', translation: 'Camel' } 
    } 
  },
  { 
    id: 24, name: 'Meem', isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم', transliteration: 'm', 
    description: 'Like the English "M".', 
    soundDescription: 'Bilabial nasal.', 
    englishComparison: 'Like "M" in "moon".', 
    mouthTips: 'Close your lips and let the sound come through your nose.', 
    examples: { 
      isolated: { prefix: 'رسا', letter: 'م', suffix: '', translation: 'Painter' }, 
      initial: { prefix: '', letter: 'مـ', suffix: 'وز', translation: 'Banana' }, 
      medial: { prefix: 'سـ', letter: 'ـمـ', suffix: 'كة', translation: 'Fish' }, 
      final: { prefix: 'قـلـ', letter: 'ـم', suffix: '', translation: 'Pen' } 
    } 
  },
  { 
    id: 25, name: 'Noon', isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن', transliteration: 'n', 
    description: 'Like the English "N".', 
    soundDescription: 'Alveolar nasal.', 
    englishComparison: 'Like "N" in "net".', 
    mouthTips: 'Touch the tip of your tongue to the roof of your mouth.', 
    examples: { 
      isolated: { prefix: 'رما', letter: 'ن', suffix: '', translation: 'Pomegranate' }, 
      initial: { prefix: '', letter: 'نـ', suffix: 'حلة', translation: 'Bee' }, 
      medial: { prefix: 'عـ', letter: 'ـنـ', suffix: 'ب', translation: 'Grapes' }, 
      final: { prefix: 'سـفـيـ', letter: 'ـن', suffix: '', translation: 'Ship' } 
    } 
  },
  { 
    id: 26, name: 'He', isolated: 'هـ', initial: 'هـ', medial: 'ـهـ', final: 'ـه', transliteration: 'h', 
    description: 'Like the English "H".', 
    soundDescription: 'Voiceless glottal fricative.', 
    englishComparison: 'Like "H" in "hello".', 
    mouthTips: 'A soft, airy sound from the back of the throat.', 
    examples: { 
      isolated: { prefix: 'ميا', letter: 'ه', suffix: '', translation: 'Waters' }, 
      initial: { prefix: '', letter: 'هـ', suffix: 'لال', translation: 'Crescent' }, 
      medial: { prefix: 'نـ', letter: 'ـهـ', suffix: 'ر', translation: 'River' }, 
      final: { prefix: 'وجـ', letter: 'ـه', suffix: '', translation: 'Face' } 
    } 
  },
  { 
    id: 27, name: 'Waw', isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو', transliteration: 'w', 
    description: 'Like the English "W".', 
    soundDescription: 'Labio-velar approximant.', 
    englishComparison: 'Like "W" in "water" or "oo" in "moon".', 
    mouthTips: 'Round your lips into a small circle.', 
    examples: { 
      isolated: { prefix: 'دلـ', letter: 'و', suffix: '', translation: 'Bucket' }, 
      initial: { prefix: '', letter: 'و', suffix: 'رد', translation: 'Rose' }, 
      medial: { prefix: 'د', letter: 'ـو', suffix: 'رة', translation: 'Turn' }, 
      final: { prefix: 'بـهـ', letter: 'ـو', suffix: '', translation: 'Lobby' } 
    } 
  },
  { 
    id: 28, name: 'Ya', isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي', transliteration: 'y', 
    description: 'Like the English "Y".', 
    soundDescription: 'Palatal approximant.', 
    englishComparison: 'Like "Y" in "yellow" or "ee" in "feet".', 
    mouthTips: 'Keep the sides of your tongue against your upper molars.', 
    examples: { 
      isolated: { prefix: 'كرسـ', letter: 'ي', suffix: '', translation: 'Chair' }, 
      initial: { prefix: '', letter: 'يـ', suffix: 'د', translation: 'Hand' }, 
      medial: { prefix: 'بـ', letter: 'ـيـ', suffix: 'ت', translation: 'House' }, 
      final: { prefix: 'ظـبـ', letter: 'ـي', suffix: '', translation: 'Deer' } 
    } 
  },
];
