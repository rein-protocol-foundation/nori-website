import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Team } from './components/sections/Team';
import { Operations } from './components/sections/Operations';
import { Resources } from './components/sections/Resources';
import { Community } from './components/sections/Community';
import { Communications } from './components/sections/Communications';
import { Rein } from './components/sections/Rein';
import { Continuity } from './components/sections/Continuity';
import { OpenSource, Footer } from './components/sections/OpenSource';
export function App() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Hero /><Team /><Operations /><Resources /><Community /><Communications /><Rein /><Continuity /><OpenSource /></main><Footer /></>;
}
