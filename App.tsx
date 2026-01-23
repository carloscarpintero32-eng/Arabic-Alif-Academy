
import React, { useState, useCallback } from 'react';
import { AppState } from './types';
import { speechService } from './services/geminiService';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ModulesScreen } from './components/ModulesScreen';
import { LetterSelectionScreen } from './components/LetterSelectionScreen';
import { TheoryScreen } from './components/TheoryScreen';
import { LessonScreen } from './components/LessonScreen';
import { GamePrompt } from './components/GamePrompt';
import { MiniGame } from './components/MiniGame';
import { VowelsScreen } from './components/VowelsScreen';
import { EndScreen } from './components/EndScreen';
import { XCircle, ChevronLeft } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [batchIndex, setBatchIndex] = useState(0); 
  const [testMode, setTestMode] = useState<'current' | 'all'>('current');

  const showModules = useCallback(() => {
    speechService.stop();
    setAppState(AppState.MODULES);
  }, []);

  const handleModuleSelect = useCallback((moduleId: string) => {
    if (moduleId === 'm1') {
      setAppState(AppState.THEORY);
    }
  }, []);

  const proceedToGroupSelection = useCallback(() => {
    setAppState(AppState.LETTER_SELECTION);
  }, []);

  const handleGroupSelect = useCallback((batch: number) => {
    setBatchIndex(batch);
    setAppState(AppState.LESSON);
  }, []);

  const handleVowelsSelect = useCallback(() => {
    setAppState(AppState.VOWELS);
  }, []);

  const handleLessonComplete = useCallback(() => {
    setAppState(AppState.MINI_GAME);
  }, []);

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
      case AppState.LETTER_SELECTION:
        return (
          <LetterSelectionScreen 
            onSelectGroup={handleGroupSelect} 
            onSelectVowels={handleVowelsSelect}
            onBack={showModules} 
          />
        );
      case AppState.THEORY:
        return <TheoryScreen onContinue={proceedToGroupSelection} onBackToModules={showModules} />;
      case AppState.LESSON:
        return (
          <LessonScreen 
            batchIndex={batchIndex} 
            onBackToModules={showModules}
            onComplete={batchIndex >= 1 ? () => setAppState(AppState.GAME_PROMPT) : handleLessonComplete} 
          />
        );
      case AppState.GAME_PROMPT:
        return <GamePrompt onSelect={handleBatchTwoStart} onBackToModules={showModules} />;
      case AppState.MINI_GAME:
        return (
          <MiniGame 
            batchIndex={batchIndex} 
            testMode={testMode} 
            onExit={proceedToGroupSelection} 
            onBackToModules={showModules}
          />
        );
      case AppState.VOWELS:
        return <VowelsScreen onBack={proceedToGroupSelection} />;
      case AppState.END:
        return <EndScreen />;
      default:
        return <WelcomeScreen onStart={showModules} />;
    }
  };

  const showQuitButton = appState !== AppState.WELCOME && appState !== AppState.END;
  const showBackButton = appState !== AppState.WELCOME && appState !== AppState.MODULES && appState !== AppState.END;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 sm:p-4">
      {/* Mobile Wrapper: 18:9 Aspect Ratio on desktop, full screen on mobile */}
      <div className="w-full h-full sm:h-[92vh] sm:aspect-[9/18] sm:max-w-[450px] bg-white sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative border border-slate-800">
        <header className="bg-indigo-600 text-white p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <button 
                onClick={showModules}
                className="p-1 hover:bg-indigo-500 rounded-full transition-colors"
                title="Back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-xl font-bold tracking-tight">Alif Academy</h1>
          </div>
          {showQuitButton && (
            <button 
              onClick={quitGame}
              className="p-1 hover:bg-red-500 rounded-lg transition-colors text-white/80"
            >
              <XCircle className="w-6 h-6" />
            </button>
          )}
        </header>
        
        <main className="flex-1 p-5 flex flex-col overflow-y-auto overflow-x-hidden">
          {renderContent()}
        </main>
        
        {/* Progress indicator for lessons/games */}
        {(appState === AppState.LESSON || appState === AppState.MINI_GAME) && (
          <div className="absolute top-[72px] left-0 w-full h-1 bg-indigo-100">
             <div 
               className="h-full bg-indigo-500 transition-all duration-500"
               style={{ 
                 width: appState === AppState.LESSON 
                   ? `${(batchIndex + 1) * 25}%` 
                   : '100%' 
               }}
             />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
