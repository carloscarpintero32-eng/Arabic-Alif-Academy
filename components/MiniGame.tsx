
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ALPHABET_DATA } from '../constants';
import { ArabicLetter, LetterPosition } from '../types';
import { speechService } from '../services/geminiService';
import { AlertCircle, Grid, CheckCircle2, RotateCcw, LogOut, Trophy, XCircle } from 'lucide-react';

interface MiniGameProps {
  batchIndex: number;
  testMode: 'current' | 'all';
  onExit: () => void;
  onBackToModules: () => void;
}

interface Question {
  targetLetter: ArabicLetter;
  targetForm: LetterPosition;
  options: ArabicLetter[];
}

export const MiniGame: React.FC<MiniGameProps> = ({ batchIndex, testMode, onExit, onBackToModules }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number[]>([]);
  const [correctlyAnswered, setCorrectlyAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const pool = useMemo(() => {
    if (batchIndex === 0) return ALPHABET_DATA.slice(0, 5);
    return testMode === 'current' ? ALPHABET_DATA.slice(5, 10) : ALPHABET_DATA.slice(0, 10);
  }, [batchIndex, testMode]);

  const generateQuestion = useCallback((): Question => {
    const targetLetter = pool[Math.floor(Math.random() * pool.length)];
    const forms: LetterPosition[] = ['isolated', 'initial', 'medial', 'final'];
    const targetForm = forms[Math.floor(Math.random() * forms.length)];
    let options = [targetLetter];
    const otherLetters = pool.filter(l => l.id !== targetLetter.id);
    const shuffledOthers = [...otherLetters].sort(() => 0.5 - Math.random());
    options.push(...shuffledOthers.slice(0, 3));
    options = options.sort(() => 0.5 - Math.random());
    return { targetLetter, targetForm, options };
  }, [pool]);

  const [question, setQuestion] = useState<Question>(generateQuestion());

  useEffect(() => {
    if (!isFinished) {
      speechService.speak("Challenge time! Can you identify which letter this is?");
    }
  }, [isFinished]);

  const handleGuess = async (letter: ArabicLetter) => {
    if (correctlyAnswered || incorrectGuesses.includes(letter.id)) return;

    if (letter.id === question.targetLetter.id) {
      // Award point only if no wrong guesses were made this round
      if (incorrectGuesses.length === 0) {
        setScore(prev => prev + 1);
      }
      
      setCorrectlyAnswered(true);
      const congratulatoryPhrases = ["Good job!", "Well done!", "Fantastic!", "You got it!"];
      const speech = congratulatoryPhrases[Math.floor(Math.random() * congratulatoryPhrases.length)];
      await speechService.speak(speech);
      
      setTimeout(() => {
        if (currentRound < 9) {
          setCurrentRound(prev => prev + 1);
          setQuestion(generateQuestion());
          setIncorrectGuesses([]);
          setCorrectlyAnswered(false);
        } else {
          setIsFinished(true);
          speechService.speak(`Game over! You scored ${score + (incorrectGuesses.length === 0 ? 1 : 0)} out of 10.`);
        }
      }, 1500);
    } else {
      setIncorrectGuesses(prev => [...prev, letter.id]);
      speechService.speak("Not quite. Try again!");
    }
  };

  const handlePlayAgain = () => {
    setCurrentRound(0);
    setScore(0);
    setIncorrectGuesses([]);
    setCorrectlyAnswered(false);
    setIsFinished(false);
    setQuestion(generateQuestion());
  };

  if (isFinished) {
    const finalScore = score;
    const isPassing = finalScore > 5;

    return (
      <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn h-full py-10">
        <div className={`p-6 rounded-full ${isPassing ? 'bg-green-100' : 'bg-amber-100'}`}>
          {isPassing ? (
            <Trophy className="w-20 h-20 text-green-600 animate-bounce" />
          ) : (
            <AlertCircle className="w-20 h-20 text-amber-600" />
          )}
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-slate-800">
            {isPassing ? 'Mabrouk!' : 'Keep Practicing!'}
          </h2>
          <p className="text-xl text-slate-500 font-medium">
            You scored <span className="text-indigo-600 font-black">{finalScore}/10</span>
          </p>
        </div>

        <div className="flex flex-col space-y-4 w-full max-w-xs">
          {!isPassing && (
            <button
              onClick={handlePlayAgain}
              className="flex items-center justify-center space-x-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-indigo-700 transition-all shadow-lg transform hover:scale-105 active:scale-95"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Play Again</span>
            </button>
          )}
          
          <button
            onClick={onExit}
            className="flex items-center justify-center space-x-3 bg-white border-4 border-slate-200 text-slate-600 px-8 py-4 rounded-2xl text-xl font-bold hover:border-slate-800 hover:text-slate-800 transition-all shadow-sm"
          >
            <LogOut className="w-6 h-6" />
            <span>Exit Game</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-fadeIn items-center">
      <div className="w-full flex justify-between items-center mb-6 bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
        <div>
          <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tight">Mini Game</h2>
          <p className="text-xs font-bold text-indigo-400">ROUND {currentRound + 1} OF 10 • SCORE: {score}</p>
        </div>
        <div className="h-3 w-32 bg-white rounded-full overflow-hidden border border-indigo-200">
          <div 
            className="h-full bg-indigo-500 transition-all duration-700 ease-out" 
            style={{ width: `${((currentRound + 1) / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="relative mb-8 group">
        <div className={`bg-white border-4 ${correctlyAnswered ? 'border-green-500' : 'border-indigo-600'} w-44 h-44 rounded-[2.5rem] flex items-center justify-center shadow-xl transform transition-all duration-500`}>
          <span className={`text-8xl arabic-text text-indigo-700 transition-opacity duration-300 ${correctlyAnswered ? 'opacity-50' : 'opacity-100'}`}>
            {question.targetLetter[question.targetForm]}
          </span>
          {correctlyAnswered && (
            <div className="absolute inset-0 flex items-center justify-center animate-scaleIn">
              <CheckCircle2 className="w-24 h-24 text-green-500" />
            </div>
          )}
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap">
          {question.targetForm} form
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-2 mb-12">
        {question.options.map((letter) => {
          const isIncorrect = incorrectGuesses.includes(letter.id);
          return (
            <button
              key={letter.id}
              onClick={() => handleGuess(letter)}
              disabled={correctlyAnswered || isIncorrect}
              className={`p-6 rounded-3xl border-2 transition-all transform active:scale-95 text-center flex flex-col items-center justify-center h-32 relative overflow-hidden
                ${isIncorrect 
                  ? 'bg-red-50 border-red-200 text-red-300' 
                  : correctlyAnswered && letter.id === question.targetLetter.id
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-white border-indigo-100 text-slate-700 hover:border-indigo-400 hover:shadow-lg'
                }`}
            >
              <span className="text-3xl font-black mb-1">{letter.name}</span>
              <span className="text-lg arabic-text opacity-40">{letter.isolated}</span>
              {isIncorrect && <XCircle className="absolute top-2 right-2 w-4 h-4 text-red-400" />}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 w-full flex justify-center">
        <button
          onClick={onBackToModules}
          className="flex items-center space-x-2 bg-white border-2 border-slate-200 text-slate-500 px-6 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all"
        >
          <Grid className="w-5 h-5" />
          <span>Back to Modules</span>
        </button>
      </div>
    </div>
  );
};
