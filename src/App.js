// AnimatedCare_for_Her.jsx
// Updated: External CSS version (no Tailwind). Copy this file to `src/components/AnimatedCareForHer.jsx`.
// Also create a file `src/components/AnimatedCare.css` — its contents are appended below (search for `/* --- AnimatedCare.css --- */`).

import React, { useState, useEffect, useRef } from 'react';
import './App.css'

export default function AnimatedCareForHer() {
  const [panel, setPanel] = useState(null);
  const [confettiBurst, setConfettiBurst] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // entry animation trigger
    document.documentElement.classList.add('acf-enter');
    const t = setTimeout(() => document.documentElement.classList.remove('acf-enter'), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // prepare tiny audio context on first click
    if (!audioRef.current) audioRef.current = createChimePlayer();
  }, []);

  function toggle(panelName) {
    setPanel(prev => (prev === panelName ? null : panelName));
    if (panelName === 'cheer') setConfettiBurst(k => k + 1);
    if (panelName === 'melody' && audioRef.current) audioRef.current.play();
  }

  function createChimePlayer() {
    // returns object with play() method that plays a soft arpeggio
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      return {
        play: () => {
          const now = ctx.currentTime;
          const notes = [440, 554.37, 659.25]; // A4, C#5, E5
          notes.forEach((f, i) => {
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = 'sine';
            o.frequency.value = f;
            g.gain.setValueAtTime(0, now + i * 0.18);
            g.gain.linearRampToValueAtTime(0.12, now + i * 0.2);
            g.gain.linearRampToValueAtTime(0, now + i * 0.9);
            o.connect(g);
            g.connect(ctx.destination);
            o.start(now + i * 0.18);
            o.stop(now + i * 0.9);
          });
        }
      };
    } catch (e) {
      return { play: () => {} };
    }
  }

  return (
    <div className="acf-root" role="main">
      <header className="acf-hero">
        <div className="acf-hero-left">
          <h1 className="acf-title">A Little Pocket of Joy ❤️</h1>
          <p className="acf-sub">Tiny rituals, warm messages, and animated hugs — designed to brighten the day.</p>

          <div className="acf-controls" aria-hidden={false}>
            <button className="acf-btn acf-btn-primary" onClick={() => toggle('cheer')}>✨ Cheer Me Up</button>
            <button className="acf-btn" onClick={() => toggle('tips')}>💡 Self-Care Tips</button>
            <button className="acf-btn" onClick={() => toggle('melody')}>🎧 Play Melody</button>
            <button className="acf-btn acf-btn-soft" onClick={() => toggle('hug')}>🤗 Send Hug</button>
          </div>

        </div>

        <div className="acf-hero-right">
          <div className="acf-card acf-card-spotlight">
            <div className="acf-emoji">🌸</div>
            <div className="acf-card-text">You deserve care</div>
          </div>
        </div>
      </header>

      <section className="acf-stage">
        <aside className="acf-panel">
          <div className="acf-quick">
            <button className="acf-quick-btn" onClick={() => toggle('cheer')}>Cozy Sip ☕</button>
            <button className="acf-quick-btn" onClick={() => toggle('tips')}>Care Tips 💗</button>
            <button className="acf-quick-btn" onClick={() => toggle('hug')}>Virtual Hug 🤗</button>
            <button className="acf-quick-btn" onClick={() => toggle('melody')}>Calm Tune 🎵</button>
          </div>

          <div className="acf-info">

          </div>
        </aside>

        <main className="acf-content">
          <div className={`acf-card acf-main ${panel ? 'acf-active' : ''}`} aria-live="polite">
            {!panel && (
              <div className="acf-welcome">
                <h2 className="acf-welcome-title">Tiny happy hub ✨</h2>
                <p className="acf-welcome-desc">Tap a button to open a bright, animated card. Confetti, gentle motion, and soothing micro-interactions await.</p>
              </div>
            )}

            {panel === 'cheer' && (
              <div className="acf-message">
                <Confetti key={confettiBurst} burstId={confettiBurst} />
                <h2>Nice & Bright — You 🌟</h2>
                <ul>
                  <li><strong>You are allowed to rest.</strong> Rest is repair, not laziness.</li>
                  <li><strong>Treat yourself:</strong> one small delicious thing can reboot the day.</li>
                  <li><strong>You are seen & loved.</strong> Always, even on heavy days.</li>
                </ul>
                <div className="acf-actions">
                  <button className="acf-btn acf-btn-primary" onClick={() => setPanel(null)}>Close</button>
                </div>
              </div>
            )}

            {panel === 'tips' && (
              <div className="acf-message">
                <h2>Self-Care Tips 💡</h2>
                <ol>
                  <li>Warm drink + cozy blanket = 5-minute heaven.</li>
                  <li>Gentle movement to change energy (tiny walk).</li>
                  <li>Heat pad + playlist = magic.</li>
                </ol>
                <div className="acf-actions">
                  <button className="acf-btn" onClick={() => setPanel(null)}>Got it</button>
                </div>
              </div>
            )}

            {panel === 'melody' && (
              <div className="acf-message">
                <h2>Calm Melody 🎧</h2>
                <p>A gentle loop played right in your browser. Press Play again to replay the chime.</p>
                <div className="acf-actions">
                  <button className="acf-btn acf-btn-primary" onClick={() => audioRef.current && audioRef.current.play()}>Play Again</button>
                  <button className="acf-btn" onClick={() => setPanel(null)}>Close</button>
                </div>
              </div>
            )}

            {panel === 'hug' && (
              <div className="acf-message">
                <div className="acf-hug-art">🤗</div>
                <h2>Virtual Hug Sent</h2>
                <p>Squeeze. Breathe. Repeat. You're wonderful.</p>
                <div className="acf-actions">
                  <button className="acf-btn acf-btn-soft" onClick={() => setPanel(null)}>Hug Back 🤗</button>
                  <button className="acf-btn" onClick={() => toggle('cheer')}>More Brightness ✨</button>
                </div>
              </div>
            )}
          </div>
        </main>
      </section>

      <footer className="acf-footer">Made with ♥ and a sprinkle of code.</footer>

      {/* Floating decorative elements */}
      <FloatingBubbles />

      {/* CSS-only confetti placeholder; Confetti component appends animated spans */}
    </div>
  );
}

// Confetti uses DOM insertion + CSS animations to avoid external libs.
function Confetti({ burstId }) {
  // Create a simple array of emojis for confetti
  const conf = ['🎉','✨','💖','🌟','🥰','🌈','🍫'];
  // useRef not necessary; create elements on render using key. Keep markup simple.
  return (
    <div className={`acf-confetti acf-confetti--burst-${burstId}`} aria-hidden>
      {conf.map((c, i) => (
        <span key={i} className="acf-confetti-piece" style={{ '--i': i }}>
          {c}
        </span>
      ))}
    </div>
  );
}

// floating decorative bubbles/emoji
function FloatingBubbles(){
  const items = ['🌸','🍫','☕️','✨','🫶','🧸'];
  return (
    <div className="acf-bubbles" aria-hidden>
      {items.map((b, i) => (
        <span key={i} className={`acf-bubble acf-bubble--${i % 5}`}>{b}</span>
      ))}
    </div>
  );
}