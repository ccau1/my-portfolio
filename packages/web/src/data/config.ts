import yaml from 'js-yaml';
import configYaml from './config.yaml?raw';

export interface MediaItem {
  type: 'image' | 'gif' | 'video';
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  cover?: string;
  media?: MediaItem[];
  envLinks?: Record<string, string>;
}

export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  github: string;
  linkedin: string;
  email: string;
}

export interface Config {
  profile: Profile;
  projects: Project[];
}

interface RawProject extends Project {
  envLinks?: Record<string, string>;
}

interface RawConfig {
  profile: Profile;
  projects: RawProject[];
}

function loadConfig(): Config {
  const raw = yaml.load(configYaml) as RawConfig;
  const env = __DEPLOY_ENV__;

  for (const project of raw.projects) {
    if (project.envLinks) {
      project.link = project.envLinks[env] || project.envLinks['production'] || undefined;
    }
  }

  return raw as Config;
}

export const config = loadConfig();
