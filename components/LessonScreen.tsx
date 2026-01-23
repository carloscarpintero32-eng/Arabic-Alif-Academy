
import React, { useState, useCallback } from 'react';
import { ALPHABET_DATA } from '../constants';
import { speechService } from '../services/geminiService';
import { ArrowRight, PlayCircle, Volume2, Grid as GridIcon, Volume1 } from 'lucide-react';
import { Example } from '../types';

interface LessonScreenProps {
  batchIndex: number;
  onComplete: () => void;
  onBackToModules: () => void;
}

const HighlightedWord: React.FC<{ example: Example }> = ({ example }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xl arabic-text dir-rtl mb-0.5">
        <span className="text-slate-400">{example.prefix}</span>
        <span className="text-indigo-600 font-bold underline decoration-2 underline-offset-4">{example.letter}</span>
        <span className="text-slate-400">{example.suffix}</span>
      </div>
      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
        {example.translation}
      </div>
    </div>
  );
};

export const LessonScreen: React.FC<LessonScreenProps> = ({ batchIndex, onComplete, onBackToModules }) => {
  const letters = ALPHABET_DATA.slice(batchIndex * 7, (batchIndex + 1) * 7);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const currentLetter = letters[currentLetterIndex];

  const playInstruction = useCallback(async () => {
    if (isAudioPlaying || !currentLetter) return;
    
    setIsAudioPlaying(true);
    const text = `The letter ${currentLetter.name}. 
      It makes a ${currentLetter.soundDescription} sound. 
      It is ${currentLetter.englishComparison}. 
      Tip: ${currentLetter.mouthTips}. 
      Isolated: ${currentLetter.isolated}. 
      Initial: ${currentLetter.initial}. 
      Medial: ${currentLetter.medial}. 
      Final: ${currentLetter.final}.`;
    
    try {
      await speechService.speak(text);
    } finally {
      setIsAudioPlaying(false);
    }
  }, [currentLetter, isAudioPlaying]);

  const playWord = useCallback(async (example: Example) => {
    const word = `${example.prefix}${example.letter}${example.suffix}`;
    await speechService.speak(word);
  }, []);

  const handleNext = () => {
    speechService.stop();
    setIsAudioPlaying(false);
    if (currentLetterIndex < letters.length - 1) {
      setCurrentLetterIndex(currentLetterIndex + 1);
    } else {
      onComplete();
    }
  };

  if (!currentLetter) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      <div className="mb-4">
        <div className="flex justify-between items-baseline">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Letter {currentLetter.name}</h2>
          <span className="text-indigo-500 font-bold text-sm tracking-widest uppercase">
            {currentLetterIndex + 1} / {letters.length}
          </span>
        </div>
        <p className="text-slate-400 text-sm font-bold tracking-widest uppercase">/ {currentLetter.transliteration} /</p>
      </div>

      <button
        onClick={() => playInstruction()}
        disabled={isAudioPlaying}
        className={`w-full mb-6 flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 transition-all transform active:scale-95 shadow-sm ${
          isAudioPlaying 
            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' 
            : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100'
        }`}
      >
        {isAudioPlaying ? (
          <Volume2 className="w-6 h-6 animate-pulse" />
        ) : (
          <PlayCircle className="w-6 h-6" />
        )}
        <span className="text-sm font-black uppercase tracking-widest">
          {isAudioPlaying ? 'Playing Tutorial...' : 'Play Voice Lesson'}
        </span>
      </button>

      {/* Shapes Grid - 2x2 for mobile aspect */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: 'Isolated', shape: currentLetter.isolated, ex: currentLetter.examples.isolated },
          { label: 'Initial', shape: currentLetter.initial, ex: currentLetter.examples.initial },
          { label: 'Medial', shape: currentLetter.medial, ex: currentLetter.examples.medial },
          { label: 'Final', shape: currentLetter.final, ex: currentLetter.examples.final },
        ].map((state) => (
          <button 
            key={state.label} 
            onClick={() => playWord(state.ex)}
            className="group relative bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm flex flex-col items-center justify-between min-h-[140px] transition-all hover:border-indigo-300 hover:shadow-md active:scale-95"
          >
            <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
               <Volume1 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl arabic-text text-indigo-600 mb-1 leading-none group-hover:scale-110 transition-transform">{state.shape}</span>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{state.label}</span>
            </div>
            <HighlightedWord example={state.ex} />
          </button>
        ))}
      </div>

      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Teacher's Note</h4>
        <p className="text-xs text-slate-600 leading-tight">
          {currentLetter.soundDescription} {currentLetter.mouthTips}
        </p>
      </div>

      <div className="mt-auto pt-4 flex flex-col space-y-3">
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white p-5 rounded-2xl text-lg font-black hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
        >
          <span>{currentLetterIndex === letters.length - 1 ? 'Start Practice' : 'Next Letter'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <button
          onClick={onBackToModules}
          className="w-full flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-400 p-3 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
        >
          <GridIcon className="w-4 h-4" />
          <span>Back to Groups</span>
        </button>
      </div>
    </div>
  );
};
