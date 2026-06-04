import type { Profile } from '../data/config';

interface HeaderProps {
  profile: Profile;
}

export function Header({ profile }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <nav className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-medium tracking-[0.2em] uppercase text-white"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {profile.name}
        </a>
        <div className="flex items-center gap-10">
          <a
            href="#projects"
            className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors link-hover"
          >
            Work
          </a>
          <a
            href="#contact"
            className="text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors link-hover"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
