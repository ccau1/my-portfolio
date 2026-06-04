import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Project } from '../data/config';
import { ImageLightbox } from './ImageLightbox';

interface ProjectDetailPanelProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailPanel({ project, isOpen, onClose }: ProjectDetailPanelProps) {
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const images = project?.media?.filter((m) => m.type !== 'video') ?? [];
  const videos = project?.media?.filter((m) => m.type === 'video') ?? [];

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !showLightbox) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, onClose, showLightbox]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  if (!project) return null;

  const panelContent = (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[110] w-full md:w-[75vw] lg:w-[65vw] bg-[var(--bg)] border-l border-[var(--border)] transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 z-10 p-2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          aria-label="Close panel"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-full overflow-y-auto lg:overflow-hidden">
          {/* Left: Project info */}
          <div className="lg:w-[380px] xl:w-[420px] flex-shrink-0 lg:overflow-y-auto p-8 md:p-10 lg:border-r border-[var(--border)]">
              <span className="section-number block mb-4">{project.title}</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {project.title}
              </h2>

              <p className="text-[var(--text-muted)] leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-10">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium tracking-wide border border-[var(--border)] text-[var(--text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="space-y-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors link-hover"
                  >
                    <span>Live Demo</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors link-hover"
                  >
                    View Source
                  </a>
                )}
              </div>
            </div>

          {/* Right: Media gallery */}
          <div className="flex-1 lg:overflow-y-auto p-8 md:p-10">
              {/* Videos */}
              {videos.length > 0 && (
                <div className="space-y-6 mb-10">
                  {videos.map((item, idx) => (
                    <div
                      key={`video-${idx}`}
                      className="border border-[var(--border)] bg-[var(--surface)]"
                    >
                      <video
                        src={item.src}
                        controls
                        className="w-full"
                        preload="metadata"
                        poster={project.cover}
                      />
                      <p className="text-sm text-[var(--text-muted)] px-5 py-4 border-t border-[var(--border)]">
                        {item.alt}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Images grid */}
              {images.length > 0 && (
                <div>
                  <p className="section-number block mb-6">
                    Screenshots ({images.length})
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {images.map((item, idx) => (
                      <button
                        key={`img-${idx}`}
                        onClick={() => openLightbox(idx)}
                        className="group relative border border-[var(--border)] bg-[var(--surface)] overflow-hidden text-left cursor-pointer hover:border-[var(--border-hover)] transition-colors"
                      >
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m4-3H6" />
                          </svg>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] px-4 py-3 border-t border-[var(--border)] truncate">
                          {item.alt}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {project.media && project.media.length === 0 && (
                <p className="text-sm text-[var(--text-muted)]">No media available.</p>
              )}
            </div>
          </div>
        </div>

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        currentIndex={lightboxIndex}
        isOpen={showLightbox}
        onClose={() => setShowLightbox(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  );

  return createPortal(panelContent, document.body);
}
