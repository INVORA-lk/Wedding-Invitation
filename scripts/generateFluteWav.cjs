const fs = require('fs');

const sampleRate = 44100;
const bpm = 60; // Auspicious, meditative traditional Sri Lankan wedding tempo
const beatDur = 60 / bpm; // 1.0s per beat

// Traditional Sri Lankan auspicious wedding notes (Mohanam / Kalyani):
// S, R, G, P, D (C, D, E, G, A)
const melody = [
  { f: 261.63, b: 0, d: 2 }, // Sa (C4)
  { f: 293.66, b: 2, d: 1 }, // Ri (D4)
  { f: 329.63, b: 3, d: 1 }, // Ga (E4)
  { f: 392.00, b: 4, d: 2 }, // Pa (G4)
  { f: 440.00, b: 6, d: 2 }, // Dha (A4)
  { f: 523.25, b: 8, d: 3 }, // Sa (C5 high)
  { f: 440.00, b: 11, d: 1 },// Dha
  { f: 392.00, b: 12, d: 2 },// Pa
  { f: 329.63, b: 14, d: 2 },// Ga
  { f: 293.66, b: 16, d: 2 },// Ri
  { f: 261.63, b: 18, d: 4 },// Sa (sustained peaceful cadence)

  // Embellished verse
  { f: 329.63, b: 22, d: 1.5 },
  { f: 392.00, b: 23.5, d: 1.5 },
  { f: 440.00, b: 25, d: 2 },
  { f: 523.25, b: 27, d: 2 },
  { f: 587.33, b: 29, d: 1 },
  { f: 523.25, b: 30, d: 2 },
];

// Continuous warm Tanpura drone in the background (C & G)
const totalBeats = 32;
const totalDuration = totalBeats * beatDur + 2.5;
const totalSamples = Math.floor(totalDuration * sampleRate);

const left = new Float32Array(totalSamples);
const right = new Float32Array(totalSamples);

// Tanpura drone (deep soothing strings)
function addTanpuraDrone() {
  const freqs = [130.81, 196.00, 261.63]; // C3, G3, C4
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let s = 0;
    for (let f of freqs) {
      // Gentle pulsing chorus
      const lfo = 1 + 0.12 * Math.sin(2 * Math.PI * 0.4 * t);
      s += Math.sin(2 * Math.PI * f * t) * 0.12 * lfo;
      s += Math.sin(2 * Math.PI * f * 2 * t) * 0.05;
      s += Math.sin(2 * Math.PI * f * 3 * t) * 0.02;
    }
    left[i] += s * 0.45;
    right[i] += s * 0.45;
  }
}

// Traditional bamboo flute synthesis with breath noise and vibrato
function addFluteNote(freq, startBeat, dur) {
  const start = Math.floor(startBeat * beatDur * sampleRate);
  const len = Math.floor(dur * beatDur * sampleRate);
  const end = Math.min(totalSamples, start + len + Math.floor(sampleRate * 0.8));

  for (let i = start; i < end; i++) {
    const t = (i - start) / sampleRate;
    const durSec = dur * beatDur;

    // Breath envelope: soft swell and gentle decay
    const attack = Math.min(1.0, t / 0.12);
    const release = t > durSec ? Math.max(0, 1.0 - (t - durSec) / 0.5) : 1.0;
    const env = attack * release;

    // Authentic flute vibrato (5.5 Hz)
    const vibrato = 1 + 0.012 * Math.sin(2 * Math.PI * 5.5 * t);
    const f = freq * vibrato;

    // Rich wooden harmonics
    let sample = Math.sin(2 * Math.PI * f * t) * 1.0;
    sample += Math.sin(2 * Math.PI * f * 2 * t) * 0.35;
    sample += Math.sin(2 * Math.PI * f * 3 * t) * 0.18;
    sample += Math.sin(2 * Math.PI * f * 4 * t) * 0.06;

    // Subtle airy breath noise
    const breath = (Math.random() * 2 - 1) * 0.04;
    const val = (sample + breath) * env * 0.22;

    left[i] += val * 0.85;
    right[i] += val * 0.85;
  }
}

addTanpuraDrone();
for (let m of melody) {
  addFluteNote(m.f, m.b, m.d);
}

// Stereo reverb
const dL = Math.floor(sampleRate * 0.05);
const dR = Math.floor(sampleRate * 0.07);
for (let i = dL; i < totalSamples; i++) left[i] += left[i - dL] * 0.35;
for (let i = dR; i < totalSamples; i++) right[i] += right[i - dR] * 0.35;

// Normalize & write WAV
let peak = 0;
for (let i = 0; i < totalSamples; i++) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
const norm = peak > 0 ? 0.9 / peak : 1;

const numChannels = 2, bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;
const dataSize = totalSamples * blockAlign;
const buffer = Buffer.alloc(44 + dataSize);

buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20);
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * blockAlign, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34);
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

let off = 44;
for (let i = 0; i < totalSamples; i++) {
  const sL = Math.max(-1, Math.min(1, left[i] * norm));
  const sR = Math.max(-1, Math.min(1, right[i] * norm));
  buffer.writeInt16LE(Math.floor(sL < 0 ? sL * 0x8000 : sL * 0x7FFF), off);
  off += 2;
  buffer.writeInt16LE(Math.floor(sR < 0 ? sR * 0x8000 : sR * 0x7FFF), off);
  off += 2;
}

fs.writeFileSync('public/assets/sri_lankan_flute.wav', buffer);
console.log('Successfully generated public/assets/sri_lankan_flute.wav! Size:', buffer.length);
