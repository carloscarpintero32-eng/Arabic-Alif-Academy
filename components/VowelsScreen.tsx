
import React, { useState, useCallback } from 'react';
import { Grid, Volume2, Volume1, PlayCircle } from 'lucide-react';
import { speechService } from '../services/geminiService';
import { useSounds } from '../hooks/useSounds';

interface VowelsScreenProps {
  onBack: () => void;
}

export const VowelsScreen: React.FC<VowelsScreenProps> = ({ onBack }) => {
  const { playNavigation } = useSounds();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleBack = () => {
    playNavigation();
    onBack();
  };

  const vowels = [
    { name: 'Fatha', mark: '◌َ', sound: 'a (as in "apple")', example: 'بَ (ba)', color: 'bg-teal-50 border-teal-200 text-teal-700' },
    { name: 'Kasra', mark: '◌ِ', sound: 'i (as in "ink")', example: 'بِ (bi)', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    { name: 'Damma', mark: '◌ُ', sound: 'u (as in "blue")', example: 'بُ (bu)', color: 'bg-amber-50 border-amber-200 text-amber-700' },
    { name: 'Sukun', mark: '◌', sound: 'Silent (stop)', example: 'بْ (b)', color: 'bg-slate-50 border-slate-200 text-slate-700' },
  ];

  const playVowelExample = useCallback((example: string) => {
    if (isAudioPlaying) return;
    const arabicPart = example.split(' ')[0];
    speechService.speak(arabicPart);
  }, [isAudioPlaying]);

  const playInstruction = useCallback(async () => {
    if (isAudioPlaying) return;

    setIsAudioPlaying(true);
    const audioPath = `/lessons/vowels.wav`;

    try {
      const audio = new Audio(audioPath);

      audio.addEventListener('ended', () => {
        setIsAudioPlaying(false);
      });

      audio.addEventListener('error', () => {
        console.warn(`Vowels audio file not found: ${audioPath}`);
        setIsAudioPlaying(false);
      });

      await audio.play();
    } catch (error) {
      console.warn(`Failed to play vowels audio:`, error);
      setIsAudioPlaying(false);
    }
  }, [isAudioPlaying]);

  return (
    <div className="flex flex-col space-y-6 animate-fadeIn h-full">
      <div className="space-y-1">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Vowels</h2>
        <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Harakat Marks</p>
      </div>

      <button
        onClick={playInstruction}
        disabled={isAudioPlaying}
        className={`w-full flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 transition-all transform active:scale-95 shadow-sm ${
          isAudioPlaying
            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
            : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
        }`}
      >
        {isAudioPlaying ? (
          <Volume2 className="w-6 h-6 animate-pulse" />
        ) : (
          <PlayCircle className="w-6 h-6" />
        )}
        <span className="text-sm font-black uppercase tracking-widest">
          {isAudioPlaying ? 'Playing Tutorial...' : 'Play Voice Lesson'}
        </span>
      </button>

      <div className="grid grid-cols-1 gap-3">
        {vowels.map((v) => (
          <button
            key={v.name}
            disabled={isAudioPlaying}
            onClick={() => playVowelExample(v.example)}
            className={`group p-5 rounded-3xl border-2 shadow-sm flex items-center justify-between text-left transition-all active:scale-95 hover:shadow-md ${v.color} ${
              isAudioPlaying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="space-y-1">
              <h3 className="text-xl font-black">{v.name}</h3>
              <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">{v.sound}</p>
              <div className="text-lg font-medium mt-1">Example: <span className="arabic-text text-xl">{v.example}</span></div>
            </div>
            <div className="relative">
              <div className="text-5xl arabic-text bg-white p-3 rounded-2xl shadow-inner border border-inherit transition-transform group-hover:scale-110">
                {v.mark}
              </div>
              <Volume1 className="absolute -top-1 -right-1 w-4 h-4 text-inherit opacity-40 group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>

      <div className="bg-teal-700 text-white p-5 rounded-[2rem] flex items-center space-x-4 shadow-lg">
        <div className="bg-white/20 p-3 rounded-xl shrink-0">
          <Volume2 className="w-6 h-6" />
        </div>
        <p className="text-[11px] font-medium leading-tight">
          These marks are often omitted in newspapers! Readers use context to know the correct vowels.
        </p>
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={handleBack}
          className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-slate-200 text-slate-500 p-4 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
        >
          <Grid className="w-4 h-4" />
          <span>Back to Module 1</span>
        </button>
      </div>
    </div>
  );
};
