
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ALPHABET_DATA } from '../constants';
import { ArabicLetter, LetterPosition } from '../types';
import { speechService } from '../services/geminiService';
import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

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
  const [incorrectGuesses, setIncorrectGuesses] = useState<number[]>([]);
  const [correctlyAnswered, setCorrectlyAnswered] = useState(false);
  
  const pool = useMemo(() => {
    if (batchIndex === 0) return ALPHABET_DATA.slice(0, 5);
    return testMode === 'current' ? ALPHABET_DATA.slice(5, 10) : ALPHABET_DATA.slice(0, 10);
  }, [batchIndex, testMode]);

  const generateQuestion = useCallback((): Question => {
    const targetLetter = pool[Math.floor(Math.random() * pool.length)];
    const forms: LetterPosition[] = ['isolated', 'initial', 'medial', 'final'];
    const targetForm = forms[Math.floor(Math.random() * forms.length)];
    
    // Shuffle options - ensure target is included
    let options = [...pool].sort(() => 0.5 - Math.random());
    // If pool is larger than 5, we might want to slice, but here it's 5 or 10.
    
    return { targetLetter, targetForm, options };
  }, [pool]);

  const [question, setQuestion] = useState<Question>(generateQuestion());

  useEffect(() => {
    speechService.speak("Challenge time! Can you identify which letter this is?");
  }, []);

  const handleGuess = async (letter: ArabicLetter) => {
    if (correctlyAnswered || incorrectGuesses.includes(letter.id)) return;

    if (letter.id === question.targetLetter.id) {
      setCorrectlyAnswered(true);
      const congratulatoryPhrases = ["Good job!", "Well done!", "Fantastic!", "You got it!", "Excellent work!"];
      const speech = congratulatoryPhrases[Math.floor(Math.random() * congratulatoryPhrases.length)];
      await speechService.speak(speech);
      
      setTimeout(() => {
        if (currentRound < 9) {
          setCurrentRound(prev => prev + 1);
          setQuestion(generateQuestion());
          setIncorrectGuesses([]);
          setCorrectlyAnswered(false);
        } else {
          finishGame();
        }
      }, 1500);
    } else {
      setIncorrectGuesses(prev => [...prev, letter.id]);
      speechService.speak("Not quite. Try again!");
    }
  };

  const finishGame = async () => {
    await speechService.speak("Congratulations on your achievement! You've mastered this set of letters.");
    onComplete();
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn items-center">
      <div className="w-full flex justify-between items-center mb-8 bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
        <div>
          <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tight">Mini Game</h2>
          <p className="text-xs font-bold text-indigo-400">ROUND {currentRound + 1} OF 10</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-3 w-32 bg-white rounded-full overflow-hidden border border-indigo-200">
            <div 
              className="h-full bg-green-500 transition-all duration-700 ease-out" 
              style={{ width: `${(currentRound / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="relative mb-12 group">
        <div className="bg-white border-4 border-indigo-600 w-52 h-52 rounded-[2.5rem] flex items-center justify-center shadow-xl transform transition-transform group-hover:rotate-2">
          <span className="text-9xl arabic-text text-indigo-700 animate-fadeIn">
            {question.targetLetter[question.targetForm]}
          </span>
        </div>
        <div className="absolute -bottom-4 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
          {question.targetForm} form
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full px-2">
        {question.options.map((letter) => {
          const isIncorrect = incorrectGuesses.includes(letter.id);
          const isCorrect = correctlyAnswered && letter.id === question.targetLetter.id;
          
          return (
            <button
              key={letter.id}
              onClick={() => handleGuess(letter)}
              disabled={correctlyAnswered}
              className={`
                h-28 rounded-3xl flex items-center justify-center text-4xl arabic-text font-bold transition-all transform active:scale-90 shadow-md border-b-4
                ${isCorrect ? 'bg-green-500 text-white border-green-700 scale-110 z-10' : ''}
                ${isIncorrect ? 'bg-red-500 text-white border-red-700 opacity-80 cursor-not-allowed animate-shake' : 'bg-white text-slate-700 border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50'}
              `}
            >
              {letter.isolated}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-8 flex items-center space-x-2 text-slate-500 font-bold uppercase text-xs tracking-widest">
        {correctlyAnswered ? (
          <div className="flex items-center text-green-600 animate-pulse">
            <Sparkles className="w-5 h-5 mr-2" />
            <span>Success! Next letter loading...</span>
          </div>
        ) : (
          <div className="flex items-center text-indigo-400">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>Identify the isolated form above</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};
