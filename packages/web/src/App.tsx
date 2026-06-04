import './App.css';
import { config } from './data/config';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useCustomCursor } from './hooks/useCustomCursor';
import { GrainOverlay } from './components/GrainOverlay';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsGrid } from './components/ProjectsGrid';
import { Footer } from './components/Footer';

function App() {
  useScrollReveal();
  useCustomCursor();

  return (
    <div className="relative min-h-[100svh] bg-[var(--bg)]">
      <GrainOverlay />
      <Header profile={config.profile} />
      <main>
        <Hero profile={config.profile} />
        <ProjectsGrid projects={config.projects} />
      </main>
      <Footer profile={config.profile} />
    </div>
  );
}

export default App;
