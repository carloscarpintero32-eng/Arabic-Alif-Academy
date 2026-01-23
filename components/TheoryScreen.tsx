
import React from 'react';
import { ArrowRight, Info, Languages, PenTool, Layout, Grid } from 'lucide-react';

interface TheoryScreenProps {
  onContinue: () => void;
  onBackToModules: () => void;
}

export const TheoryScreen: React.FC<TheoryScreenProps> = ({ onContinue, onBackToModules }) => {
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
            <p className="text-sm text-slate-500 leading-snug">The alphabet consists of 28 letters, all of which represent consonants, though three (Alif, Waw, Ya) can function as long vowels. Short vowels are indicated by diacritical marks (tashkeel) not part of the core alphabet!</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-indigo-50 shadow-sm flex items-start space-x-4">
          <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
            <PenTool className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Right to Left</h3>
            <p className="text-sm text-slate-500 leading-snug">Arabic is read and written from right to left. This might take some getting used to in the beginning, but it is easy to pick up once you get started!</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-indigo-50 shadow-sm flex items-start space-x-4">
          <div className="bg-green-100 p-3 rounded-xl text-green-600">
            <Languages className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Transforming Shapes</h3>
            <p className="text-sm text-slate-500 leading-snug">Letters change appearance depending on whether they are at the start, middle, or end of a word. The Arabic alphabet is a unicameral script, meaning it has no concept of upper-case (capital) or lower-case (minuscule) letters.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-indigo-50 shadow-sm flex items-start space-x-4">
          <div className="bg-pink-100 p-3 rounded-xl text-pink-600">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Cursive Writing</h3>
            <p className="text-sm text-slate-500 leading-snug">Arabic is always cursive. Letters connect to each other in a beautiful flowing script.</p>
          </div>
        </div>
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
