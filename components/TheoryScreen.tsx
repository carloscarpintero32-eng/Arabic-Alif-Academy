
import React, { useEffect } from 'react';
import { speechService } from '../services/geminiService';
import { ArrowRight } from 'lucide-react';

interface TheoryScreenProps {
  onContinue: () => void;
}

export const TheoryScreen: React.FC<TheoryScreenProps> = ({ onContinue }) => {
  useEffect(() => {
    speechService.speak("In Arabic, letters are like chameleons! They change their shape depending on where they appear in a word—whether at the beginning, the middle, the end, or all by themselves. This is what we call the states of the letter. Let's explore how this works.");
  }, []);

  return (
    <div className="flex flex-col space-y-10 animate-fadeIn h-full">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-800 border-b pb-4">Understanding Letter Shapes</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Arabic script is cursive. Most letters connect to each other, creating a flowing word. 
          Because they connect, their "tails" or "arms" might change.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Isolated', shape: 'ب', desc: 'Standing alone' },
          { label: 'Initial', shape: 'بـ', desc: 'At the start' },
          { label: 'Medial', shape: 'ـبـ', desc: 'In the middle' },
          { label: 'Final', shape: 'ـب', desc: 'At the end' },
        ].map((state) => (
          <div key={state.label} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center hover:bg-white hover:border-indigo-300 transition-all shadow-sm">
            <span className="text-4xl arabic-text block text-indigo-600 mb-2">{state.shape}</span>
            <h3 className="font-bold text-slate-700">{state.label}</h3>
            <p className="text-sm text-slate-500">{state.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-end">
        <button
          onClick={onContinue}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition-colors shadow-md"
        >
          <span>Begin First Lesson</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
