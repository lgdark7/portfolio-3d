import { SpatialStation, WebProject, ArtPiece, SkillCategory, ThoughtArticle } from '../types/portfolio';

export const SPATIAL_STATIONS: SpatialStation[] = [
  {
    id: 'hub',
    index: 0,
    label: 'Studio Hub',
    tagline: 'Lynn Fisher Creative Studio 2018',
    badge: '00',
    hotspotLabel: 'Look Around Studio',
    color: '#E45C4C'
  },
  {
    id: 'web',
    index: 1,
    label: 'Web Engineering',
    tagline: 'Interactive Web Apps & Code',
    badge: '01',
    hotspotLabel: 'Inspect Monitor',
    color: '#118AB2'
  },
  {
    id: 'art',
    index: 2,
    label: 'Art & Lab',
    tagline: 'Single Div CSS Art & Visuals',
    badge: '02',
    hotspotLabel: 'View Art Gallery',
    color: '#06D6A0'
  },
  {
    id: 'about',
    index: 3,
    label: 'About & Gear',
    tagline: 'Filing Cabinet of Skills & Bio',
    badge: '03',
    hotspotLabel: 'Open Filing Cabinet',
    color: '#FFD166'
  },
  {
    id: 'thoughts',
    index: 4,
    label: 'Thoughts',
    tagline: 'Essays, Process & Case Studies',
    badge: '04',
    hotspotLabel: 'Read Chalkboard',
    color: '#70587C'
  },
  {
    id: 'archive',
    index: 5,
    label: 'Archive & Connect',
    tagline: '18 Years of Sites & Contact',
    badge: '05',
    hotspotLabel: 'Drop a Message',
    color: '#E45C4C'
  }
];

export const WEB_PROJECTS: WebProject[] = [
  {
    id: 'a-single-div',
    title: 'a.singlediv.com',
    category: 'css-art',
    description: 'An ongoing drawing project to see what’s possible with CSS. Each drawing is one single HTML element (the beloved div) and pure gradients, box-shadows, and pseudo-elements.',
    impact: 'Featured in Net Magazine #261, CSSDay talk, and celebrated across frontend design culture.',
    tags: ['CSS3', 'Single Div', 'Generative Gradients', 'Creative Code'],
    demoUrl: 'https://a.singlediv.com',
    githubUrl: 'https://github.com/lynnandtonic/a-single-div',
    featured: true,
    accentColor: '#E45C4C',
    previewType: 'single-div'
  },
  {
    id: 'usflags-design',
    title: 'usflags.design',
    category: 'frontend',
    description: 'An exhaustive visual design guide and interactive atlas documenting all 50 US state and territory flags with official color specifications, proportions, and vexillology history.',
    impact: 'Cited by state offices, educational institutions, and visual designers worldwide.',
    tags: ['SVG Engineering', 'Design Systems', 'React', 'Information Architecture'],
    demoUrl: 'https://usflags.design',
    githubUrl: 'https://github.com/lynnandtonic/usflags.design',
    featured: true,
    accentColor: '#118AB2',
    previewType: 'interactive'
  },
  {
    id: 'airport-codes',
    title: 'airportcod.es',
    category: 'fullstack',
    description: 'Ever wondered why airport IATA codes are named what they are? An interactive photographic directory deciphering over 1,000 airport codes across the globe.',
    impact: 'Featured on Vox, CNN, NPR Here & Now, and viewed by millions of travelers.',
    tags: ['Data Architecture', 'Fast Search', 'Travel Tech', 'Node.js'],
    demoUrl: 'https://airportcod.es',
    githubUrl: 'https://github.com/lynnandtonic/airport-codes',
    featured: true,
    accentColor: '#06D6A0',
    previewType: 'interactive'
  },
  {
    id: 'hollywood-age-gap',
    title: 'hollywoodagegap.com',
    category: 'frontend',
    description: 'A data journalism project analyzing the systemic age disparity between romantic male leads and female co-stars across cinema history.',
    impact: 'Viral cultural data project referenced in film studies and international press.',
    tags: ['Data Visualization', 'Chart.js', 'Sociology', 'Editorial'],
    demoUrl: 'https://hollywoodagegap.com',
    githubUrl: 'https://github.com/lynnandtonic/hollywood-age-gap',
    featured: false,
    accentColor: '#FFD166',
    previewType: 'interactive'
  },
  {
    id: 'the-food-place',
    title: 'thefoodplace.cafe',
    category: 'frontend',
    description: 'A delightful interactive restaurant menu for this life and after, themed after the television masterpiece The Good Place with clam chowder fountains and cosmic frozen yogurt.',
    impact: 'Beloved homage visited by thousands of fans of The Good Place.',
    tags: ['Creative Fiction UI', 'Tailwind', 'Micro-Interactions'],
    demoUrl: 'https://thefoodplace.cafe',
    githubUrl: 'https://github.com/lynnandtonic/thefoodplace.cafe',
    featured: false,
    accentColor: '#70587C',
    previewType: 'interactive'
  },
  {
    id: 'studio-3d-cel',
    title: 'Lynn 2018 3D Spatial Experience',
    category: 'webgl',
    description: 'This very project! Transforming the hand-drawn Bob\'s Burgers cel-shaded 2018 studio into an unconstrained 3D WebGL world with scroll-driven spline cameras and real-time audio synthesis.',
    impact: 'State-of-the-art interactive spatial portfolio eliminating static 2D navbars.',
    tags: ['Three.js', 'Toon Shader', 'Web Audio API', 'React 19', 'TypeScript'],
    demoUrl: '#',
    githubUrl: 'https://github.com',
    featured: true,
    accentColor: '#E45C4C',
    previewType: 'visual'
  }
];

