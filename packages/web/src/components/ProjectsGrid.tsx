import type { Project } from '../data/config';
import { ProjectCard } from './ProjectCard';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section id="projects" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="reveal mb-20 md:mb-28">
          <div className="flex items-end justify-between gap-8 mb-8">
            <div>
              <span className="section-number block mb-4">Selected Work</span>
              <h2
                className="text-4xl md:text-6xl font-bold text-[var(--text)] tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Projects
              </h2>
            </div>
            <p className="hidden md:block text-sm text-[var(--text-muted)] max-w-xs text-right leading-relaxed">
              A curated selection of work spanning web applications, mobile experiences, and interactive systems.
            </p>
          </div>
          <div className="hr-animated" />
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div key={project.id} className={`reveal reveal-delay-${Math.min(index + 1, 6)}`}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
