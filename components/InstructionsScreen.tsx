import React from 'react';
import { Volume2, MousePointerClick, Gamepad2, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { useSounds } from '../hooks/useSounds';
import { palette } from '../utils/moroccanTheme';

interface InstructionsScreenProps {
  onContinue: () => void;
  onBack: () => void;
}

export const InstructionsScreen: React.FC<InstructionsScreenProps> = ({ onContinue, onBack }) => {
  const { playClick, playNavigation } = useSounds();

  const handleContinue = () => {
    playClick();
    onContinue();
  };

  const handleBack = () => {
    playNavigation();
    onBack();
  };

  return (
    <div className="flex flex-col space-y-6 animate-fadeIn h-full pb-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-teal-700">
          <HelpCircle className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-widest">Guide & Tutorial</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight border-b-4 border-teal-100 pb-2">
          How to Use the Lessons
        </h2>
        <p className="text-base text-slate-600 leading-relaxed font-medium">
          Follow these simple steps in every letter lesson to get the best learning experience:
        </p>
      </div>

      {/* Step Cards */}
      <div className="flex flex-col space-y-4">
        {/* Step 1 */}
        <div className="bg-white p-5 rounded-2xl border-2 border-teal-100 shadow-sm flex items-start space-x-4">
          <div className="bg-teal-700 text-white p-3 rounded-2xl shrink-0 flex items-center justify-center font-black text-lg w-12 h-12">
            1
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-teal-700" />
              <h3 className="font-bold text-slate-800 text-lg">Play the Lesson Audio First</h3>
            </div>
            <p className="text-sm text-slate-600 leading-normal">
              At the top of each lesson page, tap the <strong className="text-teal-800">Play Lesson</strong> button. Listen carefully to learn the letter's name, pronunciation tips, and how it is articulated.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-5 rounded-2xl border-2 border-amber-100 shadow-sm flex items-start space-x-4">
          <div className="bg-amber-600 text-white p-3 rounded-2xl shrink-0 flex items-center justify-center font-black text-lg w-12 h-12">
            2
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <MousePointerClick className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-800 text-lg">Tap Sample Words to Listen</h3>
            </div>
            <p className="text-sm text-slate-600 leading-normal">
              Click on any of the example word cards (<em className="text-slate-800 font-semibold">Isolated, Initial, Medial, Final</em>) to hear that exact word pronounced clearly by a native speaker.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-5 rounded-2xl border-2 border-purple-100 shadow-sm flex items-start space-x-4">
          <div className="bg-purple-600 text-white p-3 rounded-2xl shrink-0 flex items-center justify-center font-black text-lg w-12 h-12">
            3
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Gamepad2 className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-slate-800 text-lg">Test Your Knowledge</h3>
            </div>
            <p className="text-sm text-slate-600 leading-normal">
              At the end of each letter group, you will be presented with a fun mini-game to put what you learned to the test!
            </p>
          </div>
        </div>
      </div>

      {/* Pro Tip Box */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center space-x-3">
        <Sparkles className="w-6 h-6 text-amber-600 shrink-0" />
        <p className="text-xs text-amber-800 font-semibold leading-relaxed">
          <strong>Pro Tip:</strong> Replay the audio as many times as you need to match your pronunciation with the recording!
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto flex justify-between items-center pt-2">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 bg-white border-2 border-slate-200 text-slate-600 px-5 py-3.5 rounded-xl text-base font-bold hover:bg-slate-50 transition-all"
        >
          <span>Back to Theory</span>
        </button>

        <button
          onClick={handleContinue}
          className="flex items-center space-x-2 text-white px-7 py-3.5 rounded-xl text-base font-bold transition-all shadow-md transform hover:scale-105 active:scale-95"
          style={{ background: palette.majorelleBlue }}
        >
          <span>Start Learning</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