export const ART_PIECES: ArtPiece[] = [
  {
    id: 'sensual-woman',
    title: 'Strong, Sensual Woman',
    medium: 'Wall Illustration Frame & Typography',
    year: '2018',
    description: 'A heartfelt Bob\'s Burgers homage to Tina Belcher\'s immortal life philosophy.',
    quote: 'I\'m a strong, sensual woman.',
    color: '#E45C4C'
  },
  {
    id: 'burger-special',
    title: 'Vincent Van Goat Cheese Burger',
    medium: 'Chalkboard Special ($5.95)',
    year: '2018',
    description: 'Served with sliced roasted beets, warm artisan goat cheese, and fresh arugula on a brioche bun.',
    quote: 'Today\'s Burger: Vincent Van Goat Cheese - $5.95',
    color: '#FFD166'
  },
  {
    id: 'css-is-awesome',
    title: 'CSS IS AWESOME Mug & Sticker',
    medium: 'Graphic Enamel Decal',
    year: '2018',
    description: 'The infamous overflowing text box that every CSS developer knows in their soul.',
    cssHighlights: ['overflow: visible;', 'border: 3px solid #14303F;', 'box-sizing: border-box;'],
    color: '#06D6A0'
  },
  {
    id: 'single-div-bb8',
    title: 'BB-8 in a Single Div',
    medium: 'CSS Gradients & Box Shadows',
    year: '2017',
    description: 'Our loyal Astromech droid rendered inside exactly one HTML <div> tag using 35 layered radial gradients and border radius tricks.',
    color: '#118AB2'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend & 3D WebGL',
    description: 'Spatial web experiences, reactive UI, and mathematical canvas shaders.',
    skills: [
      { name: 'Three.js / WebGL', level: 95, icon: 'Box' },
      { name: 'React 19 & Next.js', level: 98, icon: 'Layers' },
      { name: 'TypeScript Architecture', level: 96, icon: 'Code' },
      { name: 'Tailwind CSS & Design Systems', level: 98, icon: 'Palette' },
      { name: 'Creative CSS & Animations', level: 100, icon: 'Sparkles' }
    ]
  },
  {
    name: 'Fullstack & Systems',
    description: 'Robust server architectures, API contracts, and high-throughput backends.',
    skills: [
      { name: 'Node.js & Bun runtime', level: 92, icon: 'Cpu' },
      { name: 'PostgreSQL & Redis', level: 88, icon: 'Database' },
      { name: 'Web Audio API Synthesis', level: 90, icon: 'Volume2' },
      { name: 'Vite & Modern Tooling', level: 94, icon: 'Zap' }
    ]
  },
  {
    name: 'Craft & Philosophy',
    description: 'The principles that guide every pixel and polygon.',
    skills: [
      { name: 'Single-Div Constraint Art', level: 100, icon: 'Maximize2' },
      { name: 'Accessible Spatial Interaction', level: 94, icon: 'Eye' },
      { name: 'Humor & Storytelling', level: 95, icon: 'Smile' },
      { name: 'Autonomous Rigor', level: 98, icon: 'CheckCircle' }
    ]
  }
];

