
import React, { useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import { speechService } from '../services/geminiService';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  useEffect(() => {
    speechService.speak("Welcome to Arabic Alif Academy! Our goal is to help you master the beautiful Arabic alphabet one letter at a time. Click Let's Start to begin your journey.");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
      <div className="w-32 h-32 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-6xl arabic-text text-indigo-600">أ</span>
      </div>
      <h2 className="text-4xl font-extrabold text-slate-800">Assalamu Alaikum!</h2>
      <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
        Unlock the doors of the Arabic language. Our mission is to make learning the alphabet easy, intuitive, and fun through voice-guided lessons and interactive games.
      </p>
      <button
        onClick={onStart}
        className="flex items-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg"
      >
        <BookOpen className="w-6 h-6" />
        <span>Let's Start to Learn</span>
      </button>
    </div>
  );
};
