import { useState } from 'react';
import type { Project } from '../data/config';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [showGallery, setShowGallery] = useState(false);
  const hasMedia = project.media && project.media.length > 0;
  const hasCover = !!project.cover;
  const isFeatured = index === 0;

  return (
    <>
      <article
        className={`project-card group relative overflow-hidden cursor-pointer ${
          isFeatured ? 'md:col-span-2 md:row-span-2' : ''
        }`}
        onClick={() => hasMedia && setShowGallery(true)}
      >
        {/* Image container */}
        <div className={`relative overflow-hidden bg-[var(--surface)] ${
          isFeatured ? 'aspect-[16/10]' : 'aspect-[4/3]'
        }`}>
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
                className={`font-bold text-[var(--text)] mb-2 ${
                  isFeatured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                }`}
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

      {/* Gallery Modal */}
      {showGallery && hasMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[var(--bg)]/95 backdrop-blur-md"
          onClick={() => setShowGallery(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowGallery(false)}
              className="fixed top-6 right-6 z-10 p-3 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-8">
              <span className="section-number block mb-3">{project.title}</span>
              <h3
                className="text-3xl md:text-4xl font-bold text-[var(--text)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Media Gallery
              </h3>
            </div>

            <div className="space-y-6">
              {project.media!.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-[var(--border)] bg-[var(--surface)]"
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      controls
                      className="w-full"
                      preload="metadata"
                      poster={project.cover}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full"
                      loading="lazy"
                    />
                  )}
                  <p className="text-sm text-[var(--text-muted)] px-5 py-4 border-t border-[var(--border)]">
                    {item.alt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
