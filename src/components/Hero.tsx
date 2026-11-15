import { useState } from 'react';
import { CellularScene } from './CellularScene';
import type { MotionStatus } from './CellularScene';
import { DISCORD } from './Header';
export function Hero() {
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState<MotionStatus>('loading');
  const staticScene = status === 'reduced' || status === 'fallback' || status === 'limited';
  return <section className="hero" aria-labelledby="hero-title">
    <CellularScene paused={paused} onStatus={setStatus} />
    <div className="hero-content">
      <p className="eyebrow"><span className="seed-mark" aria-hidden="true"><i /><i /><i /><i /></span>An open-source super agent<br className="eyebrow-break" /> for organizations.</p>
      <h1 id="hero-title"><span className="hello">Meet Nori.</span><span>Built to help run</span><span>your <strong>organization.</strong></span></h1>
      <p className="hero-description">From daily operations and governance to treasury, community, and growth, Nori is designed to carry work forward over the long term—alongside your team, in the tools you already use.</p>
      <div className="hero-actions"><a className="button-primary" href={DISCORD}>Meet Nori in Discord</a><a className="button-secondary" href={DISCORD}>Join the Discord community</a></div>
    </div>
    <div className="scene-caption" aria-hidden="true"><span className="caption-line" /><span>A little life.<br /><strong>A larger possibility.</strong></span></div>
    <div className="hero-bottom"><p><span className="status-dot" />Built with nonprofits and NGOs in mind.</p><div className="motion-control">{staticScene ? <span className="static-label">{status === 'reduced' ? 'Reduced motion' : 'Still life'}<span aria-hidden="true"> ◇</span></span> : <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? 'Resume animation' : 'Pause animation'}><span>{paused ? 'Resume motion' : 'Pause motion'}</span></button>}</div></div>
    <span className="sr-only" role="status">{status === 'paused' ? 'Background animation paused.' : staticScene ? 'Static cellular portrait displayed.' : ''}</span>
  </section>;
}
