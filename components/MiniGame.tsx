
import React, { useState, useCallback, useMemo } from 'react';
import { ALPHABET_DATA } from '../constants';
import { ArabicLetter, LetterPosition } from '../types';
import { speechService } from '../services/geminiService';
import { AlertCircle, Grid as GridIcon, CheckCircle2, RotateCcw, LogOut, Trophy, XCircle, ArrowRight, Volume1 } from 'lucide-react';

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

  const handleGuess = (letter: ArabicLetter) => {
    if (isRoundResolved) return;
    setUserGuessId(letter.id);
    setIsRoundResolved(true);
    if (letter.id === question.targetLetter.id) setScore(prev => prev + 1);
  };

  const playTargetWord = useCallback(() => {
    const example = question.targetLetter.examples[question.targetForm];
    const word = `${example.prefix}${example.letter}${example.suffix}`;
    speechService.speak(word);
  }, [question]);

  const handleNext = () => {
    if (currentRound < 9) {
      setCurrentRound(prev => prev + 1);
      setQuestion(generateQuestion());
      setUserGuessId(null);
      setIsRoundResolved(false);
    } else {
      setIsFinished(true);
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
      <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn h-full py-6">
        <div className={`p-5 rounded-full ${isPassing ? 'bg-green-100' : 'bg-amber-100'}`}>
          {isPassing ? (
            <Trophy className="w-16 h-16 text-green-600 animate-bounce" />
          ) : (
            <AlertCircle className="w-16 h-16 text-amber-600" />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-800">{isPassing ? 'Mabrouk!' : 'Try Again!'}</h2>
          <p className="text-lg text-slate-500 font-bold">Score: {score} / 10</p>
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <button
            onClick={handlePlayAgain}
            className="flex items-center justify-center space-x-3 bg-indigo-600 text-white p-5 rounded-2xl text-lg font-black hover:bg-indigo-700 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          <button
            onClick={onExit}
            className="flex items-center justify-center space-x-3 bg-white border-2 border-slate-200 text-slate-600 p-4 rounded-2xl font-bold"
          >
            <LogOut className="w-5 h-5" />
            <span>Finish Practicing</span>
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = userGuessId === question.targetLetter.id;

  return (
    <div className="flex flex-col h-full animate-fadeIn items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <div className="text-xs font-black text-indigo-400 uppercase tracking-widest">
          Round {currentRound + 1} / 10
        </div>
        <div className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase">
          Score: {score}
        </div>
      </div>

      <div className="relative mb-8">
        <button 
          onClick={playTargetWord}
          className={`bg-white border-4 ${isRoundResolved ? (isCorrect ? 'border-green-500' : 'border-red-500') : 'border-indigo-600'} w-40 h-40 rounded-[2.5rem] flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95 group relative`}
        >
          <span className={`text-7xl arabic-text text-indigo-700 transition-opacity ${isRoundResolved ? 'opacity-40' : 'opacity-100'}`}>
            {question.targetLetter[question.targetForm]}
          </span>
          <Volume1 className="absolute top-4 right-4 w-5 h-5 text-indigo-300 group-hover:text-indigo-600 transition-colors" />
          {isRoundResolved && (
            <div className="absolute inset-0 flex items-center justify-center animate-scaleIn">
              {isCorrect ? <CheckCircle2 className="w-16 h-16 text-green-500" /> : <XCircle className="w-16 h-16 text-red-500" />}
            </div>
          )}
        </button>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
          {question.targetForm} form
        </div>
      </div>

      <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-4 text-center">
        Identify the letter<br/>
        <span className="text-[8px] text-slate-400 font-medium tracking-normal">(Tap tile to hear sample word)</span>
      </p>
      
      <div className="grid grid-cols-2 gap-3 w-full mb-6">
        {question.options.map((letter) => {
          const isSelected = userGuessId === letter.id;
          const isTarget = letter.id === question.targetLetter.id;
          let style = "bg-white border-slate-100 text-slate-700 active:scale-95";
          if (isRoundResolved) {
            if (isTarget) style = "bg-green-50 border-green-500 text-green-700";
            else if (isSelected) style = "bg-red-50 border-red-500 text-red-700";
            else style = "bg-slate-50 border-slate-50 text-slate-300 opacity-50";
          }
          return (
            <button
              key={letter.id}
              onClick={() => handleGuess(letter)}
              disabled={isRoundResolved}
              className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center h-24 relative ${style}`}
            >
              <span className="text-xl font-black">{letter.name}</span>
              <span className="text-sm arabic-text opacity-40">{letter.isolated}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pt-4 w-full flex flex-col items-center">
        {isRoundResolved ? (
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center space-x-3 bg-indigo-600 text-white p-5 rounded-2xl text-lg font-black hover:bg-indigo-700 shadow-lg animate-fadeIn"
          >
            <span>{currentRound < 9 ? 'Next Round' : 'Results'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onBackToModules}
            className="flex items-center space-x-2 text-slate-400 p-2 text-[10px] font-black uppercase tracking-widest"
          >
            <LogOut className="w-3 h-3" />
            <span>Abandon practice</span>
          </button>
        )}
      </div>
    </div>
  );
};
