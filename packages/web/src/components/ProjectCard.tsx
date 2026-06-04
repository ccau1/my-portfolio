import { useState } from 'react';
import type { Project } from '../data/config';
import { ProjectDetailPanel } from './ProjectDetailPanel';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const hasMedia = project.media && project.media.length > 0;
  const hasCover = !!project.cover;

  return (
    <>
      <article
        className="project-card group relative overflow-hidden cursor-pointer"
        onClick={() => setIsPanelOpen(true)}
      >
        {/* Image container */}
        <div className="relative overflow-hidden bg-[var(--surface)] aspect-[16/10]">
          {hasCover ? (
            <img
              src={project.cover}
              alt={project.title}
              className="project-card-image w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span
                className="text-[8rem] font-bold text-[var(--surface-elevated)] select-none"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="project-card-overlay absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

          {/* Content overlay */}
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="section-number block mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {String(index + 1).padStart(2, '0')} — {project.tags[0]}
              </span>
              <h3
                className="font-bold text-[var(--text)] mb-2 text-xl md:text-2xl"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {project.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.description}
              </p>
            </div>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium tracking-wide border border-[var(--border)] text-[var(--text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors link-hover"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors link-hover"
                  onClick={(e) => e.stopPropagation()}
                >
                  Source
                </a>
              )}
              {hasMedia && (
                <span className="text-sm font-medium text-[var(--text-muted)]">
                  {project.media!.length} media
                </span>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Detail Panel */}
      <ProjectDetailPanel
        project={project}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </>
  );
}
