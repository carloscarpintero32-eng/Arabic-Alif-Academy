# Sound Files Setup Guide

## Directory Structure

Create a `public/sounds/` directory in your project with the following .wav files:

```
public/
└── sounds/
    ├── click.wav          # General button click sound
    ├── select.wav         # Selection/navigation sound
    ├── correct.wav        # Correct answer feedback
    ├── incorrect.wav      # Incorrect answer feedback
    ├── success.wav        # Task completion sound
    ├── navigation.wav     # Page/screen navigation
    └── celebration.wav    # Game completion celebration
```

## Where to Get Sound Files

### Option 1: Free Sound Libraries (Recommended)

**Pixabay** (https://pixabay.com/sound-effects/)
- Free for commercial use
- No attribution required
- Good quality WAV files

**Freesound.org** (https://freesound.org/)
- Creative Commons licensed
- Huge library of sounds
- Search for: "UI click", "success beep", "error buzz"

**Mixkit** (https://mixkit.co/free-sound-effects/)
- Free sound effects
- High quality
- UI/Game sounds category

### Option 2: Generate Your Own

**Chirp Tone Generator** (https://chirp.sonowish.com/)
- Create simple beeps and tones
- Export as WAV

**SFXR** (https://sfxr.me/)
- 8-bit style game sound generator
- Perfect for UI feedback sounds

### Option 3: Use Placeholder Sounds

For development, you can use any short WAV files (even silent ones) with the correct names.

## Recommended Sound Types

| Sound File | Description | Duration | Example Search Terms |
|------------|-------------|----------|---------------------|
| `click.wav` | Short, subtle click | 0.1-0.2s | "UI click", "button press" |
| `select.wav` | Slightly longer tone | 0.2-0.3s | "menu select", "interface beep" |
| `correct.wav` | Pleasant, uplifting | 0.3-0.5s | "success", "correct answer", "achievement" |
| `incorrect.wav` | Gentle negative | 0.3-0.5s | "error", "wrong", "buzz" |
| `success.wav` | Satisfying completion | 0.5-1.0s | "task complete", "level up" |
| `navigation.wav` | Whoosh or swoosh | 0.2-0.4s | "transition", "page turn", "whoosh" |
| `celebration.wav` | Triumphant fanfare | 1.0-2.0s | "victory", "win", "celebration" |

## File Format Requirements

- **Format**: WAV (Waveform Audio File Format)
- **Sample Rate**: 44100 Hz or 48000 Hz
- **Bit Depth**: 16-bit
- **Channels**: Mono or Stereo
- **File Size**: Keep under 100KB per file for fast loading

## Converting to WAV

If you have MP3 files, you can convert them using:

**Online Converters:**
- CloudConvert (https://cloudconvert.com/mp3-to-wav)
- Online-Convert (https://audio.online-convert.com/convert-to-wav)

**Software:**
- Audacity (free, open-source audio editor)
- VLC Media Player (can batch convert)

## Testing Your Sounds

After placing the files in `public/sounds/`, the app will automatically try to load them. Check the browser console for any loading errors:

```
Sound service initialized with 7 sounds ✓
```

If a sound fails to load, you'll see:
```
Failed to load sound: click from /sounds/click.wav
```

## Disabling Sounds (For Development)

If you don't have sound files yet, the app will work fine - it just won't play any sounds. The service gracefully handles missing files.

## Quick Setup (Empty Placeholders)

If you want to test without actual sounds, create empty 1-second WAV files:

```bash
# On Windows (using PowerShell)
mkdir public\sounds

# On Mac/Linux
mkdir -p public/sounds
```

Then use a sound generator or copy a single WAV file 7 times with different names.
