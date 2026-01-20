
import React, { useState, useCallback, useEffect } from 'react';
import { AppState, ArabicLetter } from './types';
import { ALPHABET_DATA } from './constants';
import { speechService } from './services/geminiService';
import { WelcomeScreen } from './components/WelcomeScreen';
import { TheoryScreen } from './components/TheoryScreen';
import { LessonScreen } from './components/LessonScreen';
import { GamePrompt } from './components/GamePrompt';
import { MiniGame } from './components/MiniGame';
import { EndScreen } from './components/EndScreen';
import { XCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [batchIndex, setBatchIndex] = useState(0); // 0 = first 5, 1 = next 5
  const [testMode, setTestMode] = useState<'current' | 'all'>('current');

  const startLearning = useCallback(() => {
    setAppState(AppState.THEORY);
  }, []);

  const proceedToLessons = useCallback(() => {
    setAppState(AppState.LESSON);
  }, []);

  const handleLessonComplete = useCallback(() => {
    setAppState(AppState.MINI_GAME);
  }, []);

  const handleGameComplete = useCallback(() => {
    if (batchIndex === 0) {
      setBatchIndex(1);
      setAppState(AppState.LESSON);
    } else {
      setAppState(AppState.END);
    }
  }, [batchIndex]);

  const handleBatchTwoStart = useCallback((mode: 'current' | 'all') => {
    setTestMode(mode);
    setAppState(AppState.MINI_GAME);
  }, []);

  const quitGame = useCallback(() => {
    speechService.stop();
    setAppState(AppState.END);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.WELCOME:
        return <WelcomeScreen onStart={startLearning} />;
      case AppState.THEORY:
        return <TheoryScreen onContinue={proceedToLessons} />;
      case AppState.LESSON:
        return (
          <LessonScreen 
            batchIndex={batchIndex} 
            onComplete={batchIndex === 1 ? () => setAppState(AppState.GAME_PROMPT) : handleLessonComplete} 
          />
        );
      case AppState.GAME_PROMPT:
        return <GamePrompt onSelect={handleBatchTwoStart} />;
      case AppState.MINI_GAME:
        return (
          <MiniGame 
            batchIndex={batchIndex} 
            testMode={testMode} 
            onComplete={handleGameComplete} 
          />
        );
      case AppState.END:
        return <EndScreen />;
      default:
        return <WelcomeScreen onStart={startLearning} />;
    }
  };

  const showQuitButton = appState !== AppState.WELCOME && appState !== AppState.END;

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 flex flex-col min-h-[600px]">
        <header className="bg-indigo-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold tracking-tight">Arabic Alif Academy</h1>
            {showQuitButton && (
              <button 
                onClick={quitGame}
                className="flex items-center space-x-1 bg-indigo-500 hover:bg-red-500 px-3 py-1 rounded-lg text-xs font-bold transition-colors border border-indigo-400"
              >
                <XCircle className="w-3 h-3" />
                <span>Stop Game</span>
              </button>
            )}
          </div>
          <div className="text-sm font-medium opacity-80">
            {appState === AppState.LESSON && `Module: Letters ${batchIndex * 5 + 1}-${(batchIndex + 1) * 5}`}
            {appState === AppState.MINI_GAME && "Mini Game Time!"}
          </div>
        </header>
        
        <main className="flex-1 p-8 flex flex-col relative">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
