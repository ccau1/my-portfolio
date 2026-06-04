import type { Profile } from '../data/config';

interface HeroProps {
  profile: Profile;
}

export function Hero({ profile }: HeroProps) {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center px-6 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[var(--accent)] blur-[150px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#7c8b6f] blur-[120px] opacity-10" />
      </div>

      <div className="relative mx-auto max-w-7xl w-full pt-32 pb-20">
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <span
            className="section-number block mb-8"
          >
            {profile.role}
          </span>
        </div>

        <h1
          className="animate-fade-up text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight text-[var(--text)]"
          style={{ fontFamily: 'var(--font-heading)', animationDelay: '0.4s' }}
        >
          {profile.tagline}
        </h1>

        <div
          className="animate-fade-up mt-12 max-w-xl"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="hr-animated mb-8" style={{ animationDelay: '0.7s' }} />
          <p className="text-lg leading-relaxed text-[var(--text-muted)]">
            {profile.bio}
          </p>
        </div>

        <div
          className="animate-fade-up mt-12 flex items-center gap-8"
          style={{ animationDelay: '0.8s' }}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 text-sm font-medium tracking-wide text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
          >
            <span className="w-10 h-10 rounded-full border border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--bg)] flex items-center justify-center transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
            Scroll to explore
          </a>
        </div>
      </div>
    </section>
  );
}
