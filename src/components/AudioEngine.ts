/**
 * Romantic Wedding Audio Engine for Next.js (Web Audio API)
 */
class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  public isPlaying: boolean = false;
  private intervalId: any = null;
  public volume: number = 0.5;

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playNote(frequency: number, time: number, duration: number = 1.8, type: OscillatorType = 'sine') {
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.25 * this.volume, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, time);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch (e) {
      console.warn('Audio playback note error', e);
    }
  }

  private startSynthMelody() {
    this.initContext();
    if (!this.ctx) return;

    const chords = [
      [261.63, 329.63, 392.00, 493.88, 523.25, 659.25],
      [196.00, 293.66, 392.00, 493.88, 587.33, 783.99],
      [220.00, 261.63, 329.63, 392.00, 523.25, 659.25],
      [174.61, 261.63, 329.63, 392.00, 523.25, 698.46],
      [164.81, 246.94, 329.63, 392.00, 493.88, 659.25],
      [146.83, 220.00, 261.63, 349.23, 440.00, 523.25],
      [196.00, 261.63, 392.00, 523.25, 587.33, 783.99],
      [196.00, 246.94, 392.00, 493.88, 587.33, 783.99]
    ];

    let chordIndex = 0;
    let step = 0;

    const playStep = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const currentChord = chords[chordIndex];

      const noteIdx = step % currentChord.length;
      const noteFreq = currentChord[noteIdx];
      
      this.playNote(noteFreq, now, 2.2, 'sine');
      
      if (step === 0) {
        this.playNote(currentChord[0] / 2, now, 3.0, 'triangle');
        this.playNote(currentChord[currentChord.length - 1] * 2, now + 0.15, 1.5, 'sine');
      }

      step++;
      if (step >= 6) {
        step = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }
    };

    playStep();
    this.intervalId = setInterval(playStep, 500);
  }

  private stopSynthMelody() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public play() {
    this.isPlaying = true;
    this.startSynthMelody();
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('wedding-audio-state', { detail: { isPlaying: true } }));
    }
  }

  public pause() {
    this.isPlaying = false;
    this.stopSynthMelody();
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('wedding-audio-state', { detail: { isPlaying: false } }));
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioEngine();
