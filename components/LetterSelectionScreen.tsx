
import React from 'react';
import { ChevronRight, Grid as GridIcon, Zap } from 'lucide-react';
import { useSounds } from '../hooks/useSounds';

interface LetterSelectionScreenProps {
  onSelectGroup: (batch: number) => void;
  onSelectHarakat?: () => void;
  onSelectVowels?: () => void;
  onBack: () => void;
}

export const LetterSelectionScreen: React.FC<LetterSelectionScreenProps> = ({ onSelectGroup, onSelectHarakat, onSelectVowels, onBack }) => {
  const { playSelect, playNavigation } = useSounds();

  const handleGroupSelect = (batch: number) => {
    playSelect();
    onSelectGroup(batch);
  };

  const handleHarakatSelect = () => {
    playSelect();
    if (onSelectHarakat) {
      onSelectHarakat();
    } else if (onSelectVowels) {
      onSelectVowels();
    }
  };

  const handleBack = () => {
    playNavigation();
    onBack();
  };

  const groups = [
    {
      id: 0,
      title: 'Group 1',
      letters: 'أ ب ت ث ج ح خ',
      color: 'border-teal-300 hover:border-teal-600 bg-teal-100/40'
    },
    {
      id: 1,
      title: 'Group 2',
      letters: 'د ذ ر ز س ش ص',
      color: 'border-emerald-300 hover:border-emerald-600 bg-emerald-100/40'
    },
    {
      id: 2,
      title: 'Group 3',
      letters: 'ض ط ظ ع غ ف ق',
      color: 'border-amber-300 hover:border-amber-600 bg-amber-100/40'
    },
    {
      id: 3,
      title: 'Group 4',
      letters: 'ك ل م ن هـ و ي',
      color: 'border-pink-300 hover:border-pink-600 bg-pink-100/40'
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
            onClick={() => handleGroupSelect(group.id)}
            className={`group p-5 rounded-2xl border-2 transition-all transform flex items-center justify-between shadow-sm active:translate-y-1 ${group.color}`}
          >
            <div>
              <h3 className="text-lg font-black text-slate-800 mb-1">{group.title}</h3>
              <div className="text-2xl arabic-text text-teal-700 tracking-widest leading-none">{group.letters}</div>
            </div>
            <div className="bg-white p-2 rounded-full shadow-inner group-hover:bg-teal-700 group-hover:text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        ))}

        <button
          onClick={handleHarakatSelect}
          className="group p-5 rounded-2xl border-2 border-purple-300 hover:border-purple-600 bg-purple-100/40 transition-all transform flex items-center justify-between shadow-sm active:translate-y-1"
        >
          <div>
            <h3 className="text-lg font-black text-slate-800 mb-1">Harakat Marks</h3>
            <div className="text-3xl arabic-text text-purple-700">َ  ِ  ُ  ْ  ّ</div>
          </div>
          <div className="bg-white p-2 rounded-full shadow-inner group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Zap className="w-5 h-5" />
          </div>
        </button>
      </div>

      <div className="mt-auto pt-4 flex justify-center">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 bg-slate-200 text-slate-700 px-8 py-3 rounded-xl text-sm font-bold hover:bg-slate-300 transition-all"
        >
          <GridIcon className="w-4 h-4" />
          <span>Exit Center</span>
        </button>
      </div>
    </div>
  );
};
