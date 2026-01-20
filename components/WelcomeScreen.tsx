
import React, { useEffect } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { speechService } from '../services/geminiService';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  useEffect(() => {
    speechService.speak("Welcome to Arabic Alif Academy! Our goal is to help you master the beautiful Arabic alphabet one letter at a time. Click Let's Start to begin your journey.");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn py-12">
      <div className="relative">
        <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-2xl animate-bounce duration-[3000ms] ease-in-out infinite">
          <span className="text-6xl arabic-text text-white">أ</span>
        </div>
        <Sparkles className="absolute -top-4 -right-4 text-amber-400 w-10 h-10 animate-pulse" />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-5xl font-black text-slate-800 tracking-tight">Assalamu Alaikum!</h2>
        <p className="text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
          Step into the world of Arabic. Learn to read and write the alphabet through interactive modules and fun challenges.
        </p>
      </div>

      <div className="pt-6">
        <button
          onClick={onStart}
          className="group relative flex items-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-5 rounded-2xl text-2xl font-black transition-all transform hover:scale-105 active:scale-95 shadow-[0_10px_0_0_rgba(49,46,129,1)] hover:shadow-[0_5px_0_0_rgba(49,46,129,1)] hover:translate-y-[5px]"
        >
          <BookOpen className="w-7 h-7" />
          <span>Let's Start to Learn</span>
        </button>
      </div>
      
      <p className="text-sm text-slate-400 font-bold uppercase tracking-widest pt-8">
        Module 1: The Foundations of the Alphabet
      </p>
    </div>
  );
};
