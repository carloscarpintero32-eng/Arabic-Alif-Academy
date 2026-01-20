
import { GoogleGenAI, Modality } from "@google/genai";

const decodeBase64 = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
};

export class SpeechService {
  private audioContext: AudioContext | null = null;
  private currentSource: AudioBufferSourceNode | null = null;

  constructor() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000
      });
    } catch (e) {
      console.warn("AudioContext not supported", e);
    }
  }

  private async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async fallbackSpeak(text: string): Promise<void> {
    console.log("Falling back to browser SpeechSynthesis...");
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve();
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      // Try to find an Arabic voice if the text contains Arabic characters
      const voices = window.speechSynthesis.getVoices();
      const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
      if (arabicVoice) utterance.voice = arabicVoice;
      
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }

  async speak(text: string, retryCount = 0): Promise<void> {
    const MAX_RETRIES = 2;
    const INITIAL_BACKOFF = 1000;

    if (!process.env.API_KEY) {
      console.warn("API Key is missing for TTS");
      return this.fallbackSpeak(text);
    }

    if (this.currentSource) {
      try { this.currentSource.stop(); } catch(e) {}
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio || !this.audioContext) {
        return this.fallbackSpeak(text);
      }

      const audioData = decodeBase64(base64Audio);
      const audioBuffer = await decodeAudioData(audioData, this.audioContext, 24000, 1);

      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      this.currentSource = source;
      source.start();

      return new Promise((resolve) => {
        source.onended = () => resolve();
      });
    } catch (error: any) {
      console.error(`TTS generation attempt ${retryCount + 1} failed:`, error);
      
      // Handle Quota Exhausted (429) with exponential backoff
      if (error?.message?.includes('429') || error?.status === 429) {
        if (retryCount < MAX_RETRIES) {
          const waitTime = INITIAL_BACKOFF * Math.pow(2, retryCount);
          console.log(`Quota exceeded. Retrying in ${waitTime}ms...`);
          await this.sleep(waitTime);
          return this.speak(text, retryCount + 1);
        }
      }

      // If retries exhausted or other error, use browser fallback
      return this.fallbackSpeak(text);
    }
  }

  stop() {
    if (this.currentSource) {
      try { this.currentSource.stop(); } catch(e) {}
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechService = new SpeechService();
