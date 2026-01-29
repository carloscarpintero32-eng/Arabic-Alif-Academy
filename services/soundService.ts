
export type SoundName =
    | 'click'
    | 'select'
    | 'correct'
    | 'incorrect'
    | 'success'
    | 'navigation'
    | 'celebration';

export class SoundEffectsService {
    private sounds: Map<SoundName, HTMLAudioElement> = new Map();
    private muted: boolean = false;
    private volume: number = 0.5;
    private isInitialized: boolean = false;

    // Sound file mappings
    private soundPaths: Record<SoundName, string> = {
        click: '/sounds/click.wav',
        select: '/sounds/select.wav',
        correct: '/sounds/correct.wav',
        incorrect: '/sounds/incorrect.wav',
        success: '/sounds/success.wav',
        navigation: '/sounds/navigation.wav',
        celebration: '/sounds/celebration.wav',
    };

    /**
     * Initialize and preload all sound files
     */
    async initialize(): Promise<void> {
        if (this.isInitialized) return;

        try {
            const loadPromises = Object.entries(this.soundPaths).map(
                async ([name, path]) => {
                    try {
                        const audio = new Audio(path);
                        audio.volume = this.volume;
                        audio.preload = 'auto';

                        // Wait for the audio to be loaded
                        await new Promise<void>((resolve, reject) => {
                            audio.addEventListener('canplaythrough', () => resolve(), { once: true });
                            audio.addEventListener('error', () => {
                                console.warn(`Failed to load sound: ${name} from ${path}`);
                                resolve(); // Don't reject, just skip this sound
                            }, { once: true });

                            // Timeout after 3 seconds
                            setTimeout(() => resolve(), 3000);
                        });

                        this.sounds.set(name as SoundName, audio);
                    } catch (error) {
                        console.warn(`Error loading sound ${name}:`, error);
                    }
                }
            );

            await Promise.all(loadPromises);
            this.isInitialized = true;
            console.log(`Sound service initialized with ${this.sounds.size} sounds`);
        } catch (error) {
            console.error('Failed to initialize sound service:', error);
        }
    }

    /**
     * Play a sound effect
     */
    play(soundName: SoundName): void {
        if (this.muted) return;

        const sound = this.sounds.get(soundName);
        if (!sound) {
            console.warn(`Sound not found: ${soundName}`);
            return;
        }

        try {
            // Clone the audio to allow overlapping sounds
            const clone = sound.cloneNode() as HTMLAudioElement;
            clone.volume = this.volume;
            clone.play().catch((error) => {
                console.warn(`Failed to play sound ${soundName}:`, error);
            });
        } catch (error) {
            console.warn(`Error playing sound ${soundName}:`, error);
        }
    }

    /**
     * Stop all currently playing sounds
     */
    stopAll(): void {
        this.sounds.forEach((sound) => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    /**
     * Set master volume (0.0 to 1.0)
     */
    setVolume(level: number): void {
        this.volume = Math.max(0, Math.min(1, level));
        this.sounds.forEach((sound) => {
            sound.volume = this.volume;
        });
    }

    /**
     * Get current volume
     */
    getVolume(): number {
        return this.volume;
    }

    /**
     * Mute all sounds
     */
    mute(): void {
        this.muted = true;
    }

    /**
     * Unmute all sounds
     */
    unmute(): void {
        this.muted = false;
    }

    /**
     * Toggle mute state
     */
    toggleMute(): void {
        this.muted = !this.muted;
    }

    /**
     * Check if muted
     */
    isMuted(): boolean {
        return this.muted;
    }

    /**
     * Check if initialized
     */
    isReady(): boolean {
        return this.isInitialized;
    }

    /**
     * Cleanup and dispose of all audio resources
     */
    dispose(): void {
        this.stopAll();
        this.sounds.clear();
        this.isInitialized = false;
    }
}

// Export singleton instance
export const soundEffects = new SoundEffectsService();
