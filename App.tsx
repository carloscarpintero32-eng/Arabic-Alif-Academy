
import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { AppState } from './types';
import { speechService } from './services/geminiService';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ModulesScreen } from './components/ModulesScreen';
import { LetterSelectionScreen } from './components/LetterSelectionScreen';
import { TheoryScreen } from './components/TheoryScreen';
import { LessonScreen } from './components/LessonScreen';
import { GamePrompt } from './components/GamePrompt';
import { MiniGame } from './components/MiniGame';
import { InstructionsScreen } from './components/InstructionsScreen';
import { HarakatScreen } from './components/HarakatScreen';
import { EndScreen } from './components/EndScreen';
import { palette } from './utils/moroccanTheme';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [batchIndex, setBatchIndex] = useState(0); 
  const [testMode, setTestMode] = useState<'current' | 'all'>('current');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [gameQuestionsCount, setGameQuestionsCount] = useState(10);
  const mainRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const resetScroll = () => {
      if (mainRef.current) {
        mainRef.current.scrollTop = 0;
      }
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    resetScroll();
    const rafId = requestAnimationFrame(resetScroll);
    return () => cancelAnimationFrame(rafId);
  }, [appState, batchIndex, currentLetterIndex]);

  const showWelcome = useCallback(() => {
    speechService.stop();
    setAppState(AppState.WELCOME);
  }, []);

  const startAlphabetJourney = useCallback(() => {
    speechService.stop();
    setAppState(AppState.THEORY);
  }, []);

  const showInstructions = useCallback(() => {
    speechService.stop();
    setAppState(AppState.INSTRUCTIONS);
  }, []);

  const proceedToGroupSelection = useCallback(() => {
    speechService.stop();
    setAppState(AppState.LETTER_SELECTION);
  }, []);

  const handleGroupSelect = useCallback((batch: number) => {
    setBatchIndex(batch);
    setCurrentLetterIndex(0);
    setAppState(AppState.LESSON);
  }, []);

  const handleHarakatSelect = useCallback(() => {
    setAppState(AppState.HARAKAT);
  }, []);

  const handleTestKnowledge = useCallback(() => {
    speechService.stop();
    setBatchIndex(3);
    setTestMode('all');
    setGameQuestionsCount(20);
    setAppState(AppState.MINI_GAME);
  }, []);

  const handleLessonComplete = useCallback(() => {
    setGameQuestionsCount(10);
    setAppState(AppState.MINI_GAME);
  }, []);

  const handleBatchTwoStart = useCallback((mode: 'current' | 'all') => {
    setTestMode(mode);
    setGameQuestionsCount(10);
    setAppState(AppState.MINI_GAME);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.WELCOME:
        return <WelcomeScreen onStart={startAlphabetJourney} />;
      case AppState.MODULES:
        return (
          <LetterSelectionScreen 
            onSelectGroup={handleGroupSelect} 
            onSelectHarakat={handleHarakatSelect} 
            onTestKnowledge={handleTestKnowledge}
            onBack={showWelcome} 
          />
        );
      case AppState.LETTER_SELECTION:
        return (
          <LetterSelectionScreen 
            onSelectGroup={handleGroupSelect} 
            onSelectHarakat={handleHarakatSelect}
            onTestKnowledge={handleTestKnowledge}
            onBack={showWelcome} 
          />
        );
      case AppState.THEORY:
        return <TheoryScreen onContinue={proceedToGroupSelection} onShowGuide={showInstructions} />;
      case AppState.INSTRUCTIONS:
        return <InstructionsScreen onContinue={proceedToGroupSelection} onBack={startAlphabetJourney} />;
      case AppState.LESSON:
        return (
          <LessonScreen 
            batchIndex={batchIndex} 
            onBackToModules={proceedToGroupSelection}
            onComplete={batchIndex >= 1 ? () => setAppState(AppState.GAME_PROMPT) : handleLessonComplete} 
            currentLetterIndex={currentLetterIndex}
            setCurrentLetterIndex={setCurrentLetterIndex}
          />
        );
      case AppState.GAME_PROMPT:
        return <GamePrompt batchIndex={batchIndex} onSelect={handleBatchTwoStart} onBackToModules={proceedToGroupSelection} />;
      case AppState.MINI_GAME:
        return (
          <MiniGame 
            batchIndex={batchIndex} 
            testMode={testMode} 
            totalQuestions={gameQuestionsCount}
            onExit={proceedToGroupSelection} 
            onBackToModules={proceedToGroupSelection}
          />
        );
      case AppState.HARAKAT:
        return <HarakatScreen onBack={proceedToGroupSelection} />;
      case AppState.END:
        return <EndScreen />;
      default:
        return <WelcomeScreen onStart={startAlphabetJourney} />;
    }
  };

  return (
    <div
      className="min-h-screen h-[100dvh] flex items-center justify-center p-0 sm:p-4"
      style={{ background: `radial-gradient(circle at top, ${palette.limewash} 0%, ${palette.warmSand} 45%, #EBDDC8 100%)` }}
    >
      {/* Phone frame with Moroccan gold border */}
      <div
        className="w-full h-full sm:h-[92vh] sm:aspect-[9/18] sm:max-w-[450px] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative sm:border-2"
        style={{
          background: palette.plaster,
          borderColor: palette.borderStrong,
          boxShadow: `0 24px 60px ${palette.shadow}`,
        }}
      >
        {/* Progress bar */}
        {(appState === AppState.LESSON || appState === AppState.MINI_GAME) && (
          <div className="w-full h-1 shrink-0 mt-[env(safe-area-inset-top)]" style={{ background: palette.softClay }}>
            <div
              className="h-full transition-all duration-500"
              style={{
                background: `linear-gradient(90deg, ${palette.saffronGold}, ${palette.terracotta})`,
                width: appState === AppState.LESSON ? `${((currentLetterIndex + 1) / 7) * 100}%` : '100%',
              }}
            />
          </div>
        )}

        <main
          ref={mainRef}
          key={`${appState}-${batchIndex}-${currentLetterIndex}`}
          className={`flex-1 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] flex flex-col overflow-y-auto overflow-x-hidden ${
            appState === AppState.WELCOME ? 'pt-5' : 'pt-[max(1.25rem,env(safe-area-inset-top))]'
          }`}
          style={{ background: palette.plaster }}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
