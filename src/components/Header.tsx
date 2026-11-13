import { Arrow, GithubMark, NoriMark } from './Icons';
export const DISCORD = 'https://discord.gg/m8qnWv9XX';
export function Header() {
  return <header className="header"><a className="wordmark" href="#main" aria-label="Nori home"><NoriMark /><span>nori<span className="wordmark-dot">.</span></span></a><nav aria-label="Main navigation"><a className="github-link" aria-label="Nori on GitHub" href="https://github.com/rein-protocol-foundation/nori-agent"><GithubMark /><span>GitHub</span></a><span className="nav-divider" /><a className="header-cta" aria-label="Meet Nori in Discord" href={DISCORD}><span>Meet Nori<span className="header-cta-extra"> in Discord</span></span><Arrow diagonal /></a></nav></header>;
}
