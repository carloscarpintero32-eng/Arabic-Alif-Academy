
import React from 'react';
import { BookOpen, Headphones, PenTool, Layout, Lock } from 'lucide-react';

interface ModulesScreenProps {
  onSelectModule: (moduleId: string) => void;
}

export const ModulesScreen: React.FC<ModulesScreenProps> = ({ onSelectModule }) => {
  const modules = [
    {
      id: 'm1',
      title: 'Alphabet Master',
      description: "Learn all 28 letters and their shapes.",
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-indigo-600',
      active: true
    },
    {
      id: 'm2',
      title: 'Vocabulary Daily',
      description: 'Common words and basic greetings.',
      icon: <Headphones className="w-6 h-6" />,
      color: 'bg-slate-300',
      active: false
    },
    {
      id: 'm3',
      title: 'Writing Lab',
      description: 'Master connecting letters into words.',
      icon: <PenTool className="w-6 h-6" />,
      color: 'bg-slate-300',
      active: false
    }
  ];

  return (
    <div className="flex flex-col space-y-6 animate-fadeIn h-full">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">Your Journey</h2>
        <p className="text-slate-500 font-medium">Select a training module.</p>
      </div>

      <div className="flex flex-col space-y-4">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => m.active && onSelectModule(m.id)}
            disabled={!m.active}
            className={`relative p-6 rounded-[2rem] text-left transition-all flex items-start space-x-4 border-b-4 shadow-md
              ${m.active 
                ? 'bg-white border-indigo-100 hover:border-indigo-400 active:translate-y-1 cursor-pointer' 
                : 'bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed'
              }`}
          >
            <div className={`p-3 rounded-2xl shrink-0 text-white ${m.color}`}>
              {m.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-slate-800 mb-0.5">{m.title}</h3>
              <p className="text-sm text-slate-400 font-medium leading-tight">
                {m.description}
              </p>
              {!m.active && (
                <div className="mt-2 flex items-center space-x-1 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                  <Lock className="w-3 h-3" />
                  <span>Locked</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-auto bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100">
        <p className="text-xs text-indigo-700 font-bold leading-relaxed text-center italic">
          "The beauty of Arabic lies in its script. Take your time with Module 1!"
        </p>
      </div>
    </div>
  );
};
