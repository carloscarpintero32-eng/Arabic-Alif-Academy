
import { useEffect, useCallback, useState } from 'react';
import { soundEffects, SoundName } from '../services/soundService';

export interface UseSoundsReturn {
    // Play functions for each sound
    playClick: () => void;
    playSelect: () => void;
    playCorrect: () => void;
    playIncorrect: () => void;
    playSuccess: () => void;
    playNavigation: () => void;
    playCelebration: () => void;

    // Generic play function
    play: (soundName: SoundName) => void;

    // Control functions
    stopAll: () => void;
    setVolume: (level: number) => void;
    toggleMute: () => void;

    // State
    isMuted: boolean;
    volume: number;
    isReady: boolean;
}

/**
 * React hook for using sound effects throughout the app
 * 
 * @example
 * const { playClick, playCorrect, toggleMute } = useSounds();
 * 
 * <button onClick={playClick}>Click me</button>
 */
export function useSounds(): UseSoundsReturn {
    const [isMuted, setIsMuted] = useState(soundEffects.isMuted());
    const [volume, setVolumeState] = useState(soundEffects.getVolume());
    const [isReady, setIsReady] = useState(soundEffects.isReady());

    // Initialize sound service on mount
    useEffect(() => {
        if (!soundEffects.isReady()) {
            soundEffects.initialize().then(() => {
                setIsReady(true);
            });
        }

        // Cleanup on unmount
        return () => {
            // Don't dispose here as other components might be using it
            // soundEffects.dispose();
        };
    }, []);

    // Individual play functions
    const playClick = useCallback(() => soundEffects.play('click'), []);
    const playSelect = useCallback(() => soundEffects.play('select'), []);
    const playCorrect = useCallback(() => soundEffects.play('correct'), []);
    const playIncorrect = useCallback(() => soundEffects.play('incorrect'), []);
    const playSuccess = useCallback(() => soundEffects.play('success'), []);
    const playNavigation = useCallback(() => soundEffects.play('navigation'), []);
    const playCelebration = useCallback(() => soundEffects.play('celebration'), []);

    // Generic play function
    const play = useCallback((soundName: SoundName) => {
        soundEffects.play(soundName);
    }, []);

    // Control functions
    const stopAll = useCallback(() => {
        soundEffects.stopAll();
    }, []);

    const setVolume = useCallback((level: number) => {
        soundEffects.setVolume(level);
        setVolumeState(level);
    }, []);

    const toggleMute = useCallback(() => {
        soundEffects.toggleMute();
        setIsMuted(soundEffects.isMuted());
    }, []);

    return {
        playClick,
        playSelect,
        playCorrect,
        playIncorrect,
        playSuccess,
        playNavigation,
        playCelebration,
        play,
        stopAll,
        setVolume,
        toggleMute,
        isMuted,
        volume,
        isReady,
    };
}
