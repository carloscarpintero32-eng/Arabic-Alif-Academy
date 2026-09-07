import React from 'react';
import { Grid, Sparkles, Layers } from 'lucide-react';
import { useSounds } from '../hooks/useSounds';
import { ALPHABET_DATA } from '../constants';

interface GamePromptProps {
  batchIndex?: number;
  onSelect: (mode: 'current' | 'all') => void;
  onBackToModules: () => void;
}

export const GamePrompt: React.FC<GamePromptProps> = ({ batchIndex = 1, onSelect, onBackToModules }) => {
  const { playSelect, playNavigation } = useSounds();

  const currentBatchStart = batchIndex * 7;
  const currentBatchEnd = (batchIndex + 1) * 7;

  const currentGroupLetters = ALPHABET_DATA.slice(currentBatchStart, currentBatchEnd);
  const startLetterName = currentGroupLetters[0]?.name || '';
  const endLetterName = currentGroupLetters[currentGroupLetters.length - 1]?.name || '';

  const accumulatedLetters = ALPHABET_DATA.slice(0, currentBatchEnd);
  const accumulatedCount = accumulatedLetters.length;

  const handleModeSelect = (mode: 'current' | 'all') => {
    playSelect();
    onSelect(mode);
  };

  const handleBack = () => {
    playNavigation();
    onBackToModules();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn h-full py-4">
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Challenge Choice — Group {batchIndex + 1}</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Put Your Knowledge to the Test!</h2>
        <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed">
          Choose how you want to be tested in the upcoming practice mini-game:
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 w-full max-w-2xl">
        {/* Option 1: Recent 7 Letters */}
        <button
          onClick={() => handleModeSelect('current')}
          className="flex-1 bg-white border-2 border-teal-200 p-6 rounded-3xl hover:border-teal-600 hover:bg-teal-50 transition-all group shadow-sm hover:shadow-md text-left flex flex-col justify-between"
        >
          <div className="space-y-2 mb-4">
            <div className="bg-teal-100 text-teal-700 w-10 h-10 rounded-2xl flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-teal-700">
              Recent 7 Letters
            </h3>
            <p className="text-slate-500 text-sm leading-snug">
              Test only the 7 letters learned in Group {batchIndex + 1} ({startLetterName} to {endLetterName}).
            </p>
          </div>
          <span className="text-xs font-extrabold text-teal-600 uppercase tracking-wider group-hover:underline">
            Select Group {batchIndex + 1} Only →
          </span>
        </button>

        {/* Option 2: Mix All Accumulated Letters */}
        <button
          onClick={() => handleModeSelect('all')}
          className="flex-1 bg-white border-2 border-indigo-200 p-6 rounded-3xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group shadow-sm hover:shadow-md text-left flex flex-col justify-between"
        >
          <div className="space-y-2 mb-4">
            <div className="bg-indigo-100 text-indigo-700 w-10 h-10 rounded-2xl flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-700">
              Mix All {accumulatedCount} Letters
            </h3>
            <p className="text-slate-500 text-sm leading-snug">
              Test all {accumulatedCount} letters learned up to this point (Alif to {endLetterName}). The ultimate challenge!
            </p>
          </div>
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider group-hover:underline">
            Select All {accumulatedCount} Letters →
          </span>
        </button>
      </div>

      <div className="pt-4">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 bg-white border-2 border-slate-200 text-slate-600 px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
        >
          <Grid className="w-4 h-4" />
          <span>Back to Study Center</span>
        </button>
      </div>
    </div>
  );
};
