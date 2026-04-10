
import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { useSounds } from '../hooks/useSounds';
import { palette, plasterTexture, zelligeTexture } from '../utils/moroccanTheme';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const { playClick } = useSounds();

  const handleStart = () => {
    playClick();
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn h-full py-4">
      {/* Logo circle */}
      <div className="relative">
        <div
          className="relative w-28 h-28 rounded-full flex items-center justify-center mb-2 shadow-xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${palette.majorelleBlue} 0%, ${palette.zelligeTeal} 100%)`,
            boxShadow: `0 16px 32px rgba(26,60,110,0.28), inset 0 1px 0 rgba(255,255,255,0.18)`,
          }}
        >
          <div className="absolute inset-0 opacity-60" style={zelligeTexture(0.1)} />
          <div className="absolute inset-0 opacity-40" style={plasterTexture(0.1)} />
          <span className="relative text-5xl arabic-text text-white">أ</span>
        </div>
        <Sparkles
          className="absolute -top-3 -right-3 w-8 h-8 animate-pulse"
          style={{ color: palette.saffronGold }}
        />
      </div>

      {/* Heading */}
      <div className="space-y-3">
        <h2
          className="text-4xl font-black tracking-tight leading-tight"
          style={{ color: palette.charcoal }}
        >
          Assalamu Alaikum!
        </h2>
        <p
          className="text-[15px] font-medium leading-relaxed px-4"
          style={{ color: palette.mutedBrown }}
        >
          Master the beautiful Arabic script through guided lessons and games.
        </p>
      </div>

      {/* Ornamental divider */}
      <div className="flex items-center gap-3 w-full px-6 opacity-80">
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${palette.borderStrong}, transparent)` }} />
        <div className="text-[11px] tracking-[0.35em]" style={{ color: palette.saffronGold }}>◆</div>
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${palette.borderStrong}, transparent)` }} />
      </div>

      {/* CTA Button */}
      <div className="w-full">
        <button
          onClick={handleStart}
          className="relative w-full flex items-center justify-center space-x-3 text-white p-6 rounded-[2rem] text-xl font-bold transition-transform hover:scale-[1.01] active:scale-95 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${palette.majorelleBlue} 0%, ${palette.zelligeTeal} 100%)`,
            boxShadow: `0 16px 28px rgba(26,60,110,0.24), inset 0 1px 0 rgba(255,255,255,0.18)`,
          }}
        >
          <div className="absolute inset-0 opacity-50" style={zelligeTexture(0.1)} />
          <div className="absolute inset-0 opacity-30" style={plasterTexture(0.07)} />
          <BookOpen className="relative w-6 h-6" />
          <span className="relative">Enter Academy</span>
        </button>
      </div>
    </div>
  );
};
