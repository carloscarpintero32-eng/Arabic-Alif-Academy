
import React, { useEffect } from 'react';
import { speechService } from '../services/geminiService';
import { ArrowRight, Info, Languages, PenTool, Layout } from 'lucide-react';

interface TheoryScreenProps {
  onContinue: () => void;
}

export const TheoryScreen: React.FC<TheoryScreenProps> = ({ onContinue }) => {
  useEffect(() => {
    speechService.speak(
      "Welcome to the fascinating world of Arabic! Did you know there are 28 letters in the Arabic alphabet? " +
      "Unlike English, we write from right to left, and there are no capital letters! " +
      "While English has five vowels, Arabic uses 28 consonants, with three of them also serving as long vowels. " +
      "Most other vowels are actually small marks above or below the letters. " +
      "The coolest part? Arabic is always written in a beautiful cursive style. " +
      "Because letters connect, they change shape like chameleons depending on their position—at the beginning, middle, end, or alone. " +
      "Let's start our journey!"
    );
  }, []);

  return (
    <div className="flex flex-col space-y-8 animate-fadeIn h-full pb-4">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-800 border-b-4 border-indigo-100 pb-2">The Magic of Arabic</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Before we dive into the letters, let's explore what makes this language so unique and exciting!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border-2 border-indigo-50 shadow-sm flex items-start space-x-4">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">28 Letters</h3>
            <p className="text-sm text-slate-500 leading-snug">The alphabet consists of 28 letters. There are no capital letters in Arabic script!</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-indigo-50 shadow-sm flex items-start space-x-4">
          <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Right to Left</h3>
            <p className="text-sm text-slate-500 leading-snug">We read and write from right to left. It feels like drawing as you learn!</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-indigo-50 shadow-sm flex items-start space-x-4">
          <div className="bg-green-100 p-3 rounded-xl text-green-600">
            <Languages className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Consonants & Vowels</h3>
            <p className="text-sm text-slate-500 leading-snug">28 consonants, with 3 that double as "long vowels." Short vowels are marks above or below letters.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-indigo-50 shadow-sm flex items-start space-x-4">
          <div className="bg-pink-100 p-3 rounded-xl text-pink-600">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Influence</h3>
            <p className="text-sm text-slate-500 leading-snug">Many English words like "Sugar," "Coffee," and "Algebra" come directly from Arabic!</p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-lg space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-8 bg-white rounded-full"></div>
          <h3 className="text-xl font-bold uppercase tracking-wider">The "Chameleon" States</h3>
        </div>
        <p className="text-indigo-50 text-sm leading-relaxed">
          Because Arabic is cursive, letters "hug" each other to form words. Their shape depends on their position:
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white/10 p-3 rounded-xl text-center border border-white/20">
            <span className="text-2xl arabic-text block">ب</span>
            <span className="text-xs font-bold uppercase">Isolated</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl text-center border border-white/20">
            <span className="text-2xl arabic-text block">بـ</span>
            <span className="text-xs font-bold uppercase">Initial</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl text-center border border-white/20">
            <span className="text-2xl arabic-text block">ـبـ</span>
            <span className="text-xs font-bold uppercase">Medial</span>
          </div>
          <div className="bg-white/10 p-3 rounded-xl text-center border border-white/20">
            <span className="text-2xl arabic-text block">ـب</span>
            <span className="text-xs font-bold uppercase">Final</span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-end">
        <button
          onClick={onContinue}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-md transform hover:scale-105 active:scale-95"
        >
          <span>Begin First Lesson</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
