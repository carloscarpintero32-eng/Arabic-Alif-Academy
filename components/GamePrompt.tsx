
import React, { useEffect } from 'react';
import { speechService } from '../services/geminiService';

interface GamePromptProps {
  onSelect: (mode: 'current' | 'all') => void;
}

export const GamePrompt: React.FC<GamePromptProps> = ({ onSelect }) => {
  useEffect(() => {
    speechService.speak("Well done on completing the second module! Before the next mini-game, would you like to be tested only on the new letters you just learned, or should we mix them with the first five letters for a bigger challenge?");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 animate-fadeIn h-full">
      <h2 className="text-3xl font-bold text-slate-800">Challenge Choice!</h2>
      <p className="text-lg text-slate-600 max-w-md">
        Choose how you want to be tested in the next mini-game.
      </p>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
        <button
          onClick={() => onSelect('current')}
          className="flex-1 bg-white border-2 border-indigo-200 p-8 rounded-3xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700">Recent 5 Letters</h3>
          <p className="text-slate-500">Test only the letters you just saw (Haa to Ra).</p>
        </button>

        <button
          onClick={() => onSelect('all')}
          className="flex-1 bg-white border-2 border-indigo-200 p-8 rounded-3xl hover:border-indigo-600 hover:bg-indigo-50 transition-all group"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-700">Mix All 10</h3>
          <p className="text-slate-500">Test all letters from Alif to Ra. The ultimate challenge!</p>
        </button>
      </div>
    </div>
  );
};
