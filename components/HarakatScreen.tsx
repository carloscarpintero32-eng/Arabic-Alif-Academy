import React, { useState, useCallback, useRef } from 'react';
import { Grid, Volume2, Volume1, PlayCircle } from 'lucide-react';
import { speechService } from '../services/geminiService';
import { useSounds } from '../hooks/useSounds';

interface HarakatScreenProps {
  onBack: () => void;
}

export const HarakatScreen: React.FC<HarakatScreenProps> = ({ onBack }) => {
  const { playNavigation } = useSounds();
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingMark, setPlayingMark] = useState<string | null>(null);

  const markAudioRef = useRef<HTMLAudioElement | null>(null);
  const instructionAudioRef = useRef<HTMLAudioElement | null>(null);

  const stopAllAudio = useCallback(() => {
    if (markAudioRef.current) {
      markAudioRef.current.pause();
      markAudioRef.current.currentTime = 0;
      markAudioRef.current = null;
    }
    if (instructionAudioRef.current) {
      instructionAudioRef.current.pause();
      instructionAudioRef.current.currentTime = 0;
      instructionAudioRef.current = null;
    }
    setPlayingMark(null);
    setIsAudioPlaying(false);
  }, []);

  const handleBack = () => {
    stopAllAudio();
    playNavigation();
    onBack();
  };

  const harakat = [
    { id: 'fatha', name: 'Fatha', file: 'harakat-fatha.wav', mark: '◌َ', sound: 'a (as in "apple")', example: 'بَ (ba)', color: 'bg-teal-50 border-teal-200 text-teal-700' },
    { id: 'kasra', name: 'Kasra', file: 'harakat-kasra.wav', mark: '◌ِ', sound: 'i (as in "sit")', example: 'بِ (bi)', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    { id: 'damma', name: 'Damma', file: 'harakat-damma.wav', mark: '◌ُ', sound: 'u (as in "blue")', example: 'بُ (bu)', color: 'bg-amber-50 border-amber-200 text-amber-700' },
    { id: 'sukun', name: 'Sukun', file: 'harakat-sukun.wav', mark: '◌ْ', sound: 'Silent (stop)', example: 'بْ (b)', color: 'bg-slate-50 border-slate-200 text-slate-700' },
    { id: 'shadda', name: 'Shadda', file: 'harakat-shadda.wav', mark: '◌ّ', sound: 'Doubles letter (emphasis)', example: 'بّ (bb)', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  ];

  const playHarakatExample = useCallback(async (item: typeof harakat[0]) => {
    if (isAudioPlaying) return;

    if (markAudioRef.current) {
      markAudioRef.current.pause();
      markAudioRef.current.currentTime = 0;
      markAudioRef.current = null;
    }

    setPlayingMark(item.id);
    const primaryPath = `/lessons/${item.file}`;

    try {
      const audio = new Audio(primaryPath);
      markAudioRef.current = audio;

      audio.addEventListener('ended', () => {
        setPlayingMark((current) => (current === item.id ? null : current));
        markAudioRef.current = null;
      });

      audio.addEventListener('error', () => {
        // Fallback to simpler filename if primary not found (e.g. /lessons/fatha.wav)
        const fallbackPath = `/lessons/${item.id}.wav`;
        const fallbackAudio = new Audio(fallbackPath);
        markAudioRef.current = fallbackAudio;

        fallbackAudio.addEventListener('ended', () => {
          setPlayingMark((current) => (current === item.id ? null : current));
          markAudioRef.current = null;
        });

        fallbackAudio.addEventListener('error', () => {
          console.warn(`Audio file not found: ${primaryPath} or ${fallbackPath}. Falling back to speech synthesizer.`);
          setPlayingMark((current) => (current === item.id ? null : current));
          markAudioRef.current = null;
          const arabicPart = item.example.split(' ')[0];
          speechService.speak(arabicPart);
        });

        fallbackAudio.play().catch(() => {
          setPlayingMark((current) => (current === item.id ? null : current));
          markAudioRef.current = null;
          const arabicPart = item.example.split(' ')[0];
          speechService.speak(arabicPart);
        });
      });

      await audio.play();
    } catch (error) {
      console.warn(`Failed to play harakat audio:`, error);
      setPlayingMark((current) => (current === item.id ? null : current));
      markAudioRef.current = null;
      const arabicPart = item.example.split(' ')[0];
      speechService.speak(arabicPart);
    }
  }, [isAudioPlaying]);

  const playInstruction = useCallback(async () => {
    if (isAudioPlaying) return;

    if (markAudioRef.current) {
      markAudioRef.current.pause();
      markAudioRef.current.currentTime = 0;
      markAudioRef.current = null;
      setPlayingMark(null);
    }

    setIsAudioPlaying(true);
    const audioPath = `/lessons/harakat.wav`;

    try {
      const audio = new Audio(audioPath);
      instructionAudioRef.current = audio;

      audio.addEventListener('ended', () => {
        setIsAudioPlaying(false);
        instructionAudioRef.current = null;
      });

      audio.addEventListener('error', () => {
        console.warn(`Harakat audio file not found: ${audioPath}`);
        setIsAudioPlaying(false);
        instructionAudioRef.current = null;
      });

      await audio.play();
    } catch (error) {
      console.warn(`Failed to play harakat audio:`, error);
      setIsAudioPlaying(false);
      instructionAudioRef.current = null;
    }
  }, [isAudioPlaying]);

  return (
    <div className="flex flex-col space-y-6 animate-fadeIn h-full">
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Harakat Marks</h2>
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
        {harakat.map((v) => {
          const isItemPlaying = playingMark === v.id;
          return (
            <button
              key={v.name}
              disabled={isAudioPlaying}
              onClick={() => playHarakatExample(v)}
              className={`group py-2.5 px-5 rounded-2xl border-2 shadow-sm flex items-center justify-between text-left transition-all active:scale-95 hover:shadow-md ${v.color} ${
                isAudioPlaying ? 'opacity-50 cursor-not-allowed' : ''
              } ${isItemPlaying ? 'ring-2 ring-teal-500 scale-[1.01]' : ''}`}
            >
              <div className="space-y-0.5">
                <h3 className="text-lg font-black leading-tight">{v.name}</h3>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest leading-tight">{v.sound}</p>
                <div className="text-sm font-medium leading-tight">Example: <span className="arabic-text text-lg">{v.example}</span></div>
              </div>
              <div className="relative">
                <div className="text-4xl arabic-text bg-white px-3 py-1.5 rounded-2xl shadow-inner border border-inherit transition-transform group-hover:scale-110">
                  {v.mark}
                </div>
                {isItemPlaying ? (
                  <Volume2 className="absolute -top-1 -right-1 w-4 h-4 text-inherit animate-pulse" />
                ) : (
                  <Volume1 className="absolute -top-1 -right-1 w-4 h-4 text-inherit opacity-40 group-hover:opacity-100" />
                )}
              </div>
            </button>
          );
        })}
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
