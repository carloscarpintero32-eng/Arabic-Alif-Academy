
import React, { useEffect } from 'react';
import { speechService } from '../services/geminiService';
import { Grid, Volume2, PlayCircle, ArrowRight } from 'lucide-react';

interface VowelsScreenProps {
  onBack: () => void;
}

export const VowelsScreen: React.FC<VowelsScreenProps> = ({ onBack }) => {
  useEffect(() => {
    speechService.speak(
      "Short vowels in Arabic are called Harakat. They are small marks written above or below letters to tell you how to pronounce them. " +
      "There are three main vowels: Fatha makes an 'aa' sound, Kasra makes an 'ee' sound, and Damma makes an 'oo' sound. " +
      "The Sukun means there is no vowel at all!"
    );
  }, []);

  const vowels = [
    { name: 'Fatha', mark: '◌َ', sound: 'a (as in "apple")', example: 'بَ (ba)', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { name: 'Kasra', mark: '◌ِ', sound: 'i (as in "ink")', example: 'بِ (bi)', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    { name: 'Damma', mark: '◌ُ', sound: 'u (as in "blue")', example: 'بُ (bu)', color: 'bg-amber-50 border-amber-200 text-amber-700' },
    { name: 'Sukun', mark: '◌ْ', sound: 'Silent (stop)', example: 'بْ (b)', color: 'bg-slate-50 border-slate-200 text-slate-700' },
  ];

  return (
    <div className="flex flex-col space-y-8 animate-fadeIn h-full">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Short Vowels (Harakat)</h2>
        <p className="text-lg text-slate-600">The marks that guide your pronunciation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vowels.map((v) => (
          <div key={v.name} className={`p-6 rounded-3xl border-2 shadow-sm flex items-center justify-between ${v.color}`}>
            <div className="space-y-1">
              <h3 className="text-2xl font-black">{v.name}</h3>
              <p className="text-sm font-bold opacity-70 uppercase tracking-widest">{v.sound}</p>
              <div className="text-xl font-medium mt-2">Example: <span className="arabic-text text-2xl">{v.example}</span></div>
            </div>
            <div className="text-6xl arabic-text bg-white p-4 rounded-2xl shadow-inner border border-inherit">
              {v.mark}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-600 text-white p-6 rounded-[2rem] flex items-center space-x-6 shadow-xl">
        <div className="bg-white/20 p-4 rounded-2xl">
          <Volume2 className="w-10 h-10" />
        </div>
        <p className="text-lg font-medium leading-relaxed">
          In Arabic newspapers and most books, these marks are often omitted! Readers use context to know the correct vowels. But for learners like you, they are your best friends!
        </p>
      </div>

      <div className="mt-auto flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-white border-2 border-slate-200 text-slate-500 px-6 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all"
        >
          <Grid className="w-5 h-5" />
          <span>Back to Module 1</span>
        </button>
      </div>
    </div>
  );
};
