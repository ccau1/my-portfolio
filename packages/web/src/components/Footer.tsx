import type { Profile } from '../data/config';

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative px-6 py-32 md:py-40 border-t border-[var(--border)]">
      <div className="mx-auto max-w-7xl">
        <div className="reveal mb-20">
          <span className="section-number block mb-4">Get in Touch</span>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] tracking-tight max-w-4xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Let's create something{' '}
            <span className="text-[var(--accent)]">extraordinary</span> together
          </h2>
        </div>

        <div className="reveal reveal-delay-2">
          <div className="hr-animated mb-12" />
        </div>

        <div className="reveal reveal-delay-3 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="block text-2xl md:text-3xl font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors link-hover"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {profile.email}
              </a>
            )}
            <div className="flex items-center gap-8">
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium tracking-wide text-[var(--text-muted)] hover:text-[var(--text)] transition-colors link-hover"
                >
                  GitHub
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium tracking-wide text-[var(--text-muted)] hover:text-[var(--text)] transition-colors link-hover"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <p className="text-sm text-[var(--text-dim)]">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
