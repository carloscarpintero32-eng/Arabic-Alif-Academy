
import React, { useState, useCallback } from 'react';
import { ALPHABET_DATA } from '../constants';
import { speechService } from '../services/geminiService';
import { useSounds } from '../hooks/useSounds';
import { ArrowRight, ArrowLeft, PlayCircle, Volume2, Grid as GridIcon, Volume1 } from 'lucide-react';
import { Example } from '../types';

interface LessonScreenProps {
  batchIndex: number;
  onComplete: () => void;
  onBackToModules: () => void;
}

const HighlightedWord: React.FC<{ example: Example }> = ({ example }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[30px] arabic-text dir-rtl mb-0.5">
        <span className="text-slate-500">{example.prefix}</span>
        <span className="text-teal-700 font-bold">{example.letter}</span>
        <span className="text-slate-500">{example.suffix}</span>
      </div>
      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">
        {example.translation}
      </div>
    </div>
  );
};

export const LessonScreen: React.FC<LessonScreenProps> = ({ batchIndex, onComplete, onBackToModules }) => {
  const letters = ALPHABET_DATA.slice(batchIndex * 7, (batchIndex + 1) * 7);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isWordPlaying, setIsWordPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const currentLetter = letters[currentLetterIndex];
  const { playClick, playNavigation } = useSounds();

  const playInstruction = useCallback(async () => {
    if (isAudioPlaying || !currentLetter) return;

    setIsAudioPlaying(true);
    setAudioError(false);

    // Audio file path format: /lessons/letter-{id}.wav
    // Example: /lessons/letter-1.wav for Alif (أ)
    const audioPath = `/lessons/letter-${currentLetter.id}.wav`;

    try {
      const audio = new Audio(audioPath);

      // Handle successful playback
      audio.addEventListener('ended', () => {
        setIsAudioPlaying(false);
      });

      // Handle errors (file not found, etc.)
      audio.addEventListener('error', () => {
        console.warn(`Audio file not found: ${audioPath}`);
        setAudioError(true);
        setIsAudioPlaying(false);
      });

      await audio.play();
    } catch (error) {
      console.warn(`Failed to play audio for letter ${currentLetter.name}:`, error);
      setAudioError(true);
      setIsAudioPlaying(false);
    }
  }, [currentLetter, isAudioPlaying]);

  const playWord = useCallback(async (example: Example, position: string) => {
    if (isAudioPlaying || isWordPlaying) return;
    const audioPath = `/words/letter-${currentLetter.id}-${position}.wav`;
    setIsWordPlaying(true);
    try {
      const audio = new Audio(audioPath);
      audio.addEventListener('ended', () => {
        setIsWordPlaying(false);
      });
      audio.addEventListener('error', () => {
        console.warn(`Word audio file not found: ${audioPath}`);
        setIsWordPlaying(false);
      });
      await audio.play();
    } catch (error) {
      console.warn(`Failed to play word audio for ${example.translation}:`, error);
      setIsWordPlaying(false);
    }
  }, [currentLetter, isAudioPlaying, isWordPlaying]);

  const handleNext = () => {
    playClick();
    // Stop any currently playing audio
    setIsAudioPlaying(false);
    setAudioError(false);

    if (currentLetterIndex < letters.length - 1) {
      setCurrentLetterIndex(currentLetterIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    playClick();
    setIsAudioPlaying(false);
    setAudioError(false);
    setCurrentLetterIndex(currentLetterIndex - 1);
  };

  const handleBack = () => {
    playNavigation();
    onBackToModules();
  };

  if (!currentLetter) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex flex-col h-full animate-fadeIn">
      <div className="mb-2">
        <div className="flex justify-between items-baseline">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Letter {currentLetter.name}
            <span className="text-slate-400 text-sm font-bold tracking-widest uppercase ml-2">/ {currentLetter.transliteration} /</span>
          </h2>
          <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">
            {currentLetterIndex + 1} / {letters.length}
          </span>
        </div>
      </div>

      <button
        onClick={() => playInstruction()}
        disabled={isAudioPlaying}
        className={`w-full mb-3 flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 transition-all transform active:scale-95 shadow-sm ${isAudioPlaying
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

      {/* Shapes Grid - 2x2 for mobile aspect */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {[
          { label: 'Isolated', shape: currentLetter.isolated, ex: currentLetter.examples.isolated, position: 'isolated' },
          { label: 'Initial', shape: currentLetter.initial, ex: currentLetter.examples.initial, position: 'initial' },
          { label: 'Medial', shape: currentLetter.medial, ex: currentLetter.examples.medial, position: 'medial' },
          { label: 'Final', shape: currentLetter.final, ex: currentLetter.examples.final, position: 'final' },
        ].map((state) => (
          <button
            key={state.label}
            disabled={isAudioPlaying || isWordPlaying}
            onClick={() => playWord(state.ex, state.position)}
            className={`group relative bg-white border-2 rounded-2xl px-5 pt-5 pb-5 text-center shadow-sm flex flex-col items-center justify-between min-h-[237px] transition-all ${
              isAudioPlaying || isWordPlaying
                ? 'border-slate-300 opacity-50 cursor-not-allowed'
                : 'border-slate-300 hover:border-teal-400 hover:shadow-md active:scale-95'
            }`}
          >
            <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <Volume1 className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl arabic-text text-teal-700 leading-none group-hover:scale-110 transition-transform">{state.shape}</span>
            </div>
            <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{state.label}</span>
            <HighlightedWord example={state.ex} />
          </button>
        ))}
      </div>

      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 mb-3">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Teacher's Note</h4>
        <p className="text-xs text-slate-600 leading-tight">
          {currentLetter.englishComparison} {currentLetter.mouthTips}
        </p>
      </div>

      <div className="mt-auto pt-4 flex flex-col space-y-3">
        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center space-x-2 bg-teal-700 text-white p-5 rounded-2xl text-lg font-black hover:bg-teal-800 transition-all shadow-lg active:scale-95"
        >
          <span>{currentLetterIndex === letters.length - 1 ? 'Start Practice' : 'Next Letter'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {currentLetterIndex > 0 && (
          <button
            onClick={handlePrevious}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-500 p-4 rounded-2xl text-sm font-black hover:bg-slate-50 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Letter</span>
          </button>
        )}

        <button
          onClick={onBackToModules}
          className="w-full flex items-center justify-center space-x-2 bg-white border border-slate-200 text-slate-400 p-3 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
        >
          <GridIcon className="w-4 h-4" />
          <span>Back to Groups</span>
        </button>
      </div>
    </div>
  );
};
