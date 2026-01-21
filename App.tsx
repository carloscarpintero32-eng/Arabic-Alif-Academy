
import React, { useState, useCallback } from 'react';
import { AppState } from './types';
import { speechService } from './services/geminiService';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ModulesScreen } from './components/ModulesScreen';
import { TheoryScreen } from './components/TheoryScreen';
import { LessonScreen } from './components/LessonScreen';
import { GamePrompt } from './components/GamePrompt';
import { MiniGame } from './components/MiniGame';
import { EndScreen } from './components/EndScreen';
import { XCircle, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [batchIndex, setBatchIndex] = useState(0); // 0 = first 5, 1 = next 5
  const [testMode, setTestMode] = useState<'current' | 'all'>('current');

  const showModules = useCallback(() => {
    speechService.stop();
    setAppState(AppState.MODULES);
  }, []);

  const handleModuleSelect = useCallback((moduleId: string) => {
    if (moduleId === 'm1') {
      setBatchIndex(0);
      setAppState(AppState.THEORY);
    }
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
        return <WelcomeScreen onStart={showModules} />;
      case AppState.MODULES:
        return <ModulesScreen onSelectModule={handleModuleSelect} />;
      case AppState.THEORY:
        return <TheoryScreen onContinue={proceedToLessons} onBackToModules={showModules} />;
      case AppState.LESSON:
        return (
          <LessonScreen 
            batchIndex={batchIndex} 
            onBackToModules={showModules}
            onComplete={batchIndex === 1 ? () => setAppState(AppState.GAME_PROMPT) : handleLessonComplete} 
          />
        );
      case AppState.GAME_PROMPT:
        return <GamePrompt onSelect={handleBatchTwoStart} onBackToModules={showModules} />;
      case AppState.MINI_GAME:
        return (
          <MiniGame 
            batchIndex={batchIndex} 
            testMode={testMode} 
            onComplete={handleGameComplete} 
            onBackToModules={showModules}
          />
        );
      case AppState.END:
        return <EndScreen />;
      default:
        return <WelcomeScreen onStart={showModules} />;
    }
  };

  const showQuitButton = appState !== AppState.WELCOME && appState !== AppState.END;
  const showBackButton = appState !== AppState.WELCOME && appState !== AppState.MODULES && appState !== AppState.END;

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-indigo-100 flex flex-col min-h-[600px]">
        <header className="bg-indigo-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button 
                onClick={showModules}
                className="p-1 hover:bg-indigo-500 rounded-full transition-colors mr-2"
                title="Back to Modules"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
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
            {appState === AppState.MODULES && "Choose Your Path"}
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
