export type SpatialStationId =
  | 'hub'         // 0: Full studio overview, avatar & command center
  | 'web'         // 1: Workstation monitor & native systems/projects
  | 'art'         // 2: Protocol architecture, schematics & visual lab
  | 'about'       // 3: Filing cabinet, technical arsenal & credentials
  | 'thoughts'    // 4: Technical deep-dives & architecture notes
  | 'archive';    // 5: Community, Discord, guns.lol & connect terminal

export interface SpatialStation {
  id: SpatialStationId;
  index: number;
  label: string;
  tagline: string;
  badge: string;
  hotspotLabel: string;
  color: string;
}

export interface WebProject {
  id: string;
  title: string;
  category: 'android' | 'multimedia' | 'protocols' | 'webgl' | 'all';
  description: string;
  impact: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  accentColor: string;
  stats?: string;
  previewType: 'terminal' | 'interactive' | 'visual' | 'code';
}

export interface ArtPiece {
  id: string;
  title: string;
  medium: string;
  year: string;
  description: string;
  quote?: string;
  codeHighlights?: string[];
  color: string;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: { name: string; level: number; icon: string }[];
}

export interface ThoughtArticle {
  id: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  tags: string[];
}

export type LightingMode = 'day' | 'sunset' | 'night';
