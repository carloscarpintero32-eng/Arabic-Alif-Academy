
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ALPHABET_DATA } from '../constants';
import { ArabicLetter, LetterPosition } from '../types';
import { speechService } from '../services/geminiService';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface MiniGameProps {
  batchIndex: number;
  testMode: 'current' | 'all';
  onComplete: () => void;
}

interface Question {
  targetLetter: ArabicLetter;
  targetForm: LetterPosition;
  options: ArabicLetter[];
}

export const MiniGame: React.FC<MiniGameProps> = ({ batchIndex, testMode, onComplete }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]); // Track incorrect guesses
  const [correctlyAnswered, setCorrectlyAnswered] = useState(false);
  
  const pool = useMemo(() => {
    if (batchIndex === 0) return ALPHABET_DATA.slice(0, 5);
    return testMode === 'current' ? ALPHABET_DATA.slice(5, 10) : ALPHABET_DATA.slice(0, 10);
  }, [batchIndex, testMode]);

  const generateQuestion = useCallback((): Question => {
    const targetLetter = pool[Math.floor(Math.random() * pool.length)];
    const forms: LetterPosition[] = ['isolated', 'initial', 'medial', 'final'];
    const targetForm = forms[Math.floor(Math.random() * forms.length)];
    
    // Shuffle options
    const options = [...pool].sort(() => 0.5 - Math.random());
    
    return { targetLetter, targetForm, options };
  }, [pool]);

  const [question, setQuestion] = useState<Question>(generateQuestion());

  useEffect(() => {
    speechService.speak("Which letter is this?");
  }, []);

  const handleGuess = async (letter: ArabicLetter) => {
    if (correctlyAnswered) return;

    if (letter.id === question.targetLetter.id) {
      setCorrectlyAnswered(true);
      const congratulatoryPhrases = ["Good job!", "Well done!", "Fantastic!", "You got it!", "Excellent work!"];
      const speech = congratulatoryPhrases[Math.floor(Math.random() * congratulatoryPhrases.length)];
      await speechService.speak(speech);
      
      setTimeout(() => {
        if (currentRound < 9) {
          setCurrentRound(currentRound + 1);
          setQuestion(generateQuestion());
          setSelectedLetters([]);
          setCorrectlyAnswered(false);
        } else {
          finishGame();
        }
      }, 1500);
    } else {
      setSelectedLetters([...selectedLetters, letter.id]);
      speechService.speak("Try again.");
    }
  };

  const finishGame = async () => {
    await speechService.speak("Congratulations on your achievement! You've mastered these letters.");
    onComplete();
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn items-center">
      <div className="w-full flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-slate-800">Identify the Letter</h2>
        <div className="flex items-center space-x-4">
          <div className="h-2 w-48 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500" 
              style={{ width: `${(currentRound / 10) * 100}%` }}
            ></div>
          </div>
          <span className="text-slate-500 font-bold">{currentRound + 1} / 10</span>
        </div>
      </div>

      <div className="bg-indigo-50 border-4 border-indigo-200 w-48 h-48 rounded-3xl flex items-center justify-center shadow-inner mb-12">
        <span className="text-8xl arabic-text text-indigo-700">
          {question.targetLetter[question.targetForm]}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full">
        {question.options.map((letter) => {
          const isIncorrect = selectedLetters.includes(letter.id);
          const isCorrect = correctlyAnswered && letter.id === question.targetLetter.id;
          
          return (
            <button
              key={letter.id}
              onClick={() => handleGuess(letter)}
              disabled={correctlyAnswered}
              className={`
                h-24 rounded-2xl flex items-center justify-center text-3xl arabic-text font-bold transition-all transform active:scale-95 shadow-md
                ${isCorrect ? 'bg-green-500 text-white border-green-600 scale-110' : ''}
                ${isIncorrect ? 'bg-red-100 text-red-500 border-red-200' : 'bg-white text-slate-700 border-2 border-indigo-50 hover:border-indigo-300'}
              `}
            >
              {letter.isolated}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-8 flex items-center space-x-2 text-slate-500 font-medium">
        {correctlyAnswered ? (
          <div className="flex items-center text-green-600 animate-bounce">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            <span>Moving to next question...</span>
          </div>
        ) : (
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-indigo-400" />
            <span>Select the matching letter shape</span>
          </div>
        )}
      </div>
    </div>
  );
};
