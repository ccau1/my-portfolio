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
        className="project-card group cursor-pointer border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)] transition-colors duration-300"
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

          {/* Subtle bottom gradient for visual anchoring */}
          <div className="project-card-overlay absolute inset-0 bg-gradient-to-t from-[var(--bg)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content below the image */}
        <div className="p-5 md:p-6">
          <div className="flex items-baseline justify-between gap-4 mb-3">
            <h3
              className="font-bold text-[var(--text)] text-lg md:text-xl leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {project.title}
            </h3>
            <span className="section-number shrink-0 text-[var(--text-dim)]">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium tracking-wide border border-[var(--border)] text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
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
              <span className="text-sm font-medium text-[var(--text-dim)]">
                {project.media!.length} media
              </span>
            )}
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
