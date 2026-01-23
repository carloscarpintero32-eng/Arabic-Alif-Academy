
import React from 'react';
import { ChevronRight, Grid as GridIcon, Zap } from 'lucide-react';

interface LetterSelectionScreenProps {
  onSelectGroup: (batch: number) => void;
  onSelectVowels: () => void;
  onBack: () => void;
}

export const LetterSelectionScreen: React.FC<LetterSelectionScreenProps> = ({ onSelectGroup, onSelectVowels, onBack }) => {
  const groups = [
    {
      id: 0,
      title: 'Group 1',
      letters: 'أ ب ت ث ج ح خ',
      color: 'border-indigo-100 hover:border-indigo-500 bg-indigo-50/20'
    },
    {
      id: 1,
      title: 'Group 2',
      letters: 'د ذ ر ز س ش ص',
      color: 'border-emerald-100 hover:border-emerald-500 bg-emerald-50/20'
    },
    {
      id: 2,
      title: 'Group 3',
      letters: 'ض ط ظ ع غ ف ق',
      color: 'border-amber-100 hover:border-amber-500 bg-amber-50/20'
    },
    {
      id: 3,
      title: 'Group 4',
      letters: 'ك ل م ن هـ و ي',
      color: 'border-pink-100 hover:border-pink-500 bg-pink-50/20'
    }
  ];

  return (
    <div className="flex flex-col space-y-6 animate-fadeIn h-full">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Study Center</h2>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Master each set</p>
      </div>

      <div className="flex flex-col space-y-3">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onSelectGroup(group.id)}
            className={`group p-5 rounded-2xl border-2 transition-all transform flex items-center justify-between shadow-sm active:translate-y-1 ${group.color}`}
          >
            <div>
              <h3 className="text-lg font-black text-slate-800 mb-1">{group.title}</h3>
              <div className="text-2xl arabic-text text-indigo-700 tracking-widest leading-none">{group.letters}</div>
            </div>
            <div className="bg-white p-2 rounded-full shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        ))}

        <button
          onClick={onSelectVowels}
          className="group p-5 rounded-2xl border-2 border-purple-100 hover:border-purple-500 bg-purple-50/20 transition-all transform flex items-center justify-between shadow-sm active:translate-y-1"
        >
          <div>
            <h3 className="text-lg font-black text-slate-800 mb-1">Vowel Marks</h3>
            <div className="text-3xl arabic-text text-purple-700">َ  ِ  ُ  ْ</div>
          </div>
          <div className="bg-white p-2 rounded-full shadow-inner group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Zap className="w-5 h-5" />
          </div>
        </button>
      </div>

      <div className="mt-auto pt-4 flex justify-center">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-slate-100 text-slate-500 px-8 py-3 rounded-xl text-sm font-bold hover:bg-slate-200 transition-all"
        >
          <GridIcon className="w-4 h-4" />
          <span>Exit Center</span>
        </button>
      </div>
    </div>
  );
};
