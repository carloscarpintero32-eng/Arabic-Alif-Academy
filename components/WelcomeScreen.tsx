import React from 'react';
import { useSounds } from '../hooks/useSounds';

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
    <div 
      className="flex flex-col justify-between h-full -mx-5 -my-5 relative overflow-hidden flex-1 select-none bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/welcome-bg.png')` }}
    >
      {/* Enter Button with 30% tighter/crisper drop-shadow */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[26%] w-[55%] max-w-[285px] min-w-[200px] z-20 flex justify-center">
        <button
          onClick={handleStart}
          className="w-full flex items-center justify-center transition-all duration-200 hover:scale-[1.025] hover:brightness-[1.03] active:scale-[0.96] cursor-pointer focus:outline-none"
          aria-label="Enter Academy"
        >
          <img 
            src="/images/enter-button.png" 
            alt="Enter Academy" 
            className="w-full h-auto object-contain filter drop-shadow-[0_12px_16px_rgba(10,25,50,0.48)] hover:drop-shadow-[0_16px_21px_rgba(10,25,50,0.58)] transition-all duration-200"
          />
        </button>
      </div>
    </div>
  );
};
