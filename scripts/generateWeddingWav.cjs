const fs = require('fs');

const sampleRate = 44100;
const bpm = 68; // Romantic and slow
const beatDuration = 60 / bpm; // ~0.88s per beat

// Chord progression for Canon in D (transposed to C for warmth):
// C (C-E-G), G (G-B-D), Am (A-C-E), Em (E-G-B), F (F-A-C), C (C-E-G), F (F-A-C), G (G-B-D)
const bassNotes = [
  // Measure 1: C major
  { note: 130.81, time: 0, dur: 4 }, // C3
  { note: 196.00, time: 1, dur: 3 }, // G3
  { note: 261.63, time: 2, dur: 2 }, // C4
  { note: 329.63, time: 3, dur: 1 }, // E4

  // Measure 2: G major
  { note: 98.00, time: 4, dur: 4 },  // G2
  { note: 146.83, time: 5, dur: 3 }, // D3
  { note: 196.00, time: 6, dur: 2 }, // G3
  { note: 246.94, time: 7, dur: 1 }, // B3

  // Measure 3: A minor
  { note: 110.00, time: 8, dur: 4 }, // A2
  { note: 164.81, time: 9, dur: 3 }, // E3
  { note: 220.00, time: 10, dur: 2 },// A3
  { note: 261.63, time: 11, dur: 1 },// C4

  // Measure 4: E minor
  { note: 82.41, time: 12, dur: 4 }, // E2
  { note: 123.47, time: 13, dur: 3 },// B2
  { note: 164.81, time: 14, dur: 2 },// E3
  { note: 196.00, time: 15, dur: 1 },// G3

  // Measure 5: F major
  { note: 87.31, time: 16, dur: 4 }, // F2
  { note: 130.81, time: 17, dur: 3 },// C3
  { note: 174.61, time: 18, dur: 2 },// F3
  { note: 220.00, time: 19, dur: 1 },// A3

  // Measure 6: C major
  { note: 130.81, time: 20, dur: 4 },// C3
  { note: 196.00, time: 21, dur: 3 },// G3
  { note: 261.63, time: 22, dur: 2 },// C4
  { note: 329.63, time: 23, dur: 1 },// E4

  // Measure 7: F major
  { note: 87.31, time: 24, dur: 4 }, // F2
  { note: 130.81, time: 25, dur: 3 },// C3
  { note: 174.61, time: 26, dur: 2 },// F3
  { note: 220.00, time: 27, dur: 1 },// A3

  // Measure 8: G major
  { note: 98.00, time: 28, dur: 4 }, // G2
  { note: 146.83, time: 29, dur: 3 },// D3
  { note: 196.00, time: 30, dur: 2 },// G3
  { note: 246.94, time: 31, dur: 1 },// B3
];

// Lead melody notes (Pachelbel's wedding melody):
const melodyNotes = [
  // M1
  { note: 523.25, time: 0, dur: 2 },   // C5
  { note: 493.88, time: 2, dur: 2 },   // B4
  // M2
  { note: 440.00, time: 4, dur: 2 },   // A4
  { note: 392.00, time: 6, dur: 2 },   // G4
  // M3
  { note: 349.23, time: 8, dur: 2 },   // F4
  { note: 329.63, time: 10, dur: 2 },  // E4
  // M4
  { note: 349.23, time: 12, dur: 2 },  // F4
  { note: 392.00, time: 14, dur: 2 },  // G4

  // Second pass with romantic embellishment
  // M5
  { note: 523.25, time: 16, dur: 1 },  // C5
  { note: 587.33, time: 17, dur: 1 },  // D5
  { note: 493.88, time: 18, dur: 1 },  // B4
  { note: 523.25, time: 19, dur: 1 },  // C5
  // M6
  { note: 440.00, time: 20, dur: 1 },  // A4
  { note: 493.88, time: 21, dur: 1 },  // B4
  { note: 392.00, time: 22, dur: 1 },  // G4
  { note: 440.00, time: 23, dur: 1 },  // A4
  // M7
  { note: 349.23, time: 24, dur: 1 },  // F4
  { note: 392.00, time: 25, dur: 1 },  // G4
  { note: 329.63, time: 26, dur: 1 },  // E4
  { note: 349.23, time: 27, dur: 1 },  // F4
  // M8
  { note: 293.66, time: 28, dur: 2 },  // D4
  { note: 392.00, time: 30, dur: 2 },  // G4
];

