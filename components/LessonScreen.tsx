
import React, { useState, useEffect, useCallback } from 'react';
import { ALPHABET_DATA } from '../constants';
import { speechService } from '../services/geminiService';
import { ArrowRight, PlayCircle, Volume2, Grid } from 'lucide-react';
import { Example } from '../types';

interface LessonScreenProps {
  batchIndex: number;
  onComplete: () => void;
  onBackToModules: () => void;
}

const HighlightedWord: React.FC<{ example: Example }> = ({ example }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl arabic-text dir-rtl mb-1">
        <span className="text-slate-700">{example.prefix}</span>
        <span className="text-green-600 font-bold">{example.letter}</span>
        <span className="text-slate-700">{example.suffix}</span>
      </div>
      <div className="text-sm text-slate-500 italic">
        ({example.translation})
      </div>
    </div>
  );
};

export const LessonScreen: React.FC<LessonScreenProps> = ({ batchIndex, onComplete, onBackToModules }) => {
  const letters = ALPHABET_DATA.slice(batchIndex * 5, (batchIndex + 1) * 5);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const currentLetter = letters[currentLetterIndex];

  const playInstruction = useCallback(async () => {
    if (isAudioPlaying) return;
    
    setIsAudioPlaying(true);
    const text = `Let's learn the letter ${currentLetter.name}. 
      In its isolated form, it looks like this: ${currentLetter.isolated}. 
      At the beginning of a word, it becomes: ${currentLetter.initial}. 
      When it's squeezed in the middle, it changes to: ${currentLetter.medial}. 
      And at the end of a word, it finishes like this: ${currentLetter.final}. 
      ${currentLetter.description}`;
    
    try {
      await speechService.speak(text);
    } finally {
      setIsAudioPlaying(false);
    }
  }, [currentLetter, isAudioPlaying]);

  const handleNext = () => {
    speechService.stop();
    setIsAudioPlaying(false);
    if (currentLetterIndex < letters.length - 1) {
      setCurrentLetterIndex(currentLetterIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Learning Letter: {currentLetter.name}</h2>
          <p className="text-slate-500 italic">Transliteration: / {currentLetter.transliteration} /</p>
        </div>
        <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-bold">
          {currentLetterIndex + 1} / {letters.length}
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => playInstruction()}
          disabled={isAudioPlaying}
          className={`flex items-center space-x-3 px-8 py-4 rounded-2xl border-2 transition-all transform active:scale-95 group shadow-sm ${
            isAudioPlaying 
              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-75' 
              : 'bg-indigo-50 border-indigo-200 text-indigo-600 hover:bg-indigo-100 hover:scale-105'
          }`}
        >
          {isAudioPlaying ? (
            <Volume2 className="w-8 h-8 animate-pulse" />
          ) : (
            <PlayCircle className="w-8 h-8 group-hover:text-indigo-700" />
          )}
          <span className="text-xl font-bold uppercase tracking-tight">
            {isAudioPlaying ? 'Playing Lesson...' : 'Play Lesson Audio'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Isolated', shape: currentLetter.isolated, ex: currentLetter.examples.isolated },
          { label: 'Initial', shape: currentLetter.initial, ex: currentLetter.examples.initial },
          { label: 'Medial', shape: currentLetter.medial, ex: currentLetter.examples.medial },
          { label: 'Final', shape: currentLetter.final, ex: currentLetter.examples.final },
        ].map((state) => (
          <div key={state.label} className="bg-white border-2 border-indigo-50 rounded-3xl p-6 text-center shadow-sm flex flex-col items-center justify-between min-h-[220px]">
            <div className="flex flex-col items-center">
              <span className="text-6xl arabic-text text-indigo-600 mb-2">{state.shape}</span>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4">{state.label}</span>
            </div>
            <HighlightedWord example={state.ex} />
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-between items-center">
        <button
          onClick={onBackToModules}
          className="flex items-center space-x-2 bg-white border-2 border-slate-200 text-slate-500 px-6 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all"
        >
          <Grid className="w-5 h-5" />
          <span>Back to Modules</span>
        </button>
        
        <button
          onClick={handleNext}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
        >
          <span>{currentLetterIndex === letters.length - 1 ? 'Start Mini Game' : 'Continue Lesson'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
