LETTER LESSON AUDIO FILES
==========================

This directory should contain audio files for each Arabic letter lesson.

File Naming Convention:
-----------------------
letter-{ID}.wav

Where {ID} is the letter's ID number from the ALPHABET_DATA constant.

Required Files (28 total):
---------------------------
letter-1.wav   → Alif (أ)
letter-2.wav   → Ba (ب)
letter-3.wav   → Ta (ت)
letter-4.wav   → Tha (ث)
letter-5.wav   → Jeem (ج)
letter-6.wav   → Haa (ح)
letter-7.wav   → Kha (خ)
letter-8.wav   → Dal (د)
letter-9.wav   → Thal (ذ)
letter-10.wav  → Ra (ر)
letter-11.wav  → Zay (ز)
letter-12.wav  → Seen (س)
letter-13.wav  → Sheen (ش)
letter-14.wav  → Sad (ص)
letter-15.wav  → Dad (ض)
letter-16.wav  → Taa (ط)
letter-17.wav  → Zaa (ظ)
letter-18.wav  → Ayn (ع)
letter-19.wav  → Ghayn (غ)
letter-20.wav  → Fa (ف)
letter-21.wav  → Qaf (ق)
letter-22.wav  → Kaf (ك)
letter-23.wav  → Lam (ل)
letter-24.wav  → Meem (م)
letter-25.wav  → Noon (ن)
letter-26.wav  → Ha (ه)
letter-27.wav  → Waw (و)
letter-28.wav  → Ya (ي)

Audio Content Suggestion:
--------------------------
Each audio file should contain:
1. Letter name (e.g., "The letter Alif")
2. English sound comparison (e.g., "Like the 'a' in 'apple'")
3. Pronunciation tip (e.g., "Keep your throat relaxed...")
4. Examples in different forms (isolated, initial, medial, final)

Or simply a clear pronunciation of the letter.

File Specifications:
--------------------
- Format: WAV
- Sample Rate: 44100 Hz recommended
- Duration: 10-30 seconds per letter
- Quality: Clear, no background noise
- Voice: Native Arabic speaker preferred

Fallback Behavior:
------------------
If an audio file is missing, the app will:
- Show a console warning
- NOT play any sound
- Continue functioning normally

The app is designed to handle missing files gracefully during development.