const totalBeats = 32;
const totalDuration = totalBeats * beatDuration + 3.0; // ~31 seconds with reverb tail
const totalSamples = Math.floor(totalDuration * sampleRate);

const leftChannel = new Float32Array(totalSamples);
const rightChannel = new Float32Array(totalSamples);

// Realistic acoustic grand piano string synthesis
function addPianoTone(freq, startTime, duration, velocity, pan = 0.5) {
  const startSample = Math.floor(startTime * sampleRate);
  const noteSamples = Math.floor(duration * sampleRate);
  const endSample = Math.min(totalSamples, startSample + noteSamples + Math.floor(sampleRate * 2.5));

  // Harmonics with physical decay rates
  const harmonics = [
    { mult: 1.0, amp: 1.0, decay: 1.0 },
    { mult: 2.0, amp: 0.65, decay: 1.5 },
    { mult: 3.0, amp: 0.35, decay: 2.2 },
    { mult: 4.0, amp: 0.22, decay: 3.0 },
    { mult: 5.0, amp: 0.12, decay: 4.0 },
    { mult: 6.0, amp: 0.08, decay: 5.2 },
    { mult: 7.0, amp: 0.04, decay: 6.5 },
  ];

  for (let i = startSample; i < endSample; i++) {
    const t = (i - startSample) / sampleRate;
    
    // Hammer strike envelope: fast attack (~5ms), natural exponential release
    const attack = Math.min(1.0, t / 0.006);
    let sample = 0;

    for (let h of harmonics) {
      const hFreq = freq * h.mult;
      if (hFreq > sampleRate / 2) continue;
      // Frequency-dependent damping: higher notes and harmonics decay faster
      const damp = Math.exp(-t * (1.2 * h.decay + freq * 0.003));
      sample += Math.sin(2 * Math.PI * hFreq * t) * h.amp * damp;
    }

    const val = sample * attack * velocity * 0.15;
    leftChannel[i] += val * (1 - pan * 0.5);
    rightChannel[i] += val * (0.5 + pan * 0.5);
  }
}

// Render bass notes (warm arpeggios, panned slightly left)
for (let b of bassNotes) {
  addPianoTone(b.note, b.time * beatDuration, b.dur * beatDuration, 0.55, 0.35);
}

// Render melody notes (singing high register, panned slightly right)
for (let m of melodyNotes) {
  addPianoTone(m.note, m.time * beatDuration, m.dur * beatDuration, 0.75, 0.65);
}

// Apply smooth concert hall stereo reverb
const delayL = Math.floor(sampleRate * 0.045);
const delayR = Math.floor(sampleRate * 0.062);
const feedback = 0.38;

for (let i = delayL; i < totalSamples; i++) {
  leftChannel[i] += leftChannel[i - delayL] * feedback;
}
for (let i = delayR; i < totalSamples; i++) {
  rightChannel[i] += rightChannel[i - delayR] * feedback;
}

// Encode to 16-bit PCM Stereo WAV
const numChannels = 2;
const bytesPerSample = 2;
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;
const buffer = Buffer.alloc(44 + dataSize);

// RIFF header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);

// fmt chunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16);
buffer.writeUInt16LE(1, 20); // PCM
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // 16-bit

// data chunk
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Normalize peak amplitude to prevent clipping
let maxPeak = 0;
for (let i = 0; i < totalSamples; i++) {
  maxPeak = Math.max(maxPeak, Math.abs(leftChannel[i]), Math.abs(rightChannel[i]));
}
const norm = maxPeak > 0 ? 0.92 / maxPeak : 1;

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  const sL = Math.max(-1, Math.min(1, leftChannel[i] * norm));
  const sR = Math.max(-1, Math.min(1, rightChannel[i] * norm));

  buffer.writeInt16LE(Math.floor(sL < 0 ? sL * 0x8000 : sL * 0x7FFF), offset);
  offset += 2;
  buffer.writeInt16LE(Math.floor(sR < 0 ? sR * 0x8000 : sR * 0x7FFF), offset);
  offset += 2;
}

fs.writeFileSync('public/assets/wedding_piano.wav', buffer);
console.log('Successfully generated public/assets/wedding_piano.wav! Size:', buffer.length);
