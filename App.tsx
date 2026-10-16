
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
import { InstructionsScreen } from './components/InstructionsScreen';
import { HarakatScreen } from './components/HarakatScreen';
import { EndScreen } from './components/EndScreen';
import { XCircle, ChevronLeft } from 'lucide-react';
import { palette, zelligeTexture, plasterTexture } from './utils/moroccanTheme';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [batchIndex, setBatchIndex] = useState(0); 
  const [testMode, setTestMode] = useState<'current' | 'all'>('current');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

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
        return <WelcomeScreen onStart={startAlphabetJourney} />;
      case AppState.MODULES:
        return <LetterSelectionScreen onSelectGroup={handleGroupSelect} onSelectHarakat={handleHarakatSelect} onBack={showWelcome} />;
      case AppState.LETTER_SELECTION:
        return (
          <LetterSelectionScreen 
            onSelectGroup={handleGroupSelect} 
            onSelectHarakat={handleHarakatSelect}
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
            onExit={proceedToGroupSelection} 
            onBackToModules={proceedToGroupSelection}
          />
        );
      case AppState.HARAKAT:
      case AppState.VOWELS:
        return <HarakatScreen onBack={proceedToGroupSelection} />;
      case AppState.END:
        return <EndScreen />;
      default:
        return <WelcomeScreen onStart={startAlphabetJourney} />;
    }
  };

  const showQuitButton = appState !== AppState.WELCOME && appState !== AppState.END;
  const showBackButton = appState !== AppState.WELCOME && appState !== AppState.END;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-0 sm:p-4"
      style={{ background: `radial-gradient(circle at top, ${palette.limewash} 0%, ${palette.warmSand} 45%, #EBDDC8 100%)` }}
    >
      {/* Phone frame with Moroccan gold border */}
      <div
        className="w-full h-full sm:h-[92vh] sm:aspect-[9/18] sm:max-w-[450px] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col relative"
        style={{
          background: palette.plaster,
          border: `2px solid ${palette.borderStrong}`,
          boxShadow: `0 24px 60px ${palette.shadow}`,
        }}
      >
        {/* Header */}
        <header
          className="relative text-white p-5 flex justify-between items-center shrink-0 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${palette.majorelleBlue} 0%, ${palette.zelligeTeal} 100%)`,
            boxShadow: `inset 0 -1px 0 rgba(255,255,255,0.18)`,
          }}
        >
          {/* Texture overlays */}
          <div className="absolute inset-0 opacity-60" style={zelligeTexture(0.09)} />
          <div className="absolute inset-0 opacity-50" style={plasterTexture(0.08)} />

          <div className="relative flex items-center space-x-3">
            {showBackButton && (
              <button
                onClick={showWelcome}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition hover:bg-white/20"
                title="Back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-[18px] font-semibold tracking-[0.01em]">Alif Academy</h1>
          </div>

          {showQuitButton && (
            <button
              onClick={quitGame}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition hover:bg-red-500/40"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </header>

        {/* Progress bar */}
        {(appState === AppState.LESSON || appState === AppState.MINI_GAME) && (
          <div className="absolute top-[72px] left-0 w-full h-1" style={{ background: palette.softClay }}>
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
          className="flex-1 p-5 flex flex-col overflow-y-auto overflow-x-hidden"
          style={{ background: palette.plaster }}
        >
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
