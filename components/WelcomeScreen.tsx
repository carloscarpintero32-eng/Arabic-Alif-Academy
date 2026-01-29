
import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { useSounds } from '../hooks/useSounds';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const { playClick } = useSounds();

  const handleStart = () => {
    playClick();
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn h-full py-4">
      <div className="relative">
        <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mb-2 shadow-xl animate-bounce duration-[3000ms]">
          <span className="text-5xl arabic-text text-white">أ</span>
        </div>
        <Sparkles className="absolute -top-3 -right-3 text-amber-400 w-8 h-8 animate-pulse" />
      </div>

      <div className="space-y-2">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight leading-tight">Assalamu Alaikum!</h2>
        <p className="text-md text-slate-500 font-medium leading-relaxed px-4">
          Master the beautiful Arabic script through guided lessons and games.
        </p>
      </div>

      <div className="pt-4 w-full">
        <button
          onClick={handleStart}
          className="group w-full relative flex items-center justify-center space-x-3 bg-indigo-600 text-white p-6 rounded-[2rem] text-xl font-black transition-all shadow-lg active:translate-y-1"
        >
          <BookOpen className="w-6 h-6" />
          <span>Enter Academy</span>
        </button>
      </div>
    </div>
  );
};
