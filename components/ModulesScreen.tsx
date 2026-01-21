
import React, { useEffect } from 'react';
import { BookOpen, Headphones, PenTool, Layout, Lock } from 'lucide-react';
import { speechService } from '../services/geminiService';

interface ModulesScreenProps {
  onSelectModule: (moduleId: string) => void;
}

export const ModulesScreen: React.FC<ModulesScreenProps> = ({ onSelectModule }) => {
  useEffect(() => {
    speechService.speak("This is the modules selection screen. Each tile represents a step in your journey to learn Arabic. Click on a tile to begin your lesson.");
  }, []);

  const modules = [
    {
      id: 'm1',
      title: 'Module 1: Letters',
      description: 'Master the first 10 letters of the alphabet including their shapes and sounds.',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-indigo-600',
      active: true
    },
    {
      id: 'm2',
      title: 'Module 2: Vocabulary',
      description: 'Learn common daily words and basic greetings.',
      icon: <Headphones className="w-8 h-8" />,
      color: 'bg-slate-400',
      active: false
    },
    {
      id: 'm3',
      title: 'Module 3: Writing',
      description: 'Master the art of connecting letters to form words.',
      icon: <PenTool className="w-8 h-8" />,
      color: 'bg-slate-400',
      active: false
    }
  ];

  return (
    <div className="flex flex-col space-y-8 animate-fadeIn h-full">
      <div className="space-y-3">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight">Modules</h2>
        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
          Each tile below is a module that will guide you through different steps of learning Arabic. Click a tile to begin your focused study.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => m.active && onSelectModule(m.id)}
            disabled={!m.active}
            className={`relative p-8 rounded-[2.5rem] text-left transition-all transform flex flex-col h-full border-b-8 shadow-xl
              ${m.active 
                ? 'bg-white border-indigo-100 hover:border-indigo-400 hover:-translate-y-2 hover:shadow-2xl cursor-pointer' 
                : 'bg-slate-50 border-slate-200 opacity-80 cursor-not-allowed'
              }`}
          >
            <div className={`p-4 rounded-2xl inline-block mb-6 text-white ${m.color}`}>
              {m.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">{m.title}</h3>
            <p className="text-slate-500 font-medium leading-snug flex-grow">
              {m.description}
            </p>
            {!m.active && (
              <div className="mt-4 flex items-center space-x-2 text-slate-400 font-bold uppercase text-xs tracking-widest">
                <Lock className="w-4 h-4" />
                <span>Coming Soon</span>
              </div>
            )}
            {m.active && (
              <div className="mt-4 flex items-center space-x-2 text-indigo-600 font-bold uppercase text-xs tracking-widest">
                <span>Start Now</span>
                <Layout className="w-4 h-4" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
