
import React from 'react';
import { Trophy, PartyPopper, RefreshCw, Star } from 'lucide-react';

export const EndScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-10 animate-fadeIn h-full py-12 px-6">
      <div className="relative scale-125 mb-4">
        <Trophy className="w-32 h-32 text-yellow-500 animate-pulse" />
        <Star className="absolute -top-2 -left-2 text-amber-400 w-8 h-8 animate-spin duration-[5000ms]" />
        <Star className="absolute -bottom-2 -right-2 text-amber-400 w-10 h-10 animate-spin-reverse duration-[4000ms]" />
        <PartyPopper className="w-12 h-12 text-indigo-600 absolute -top-6 -right-6 animate-bounce" />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-6xl font-black text-slate-800 tracking-tighter">Alf Mabrouk!</h2>
        <div className="bg-indigo-600 text-white px-6 py-2 rounded-full inline-block font-black text-xl uppercase tracking-widest animate-fadeIn delay-500">
          This is the end of the game so far
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-[3rem] border-2 border-indigo-100 max-w-lg shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <p className="text-xl text-slate-600 leading-relaxed font-medium">
          "You've shown incredible focus. Learning the first 10 letters and all their complex shapes is a huge achievement. You are now ready to start forming your first words!"
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <button 
          onClick={() => window.location.reload()}
          className="group flex items-center space-x-3 bg-indigo-600 text-white px-10 py-4 rounded-2xl text-xl font-black hover:bg-indigo-700 transition-all shadow-xl transform hover:scale-105 active:scale-95"
        >
          <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
          <span>Play Again</span>
        </button>
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">More modules coming soon!</p>
      </div>

      <style>{`
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
};
