import { useState } from 'react';
import { CellularScene } from './CellularScene';
import type { MotionStatus } from './CellularScene';
import { Arrow } from './Icons';
import { DISCORD } from './Header';
export function Hero() {
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState<MotionStatus>('loading');
  const staticScene = status === 'reduced' || status === 'fallback' || status === 'limited';
  return <section className="hero" aria-labelledby="hero-title">
    <CellularScene paused={paused} onStatus={setStatus} />
    <div className="hero-content">
      <p className="eyebrow"><span className="seed-mark" aria-hidden="true"><i /><i /><i /><i /></span>An open-source super agent<br className="eyebrow-break" /> for organizations.</p>
      <h1 id="hero-title"><span className="hello">Meet Nori.</span><span>Built to help run</span><span>your <em>organization.</em></span></h1>
      <p className="hero-description">From daily operations and governance to treasury, community, and growth, Nori is designed to carry work forward over the long term—alongside your team, in the tools you already use.</p>
      <div className="hero-actions"><a className="button-primary" href={DISCORD}>Meet Nori in Discord<span className="button-arrow"><Arrow diagonal /></span></a><a className="button-secondary" href={DISCORD}>Become a pilot organization<Arrow /></a></div>
    </div>
    <div className="scene-caption" aria-hidden="true"><span className="caption-line" /><span>A little life.<br /><em>A larger possibility.</em></span></div>
    <div className="hero-bottom"><p><span className="status-dot" />Open source. Open possibilities.</p><div className="motion-control">{staticScene ? <span className="static-label">{status === 'reduced' ? 'Reduced motion' : 'Still life'}<span aria-hidden="true"> ◇</span></span> : <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? 'Resume animation' : 'Pause animation'}><span>{paused ? 'Resume motion' : 'Pause motion'}</span><svg viewBox="0 0 20 20" fill="none" aria-hidden="true">{paused ? <path d="m7 4 8 6-8 6Z" fill="currentColor" /> : <path d="M7 5v10m6-10v10" stroke="currentColor" strokeWidth="1.6" />}</svg></button>}</div></div>
    <span className="sr-only" role="status">{status === 'paused' ? 'Background animation paused.' : staticScene ? 'Static cellular portrait displayed.' : ''}</span>
  </section>;
}
