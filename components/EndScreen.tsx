
import React, { useEffect } from 'react';
import { Trophy, PartyPopper } from 'lucide-react';
import { speechService } from '../services/geminiService';

export const EndScreen: React.FC = () => {
  useEffect(() => {
    speechService.speak("Congratulations Carlos! You have completed all the modules currently available. This is the end of the game so far.");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn h-full py-10">
      <div className="relative">
        <Trophy className="w-32 h-32 text-yellow-500" />
        <PartyPopper className="w-12 h-12 text-indigo-600 absolute -top-4 -right-4 animate-bounce" />
      </div>
      
      <h2 className="text-5xl font-extrabold text-slate-800">Alf Mabrouk!</h2>
      <p className="text-2xl text-slate-600 font-bold">
        This is the end of the game so far Carlos
      </p>
      
      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 max-w-md">
        <p className="text-slate-600 leading-relaxed">
          You've successfully learned the first 10 letters of the Arabic alphabet and their forms. 
          Your dedication to learning is inspiring! Keep practicing and stay tuned for more modules.
        </p>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg"
      >
        Start Over
      </button>
    </div>
  );
};
