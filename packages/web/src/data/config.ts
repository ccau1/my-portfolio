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

function loadConfig(): Config {
  return yaml.load(configYaml) as Config;
}

export const config = loadConfig();
