export type SpatialStationId =
  | 'hub'         // 0: Full studio overview & avatar
  | 'web'         // 1: Workstation monitor & dev projects
  | 'art'         // 2: Art wall, frames & CSS drawings
  | 'about'       // 3: Filing cabinet, stickers & skills
  | 'thoughts'    // 4: Bookshelf, chalkboard & notes
  | 'archive';    // 5: Pinboard, contact terminal & connect

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
  category: 'webgl' | 'frontend' | 'css-art' | 'fullstack';
  description: string;
  impact: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
  accentColor: string;
  previewType: 'single-div' | 'terminal' | 'interactive' | 'visual';
}

export interface ArtPiece {
  id: string;
  title: string;
  medium: string;
  year: string;
  description: string;
  quote?: string;
  cssHighlights?: string[];
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
