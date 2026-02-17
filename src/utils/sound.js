// Simple synth using Web Audio API to avoid external assets
let audioCtx;

export const initAudio = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

export const playSound = (type, vol = 1) => {
    if (!audioCtx) {
        // Try to init if not already (might fail if not in user action, but worth a shot)
        try {
            initAudio();
        } catch (e) {
            console.warn("Audio not initialized", e);
            return;
        }
    }

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    switch (type) {
        case 'tick':
            // Wheel tick sound
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
            gainNode.gain.setValueAtTime(0.1 * vol, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
            break;

        case 'spin-end':
            // Success ding
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            gainNode.gain.setValueAtTime(0.3 * vol, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1);
            osc.start(now);
            osc.stop(now + 1);
            break;

        case 'open':
            // Envelope tearing/opening sound (pop)
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.linearRampToValueAtTime(800, now + 0.1);
            gainNode.gain.setValueAtTime(0.2 * vol, now);
            gainNode.gain.linearRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
            break;

        case 'cheer':
            // Winning progression
            playNote(523.25, now, 0.2); // C5
            playNote(659.25, now + 0.2, 0.2); // E5
            playNote(783.99, now + 0.4, 0.4); // G5
            playNote(1046.50, now + 0.8, 1.0); // C6
            break;
    }
};

const playNote = (freq, time, duration) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = 'triangle';
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.start(time);
    osc.stop(time + duration);
}
