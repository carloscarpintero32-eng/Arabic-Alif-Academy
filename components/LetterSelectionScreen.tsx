
import React from 'react';
import { ChevronRight, Grid, Zap } from 'lucide-react';

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
      description: 'The foundation letters. Master the basics of Arabic sounds.',
      color: 'border-indigo-200 hover:border-indigo-600 bg-indigo-50/30'
    },
    {
      id: 1,
      title: 'Group 2',
      letters: 'د ذ ر ز س ش ص',
      description: 'Master the non-connectors and sibilant sounds.',
      color: 'border-emerald-200 hover:border-emerald-600 bg-emerald-50/30'
    },
    {
      id: 2,
      title: 'Group 3',
      letters: 'ض ط ظ ع غ ف ق',
      description: 'The heavy letters. Deep throat and emphatic sounds.',
      color: 'border-amber-200 hover:border-amber-600 bg-amber-50/30'
    },
    {
      id: 3,
      title: 'Group 4',
      letters: 'ك ل م ن هـ و ي',
      description: 'The final set. Common connectors and semi-vowels.',
      color: 'border-pink-200 hover:border-pink-600 bg-pink-50/30'
    }
  ];

  return (
    <div className="flex flex-col space-y-8 animate-fadeIn h-full">
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Select Your Module</h2>
        <p className="text-lg text-slate-500 font-medium">Choose a letter group or master the vowel marks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => onSelectGroup(group.id)}
            className={`group p-6 rounded-[2rem] border-4 transition-all transform hover:-translate-y-2 text-left flex flex-col h-full shadow-sm hover:shadow-xl ${group.color}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-3xl arabic-text text-slate-800 tracking-widest leading-none">{group.letters}</div>
              <div className="bg-white p-2 rounded-full shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-1">{group.title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-snug flex-grow">{group.description}</p>
          </button>
        ))}

        {/* Short Vowels Tile */}
        <button
          onClick={onSelectVowels}
          className="group p-6 rounded-[2rem] border-4 border-purple-200 hover:border-purple-600 bg-purple-50/30 transition-all transform hover:-translate-y-2 text-left flex flex-col h-full shadow-sm hover:shadow-xl"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex space-x-2">
              <div className="text-4xl arabic-text text-purple-700">َ  ِ  ُ  ْ</div>
            </div>
            <div className="bg-white p-2 rounded-full shadow-inner group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-800 mb-1">Short Vowels</h3>
          <p className="text-sm text-slate-500 font-medium leading-snug flex-grow">
            Learn the "Harakat" (vowel marks) that bring letters to life with sound.
          </p>
        </button>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100 flex justify-start">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-white border-2 border-slate-200 text-slate-500 px-6 py-4 rounded-xl text-lg font-bold hover:bg-slate-50 transition-all"
        >
          <Grid className="w-5 h-5" />
          <span>Back to Modules</span>
        </button>
      </div>
    </div>
  );
};
