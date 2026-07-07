import { useRef, useCallback, useEffect, useState } from 'react';

// Sound types
export type SoundType = 'boot' | 'click' | 'whoosh' | 'portal' | 'achievement';

// Sound configurations - subtle sci-fi interface sounds
const soundConfigs = {
  boot: {
    frequency: [120, 180, 240],
    duration: 0.8,
    type: 'sine' as OscillatorType,
    gain: 0.15,
    delay: 0,
  },
  click: {
    frequency: [800, 1200],
    duration: 0.08,
    type: 'sine' as OscillatorType,
    gain: 0.1,
    delay: 0,
  },
  whoosh: {
    frequency: [200, 400, 200],
    duration: 0.3,
    type: 'sawtooth' as OscillatorType,
    gain: 0.08,
    delay: 0,
  },
  portal: {
    frequency: [100, 150, 200, 300, 400],
    duration: 2.0,
    type: 'sine' as OscillatorType,
    gain: 0.2,
    delay: 0,
  },
  achievement: {
    frequency: [523, 659, 784],
    duration: 0.4,
    type: 'sine' as OscillatorType,
    gain: 0.12,
    delay: 0,
  },
};

class SoundSystem {
  private audioContext: AudioContext | null = null;
  private isInitialized = false;
  private isMuted = false;

  constructor() {
    // Check localStorage for saved preference
    const savedMuted = localStorage.getItem('chronos-sound-muted');
    this.isMuted = savedMuted === 'true';
  }

  // Initialize audio context on first user interaction
  init(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isInitialized && this.audioContext) {
        resolve();
        return;
      }

      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.isInitialized = true;

        // Resume context if suspended (browser autoplay policy)
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume().then(() => resolve());
        } else {
          resolve();
        }
      } catch {
        console.warn('Audio context not available');
        resolve();
      }
    });
  }

  setMuted(muted: boolean): void {
    this.isMuted = muted;
    localStorage.setItem('chronos-sound-muted', String(muted));
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  // Play a synthesized sound
  play(type: SoundType): void {
    if (this.isMuted || !this.audioContext) return;

    const config = soundConfigs[type];
    if (!config) return;

    try {
      const now = this.audioContext.currentTime;

      // Create oscillators for each frequency
      config.frequency.forEach((freq, index) => {
        const osc = this.audioContext!.createOscillator();
        const gain = this.audioContext!.createGain();

        osc.type = config.type;
        osc.frequency.setValueAtTime(freq, now + config.delay);

        // Add subtle frequency modulation for richer sound
        if (type === 'boot' || type === 'portal') {
          osc.frequency.exponentialRampToValueAtTime(
            freq * 1.5,
            now + config.delay + config.duration * 0.5
          );
          osc.frequency.exponentialRampToValueAtTime(
            freq * 0.8,
            now + config.delay + config.duration
          );
        }

        // Gain envelope
        gain.gain.setValueAtTime(0, now + config.delay);
        gain.gain.linearRampToValueAtTime(
          config.gain / config.frequency.length,
          now + config.delay + config.duration * 0.1
        );
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + config.delay + config.duration
        );

        osc.connect(gain);
        gain.connect(this.audioContext!.destination);

        osc.start(now + config.delay + (index * config.duration * 0.15));
        osc.stop(now + config.delay + config.duration + 0.1);
      });

      // Add noise for whoosh effect
      if (type === 'whoosh') {
        this.playNoise(config.duration, config.gain * 0.5);
      }

      // Add reverb-like effect for portal
      if (type === 'portal') {
        this.playNoise(1.5, 0.03);
      }
    } catch (e) {
      console.warn('Error playing sound:', e);
    }
  }

  private playNoise(duration: number, gainValue: number): void {
    if (!this.audioContext) return;

    const bufferSize = this.audioContext.sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate filtered noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const source = this.audioContext.createBufferSource();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    source.buffer = buffer;
    gain.gain.value = gainValue;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioContext.destination);

    source.start();
  }
}

// Singleton instance
export const soundSystem = new SoundSystem();

// React hook for sound system
export const useSound = () => {
  const [isMuted, setIsMuted] = useState(soundSystem.getMuted());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsMuted(soundSystem.getMuted());
  }, []);

  const initSound = useCallback(async () => {
    await soundSystem.init();
    setIsReady(true);
  }, []);

  const playSound = useCallback((type: SoundType) => {
    if (!isMuted && isReady) {
      soundSystem.play(type);
    }
  }, [isMuted, isReady]);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    soundSystem.setMuted(newMuted);
    setIsMuted(newMuted);
    localStorage.setItem('chronos-sound-muted', String(newMuted));
  }, [isMuted]);

  return {
    isMuted,
    isReady,
    initSound,
    playSound,
    toggleMute,
  };
};
