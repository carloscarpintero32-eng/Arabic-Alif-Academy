
import React from 'react';
import { Grid } from 'lucide-react';

interface GamePromptProps {
  onSelect: (mode: 'current' | 'all') => void;
  onBackToModules: () => void;
}

export const GamePrompt: React.FC<GamePromptProps> = ({ onSelect, onBackToModules }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn h-full">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-800">Challenge Choice!</h2>
        <p className="text-lg text-slate-600 max-w-md mx-auto">
          Choose how you want to be tested in the next mini-game.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
        <button
          onClick={() => onSelect('current')}
          className="flex-1 bg-white border-2 border-indigo-200 p-8 rounded-3xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group shadow-sm hover:shadow-md"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700">Recent 5 Letters</h3>
          <p className="text-slate-500 text-sm">Test only the letters you just saw (Haa to Ra).</p>
        </button>

        <button
          onClick={() => onSelect('all')}
          className="flex-1 bg-white border-2 border-indigo-200 p-8 rounded-3xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group shadow-sm hover:shadow-md"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700">Mix All 10</h3>
          <p className="text-slate-500 text-sm">Test all letters from Alif to Ra. The ultimate challenge!</p>
        </button>
      </div>

      <div className="pt-8">
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
