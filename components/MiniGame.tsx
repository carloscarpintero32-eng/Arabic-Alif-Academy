
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ALPHABET_DATA } from '../constants';
import { ArabicLetter, LetterPosition } from '../types';
import { speechService } from '../services/geminiService';
import { AlertCircle, Grid, CheckCircle2, RotateCcw, LogOut, Trophy, XCircle, ArrowRight } from 'lucide-react';

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
  const [userGuessId, setUserGuessId] = useState<number | null>(null);
  const [isRoundResolved, setIsRoundResolved] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const pool = useMemo(() => {
    // Determine pool size based on batchIndex (7 letters per batch)
    const currentBatchStart = batchIndex * 7;
    const currentBatchEnd = (batchIndex + 1) * 7;
    
    if (batchIndex === 0) return ALPHABET_DATA.slice(0, 7);
    return testMode === 'current' 
      ? ALPHABET_DATA.slice(currentBatchStart, currentBatchEnd) 
      : ALPHABET_DATA.slice(0, currentBatchEnd);
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

  const handleGuess = (letter: ArabicLetter) => {
    if (isRoundResolved) return;

    setUserGuessId(letter.id);
    setIsRoundResolved(true);

    if (letter.id === question.targetLetter.id) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentRound < 9) {
      setCurrentRound(prev => prev + 1);
      setQuestion(generateQuestion());
      setUserGuessId(null);
      setIsRoundResolved(false);
    } else {
      setIsFinished(true);
      // Final feedback
      const finalScore = score + (userGuessId === question.targetLetter.id ? 0 : 0); // score already updated in handleGuess
      speechService.speak(`Game over! You scored ${score} out of 10.`);
    }
  };

  const handlePlayAgain = () => {
    setCurrentRound(0);
    setScore(0);
    setUserGuessId(null);
    setIsRoundResolved(false);
    setIsFinished(false);
    setQuestion(generateQuestion());
  };

  if (isFinished) {
    const isPassing = score > 5;

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
            You scored <span className="text-indigo-600 font-black">{score}/10</span>
          </p>
        </div>

        <div className="flex flex-col space-y-4 w-full max-w-xs">
          <button
            onClick={handlePlayAgain}
            className="flex items-center justify-center space-x-3 bg-indigo-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-indigo-700 transition-all shadow-lg transform hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-6 h-6" />
            <span>Play Again</span>
          </button>
          
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

  const isCorrect = userGuessId === question.targetLetter.id;

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
        <div className={`bg-white border-4 ${isRoundResolved ? (isCorrect ? 'border-green-500' : 'border-red-500') : 'border-indigo-600'} w-44 h-44 rounded-[2.5rem] flex items-center justify-center shadow-xl transform transition-all duration-500`}>
          <span className={`text-8xl arabic-text text-indigo-700 transition-opacity duration-300 ${isRoundResolved ? 'opacity-50' : 'opacity-100'}`}>
            {question.targetLetter[question.targetForm]}
          </span>
          {isRoundResolved && isCorrect && (
            <div className="absolute inset-0 flex items-center justify-center animate-scaleIn">
              <CheckCircle2 className="w-24 h-24 text-green-500" />
            </div>
          )}
          {isRoundResolved && !isCorrect && (
            <div className="absolute inset-0 flex items-center justify-center animate-scaleIn">
              <XCircle className="w-24 h-24 text-red-500" />
            </div>
          )}
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap">
          {question.targetForm} form
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full px-2 mb-8">
        {question.options.map((letter) => {
          const isSelected = userGuessId === letter.id;
          const isTarget = letter.id === question.targetLetter.id;
          
          let cardStyle = "bg-white border-indigo-100 text-slate-700 hover:border-indigo-400 hover:shadow-lg";
          
          if (isRoundResolved) {
            if (isTarget) {
              cardStyle = "bg-green-50 border-green-500 text-green-700 shadow-md ring-4 ring-green-100";
            } else if (isSelected && !isTarget) {
              cardStyle = "bg-red-50 border-red-500 text-red-700 opacity-80";
            } else {
              cardStyle = "bg-white border-slate-100 text-slate-300 opacity-40";
            }
          }

          return (
            <button
              key={letter.id}
              onClick={() => handleGuess(letter)}
              disabled={isRoundResolved}
              className={`p-6 rounded-3xl border-2 transition-all transform active:scale-95 text-center flex flex-col items-center justify-center h-32 relative overflow-hidden ${cardStyle}`}
            >
              <span className="text-3xl font-black mb-1">{letter.name}</span>
              <span className="text-lg arabic-text opacity-40">{letter.isolated}</span>
              {isRoundResolved && isSelected && !isTarget && <XCircle className="absolute top-2 right-2 w-4 h-4 text-red-400" />}
              {isRoundResolved && isTarget && <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-green-500" />}
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 w-full flex flex-col items-center space-y-4">
        {isRoundResolved && (
          <button
            onClick={handleNext}
            className="flex items-center space-x-3 bg-indigo-600 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:bg-indigo-700 transition-all shadow-lg animate-fadeIn transform hover:scale-105 active:scale-95"
          >
            <span>{currentRound < 9 ? 'Next Question' : 'See Final Score'}</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        )}
        
        <button
          onClick={onBackToModules}
          className="flex items-center space-x-2 bg-white border-2 border-slate-200 text-slate-400 px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
        >
          <Grid className="w-4 h-4" />
          <span>Back to Modules</span>
        </button>
      </div>
    </div>
  );
};