export const THOUGHT_ARTICLES: ThoughtArticle[] = [
  {
    id: 'case-study-2018',
    title: 'Case Study: The 2018 Refresh & 220 Media Queries',
    date: 'December 20, 2018',
    readTime: '6 min read',
    summary: 'How I turned a tribute to Bob\'s Burgers into an animated resizing sequence using 44 frames of clothing sprites and over 220 media queries.',
    tags: ['Case Study', 'Animation', 'CSS Architecture', 'Stylus'],
    content: `In 2017, my portfolio featured 20 media queries where the site morphed every 100px. For 2018, I wanted the scaling to be deliberate: clothes that shrank teeny tiny when squeezed, and grew oversized and baggy when expanded on widescreen monitors!

Rather than one giant, sluggish image sprite, I separated the artwork into modular components: hair, faces, mouths, arms, shoes, and hoodies. With Stylus mixins, I could generate 44 distinct animation frames mapped across 23px and 47px viewport steps.

The beauty of the web is that constraints breed unforgettable creativity.`
  },
  {
    id: 'single-div-art',
    title: 'The Power of Creative Constraints: Drawing with One Div',
    date: 'April 14, 2019',
    readTime: '5 min read',
    summary: 'Why limiting yourself to a single HTML element teaches you more about browser layout engines than any framework documentation ever could.',
    tags: ['CSS', 'Single Div', 'Creative Coding'],
    content: `When you have unlimited markup, you reach for another nested container. But when you only have ONE <div> and two pseudo-elements (::before and ::after), you are forced to master the profound depths of linear-gradient, radial-gradient, repeating-conic-gradient, box-shadow arrays, and border-radius percentages.

A single div is a meditation on what CSS truly is: a procedural rendering engine disguised as a styling sheet.`
  },
  {
    id: 'spatial-web-future',
    title: 'Beyond Flat Buttons: Why Spatial Interaction Matters',
    date: 'October 23, 2026',
    readTime: '4 min read',
    summary: 'Moving away from the cookie-cutter top-right navbar toward physical, tactile 3D environments that respond to human gestures and mouse scrolling.',
    tags: ['WebGL', 'Three.js', 'UI Design', 'Spatial Web'],
    content: `For twenty years, web design put links in a row in the top-right corner. It is functional, but predictable.

When we treat the web as a space rather than a document, scrolling becomes travel. Objects in the room aren't decorations—they are the interfaces themselves. A desk lamp is a theme toggle; a monitor is your terminal; a filing cabinet holds your resume. Spatial interaction turns browsing into an experience.`
  }
];

export const STUDIO_EQUIPMENT = [
  { item: 'Main Rig', desc: 'Custom Workstation PC with dual high-refresh monitors' },
  { item: 'Audio', desc: 'Synthesized Web Audio API Spatial Engine' },
  { item: 'Desk Lamp', desc: 'Yellow Articulated Architect Lamp with 3-Way Cel Spotlight' },
  { item: 'Cat', desc: 'Studio Tabby (Sleeping, purrs when petted)' },
  { item: 'Drink', desc: 'Steaming pour-over coffee in custom CSS IS AWESOME mug' },
  { item: 'Snack', desc: 'Vincent Van Goat Cheese Burger from the chalkboard special' }
];
